"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Avatar, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { GoDotFill } from "react-icons/go";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineAdminPanelSettings, MdPublic } from "react-icons/md";
import UpdatePostStatus from "../Forms/Edit/UpdatePostStatus";

interface PostHeaderProps {
  categoryName: string;
  createdAt: Date;
  image: string | undefined;
  isPrivate: boolean | undefined;
  role: string | undefined;
  postId: string | undefined;
}

const PostHeader: FC<PostHeaderProps> = ({
  categoryName,
  createdAt,
  image,
  isPrivate,
  role,
  postId,
}) => {
  const router = useRouter();
  const isAdmin = role === "ADMIN";

  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar isBordered src={image ? image : undefined} size="sm" />

      {categoryName ? (
        <button
          onClick={() => router.push(`/blog/category/${categoryName}`)}
          className="text-sm text-foreground p-2 hover:text-hoverColor"
        >
          {categoryName}
        </button>
      ) : null}
      <div>
        <GoDotFill className="text-xs text-foregroundSecond" />
      </div>
      <div className="flex flex-row items-center flex-wrap">
        {/* <span className="text-xs">
        Posted by{" "}
        <Link
          href={`/u/${post.author.username}`}
          as={NextLink}
          color="foreground"
          className="text-xs"
        >
          {post.author.username}
        </Link>{" "}
        -{" "}
      </span> */}
        <span className="text-xs text-foregroundSecond">
          {formatTimeToNow(new Date(createdAt))}
        </span>
      </div>
      {isAdmin && postId !== undefined && isPrivate !== undefined && (
        <>
          <UpdatePostStatus role={role} isPrivate={isPrivate} postId={postId} />
        </>
      )}
    </div>
  );
};

export default PostHeader;
