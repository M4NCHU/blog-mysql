"use client";

import { formatTimeToNow, getNiceDate } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { Category } from "@prisma/client";
import { FC } from "react";
import { FiSettings } from "react-icons/fi";
import SubscribeLeaveToggle from "../Categories/SubsctibeLeaveToggle";

interface CategoryCardProps {
  category: Category;
  isSubscribed?: boolean;
  memberCount?: number;
  postCount?: number;
  sessionId: string | undefined;
}

const CategoryCard: FC<CategoryCardProps> = ({
  category,
  isSubscribed,
  memberCount,
  sessionId,
  postCount,
}) => {
  const date = getNiceDate(category.createdAt);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center border-b-1 border-default-100 pb-2">
        <h2 className="">{category.name}</h2>
        <div className="">
          <Button
            isIconOnly
            className="rounded-full bg-transparent hover:bg-background"
            size="sm"
          >
            <FiSettings />
          </Button>
        </div>
      </div>
      <div className="category-actions border-b-1 border-default-100 pb-2 flex flex-row justify-between">
        <div>
          {category.creatorId !== sessionId ? (
            <SubscribeLeaveToggle
              categoryId={category.id}
              isSubscribed={isSubscribed ? isSubscribed : null}
              categoryName={category.name}
            />
          ) : (
            <p className="text-sm px-2">
              Category creator cannot unfollow category
            </p>
          )}
        </div>
      </div>
      <div className="category-stats flex flex-row justify-center gap-8 border-b-1 border-default-100 pb-2">
        <div className="flex flex-col items-center">
          <p>{postCount}</p>
          <span>posts</span>
        </div>
        <div className="flex flex-col items-center">
          <p>{memberCount}</p>
          <span>followers</span>
        </div>
      </div>

      <div className="px-2 flex flex-row justify-between flex-nowrap">
        <p>Created at:</p>
        <p className="flex flex-row flex-nowrap">{date}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
