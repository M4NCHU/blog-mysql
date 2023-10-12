"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

interface TagListProps {
  tagList: ({ tag: { id: string; name: string } | null } & {
    id: string;
    postId: string;
    tagId: string | null;
  })[];
}

const TagList: FC<TagListProps> = ({ tagList }) => {
  const router = useRouter();

  return (
    <div className="tags-list flex flex-row gap-2">
      {tagList.map((item, i) => (
        <button
          key={i}
          onClick={() => router.push(`/blog/tag/${item.tagId}`)}
          className="px-2 py-1 bg-backgroundSecond rounded-lg"
        >
          {item.tag?.name}
        </button>
      ))}
    </div>
  );
};

export default TagList;
