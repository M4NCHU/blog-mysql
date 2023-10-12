"use client";

import { uploadFiles } from "@/lib/uploadthing";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { PostTagRequest } from "@/lib/validators/tags";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Tag } from "@prisma/client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

type FormData = z.infer<typeof PostValidator>;

interface EditorProps {
  categoryId: string;
}

const Editor: FC<EditorProps> = ({ categoryId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      categoryId,
      title: "",
      content: null,
      tags: [],
      isPrivate: false,
    },
  });

  const ref = useRef<EditorJS>();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isPrivatePost, setIsPrivatePost] = useState<boolean>(false);
  const [tags, setTags] = useState<PostTagRequest[]>([]);
  const [tagInputValue, setTagInputValue] = useState<string>("");

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles({
                    files: [file],
                    endpoint: "imageUploader",
                  });

                  return {
                    success: 1,
                    file: {
                      url: res?.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast.error("something went wrong");
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast.error((value as { message: string }).message);
      }
    }
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      categoryId,
      tags,
      isPrivate,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        title,
        content,
        categoryId,
        tags,
        isPrivate: isPrivatePost,
      };
      const { data } = await axios.post("/api/category/post/create", payload);
      return data;
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      // turn pathname /category/mycommunity/submit into /category/mycommunity
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.push(newPathname);

      router.refresh();

      toast.success("Your post has been published");
    },
  });

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      categoryId,
      tags: tags,
      isPrivate: isPrivatePost,
    };

    createPost(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    const newIsPrivatePost = selectedValue === "true"; // Konwertuj wartość na boolean
    setIsPrivatePost(newIsPrivatePost); // Zaktualizuj stan
  };

  const handleInputChange = (event: any) => {
    setTagInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: any) => {
    let tagResult = tagInputValue.trim();
    if ((event.key === "Spacebar" || event.key === " ") && tagResult !== "") {
      if (tagResult.length <= 2) {
        setTagInputValue("");
        toast.error("Tag name is too short");
        return;
      }
      if (!tags.some((tag) => tag.title === tagResult)) {
        setTags([...tags, { title: tagResult }]);
      } else {
        toast.error("Tag with this name already exists");
      }

      setTagInputValue("");
    }
  };

  const handleTagDelete = (tagToDelete: string) => {
    const updatedTags = tags.filter((tag) => tag.title !== tagToDelete);
    setTags(updatedTags);
  };

  return (
    <form
      id="category-post-form"
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full p-4 bg-background rounded-lg border border-zinc-200">
        <div className="">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-default/20 rounded-lg p-2 text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px] w-full" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-12">
        <Input
          placeholder="Enter tags"
          className="w-full md:w-1/2"
          value={tagInputValue}
          label="tags (press spacebar to enter another tag)"
          type="text"
          labelPlacement="outside"
          defaultValue="junior@nextui.org"
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">#</span>
            </div>
          }
        />
        <div className="tags gap-2 flex flex-row flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="tag bg-default-100 pl-2 flex flex-row items-center gap-2 rounded-full"
            >
              {tag.title}{" "}
              <button
                type="button"
                onClick={() => handleTagDelete(tag.title)}
                className="tag-delete rounded-full w-[2rem] h-[2rem] flex items-center justify-center hover:bg-default-200"
              >
                x
              </button>
            </span>
          ))}
        </div>
        <Select
          defaultSelectedKeys={["false"]}
          name="isPrivate"
          id=""
          size="sm"
          typeof="text"
          className="w-full md:w-1/2 "
          label="Select visibility"
          value={isPrivatePost.toString()}
          onChange={handleSelectChange}
        >
          <SelectItem key="false" value="false">
            Public
          </SelectItem>
          <SelectItem key="true" value="true">
            Private
          </SelectItem>
        </Select>
      </div>
    </form>
  );
};

export default Editor;
