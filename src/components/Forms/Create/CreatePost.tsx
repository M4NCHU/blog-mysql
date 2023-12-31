"use client";

import Editor from "@/components/Editor";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import CreatePostHeader from "../../UI/headers/CreatePostHeader";

interface CreatePostProps {
  slug: string;
  categoryId: string;
  names: string[];
}

const CreatePost: FC<CreatePostProps> = ({ slug, categoryId, names }) => {
  return (
    <div className="mt-6 px-2  gap-6 flex flex-col w-full pb-24">
      <div className="flex flex-col gap-2 w-full"></div>

      <CreatePostHeader slug={slug} names={names} />

      {/* form */}
      <Editor categoryId={categoryId} />

      <div className="w-full flex justify-end">
        <Button
          type="submit"
          form="category-post-form"
          color="secondary"
          variant="flat"
          className="w-full"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
