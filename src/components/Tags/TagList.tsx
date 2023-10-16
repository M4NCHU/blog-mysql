"use client";

import { Button } from "@nextui-org/react";
import { Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface TagListProps {
  tags: Tag[];
}

const TagList: FC<TagListProps> = ({ tags }) => {
  const router = useRouter();

  return (
    <div className="flex flex-row flex-wrap gap-2 justify-center">
      {tags.map((item, i) => (
        <Button
          className="bg-background hover:bg-default-100 w-12 h-8"
          onClick={() => {
            router.push(`/blog/tag/${item.id}`);
          }}
          key={i}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default TagList;
