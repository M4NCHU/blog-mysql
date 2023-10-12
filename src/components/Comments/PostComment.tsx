"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Comment, CommentVote, User } from "@prisma/client";
import { FC, useRef, useState } from "react";

import { CommentRequest } from "@/lib/validators/comment";
import { Avatar, Button, Textarea } from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import CommentVotes from "./CommentVotes";
import CommentsButtons from "./CommentsButtons";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  currentVote: CommentVote | undefined;
  votesAmt: number;
  postId: string;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  postId,
}) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const [isReplaying, setIsReplying] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const handleCloseComment = () => {
    setIsReplying(false);
  };

  const { mutate: replyToComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      };

      const { data } = await axios.patch("/api/category/post/comment", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error("Unauthorized");
        }
      }
      toast.error("There was an error");
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
    },
  });
  return (
    <div className="flex flex-col w-full" ref={commentRef}>
      <div className="flex items-center gap-2 text-sm pb-2">
        <Avatar
          size="sm"
          src={
            comment.author.image ? (comment.author.image as string) : undefined
          }
        />
        <div className="text-xs">{comment.author.username}</div>
        <p className="text-xs">
          {formatTimeToNow(new Date(comment.createdAt))}
        </p>
      </div>

      <p className="text-base">{comment.text}</p>
      <div className="flex flex-row text-sm">
        <CommentVotes
          commentId={comment.id}
          initialVotesAmt={votesAmt}
          initialVote={currentVote}
        />
        <Button
          size="sm"
          className="bg-transparent"
          onClick={() => {
            if (!session) return router.push("/sign-in");
            isReplaying ? setIsReplying(false) : setIsReplying(true);
          }}
        >
          reply
        </Button>
      </div>

      <div className="flex flex-row flex-wrap w-full">
        {isReplaying ? (
          <div className="w-full">
            <Textarea
              label="Reply"
              size="sm"
              labelPlacement="outside"
              placeholder="Enter your comment"
              className="w-full pl-4"
              id="comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <CommentsButtons
              handleClose={() => handleCloseComment()}
              isReplaying={isReplaying}
              onClick={() => {
                if (!input) return;
                replyToComment({
                  postId,
                  text: input,
                  replyToId: comment.replyToId ?? comment.id,
                });
                handleCloseComment();
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostComment;
