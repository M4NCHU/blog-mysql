"use client";

import LayoutDefault from "@/components/layout/LayoutDefault";
import { CreateCategoryPayload } from "@/lib/validators/category";
import { Button, Input } from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

interface CreateCategoryProps {}

const CreateCategory: FC<CreateCategoryProps> = ({}) => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateCategoryPayload = {
        name: input,
      };

      const { data } = await axios.post("/api/category", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast.error("Category already exists.");
        }

        if (err.response?.status === 422) {
          toast.error("Invalid category name.");
        }

        if (err.response?.status === 401) {
          toast.error("Unauthorized");
        }
      }

      toast.error("There was an error");
    },
    onSuccess: (data) => {
      router.push(`/blog/category/${data}`);
      router.refresh();
    },
  });

  return (
    <LayoutDefault>
      <div className="mt-6 md:p-2  gap-6 flex flex-col w-full">
        <h3 className="ml-2 mt-2 font-semibold leading-6 text-5xl text-foreground">
          Create category
        </h3>
        <p className="ml-2 mt-1 truncate text-base text-default-400"></p>

        <div className="w-full flex flex-col gap-4 justify-end">
          <Input
            isClearable
            type="text"
            label="Category name"
            variant="bordered"
            placeholder="Enter name of category"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            type="submit"
            form="category-post-form"
            color="secondary"
            variant="flat"
            className="w-full"
            disabled={input.length === 0}
            onClick={() => createCommunity()}
          >
            create
          </Button>
        </div>
      </div>
    </LayoutDefault>
  );
};

export default CreateCategory;
