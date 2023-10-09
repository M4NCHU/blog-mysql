"use client";

import { FC } from "react";
import LayoutDefault from "../../layout/LayoutDefault";
import CreatePostHeader from "../../UI/headers/CreatePostHeader";
import Editor from "@/components/Editor";
import { Button } from "@nextui-org/react";
import { CardTransactions } from "../../Home/card-categories";

interface CreatePostProps {
  slug: string;
  categoryId: string;
  names: string[];
}

const CreatePost: FC<CreatePostProps> = ({ slug, categoryId, names }) => {
  return (
    <div className="mt-6 md:p-2  gap-6 flex flex-col w-full">
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
