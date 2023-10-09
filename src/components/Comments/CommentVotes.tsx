"use client";

import { cn } from "@/lib/utils";
import { CommentVoteRequest } from "@/lib/validators/vote";
import { usePrevious } from "@mantine/hooks";
import { Button } from "@nextui-org/react";
import { CommentVote, VoteType } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  AiFillHeart,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineHeart,
} from "react-icons/ai";
import { useMutation } from "react-query";

type PartialVote = Pick<CommentVote, "type">;

interface CommentVoteProps {
  commentId: string;
  initialVotesAmt: number;
  initialVote?: PartialVote;
}

const CommentVotes = ({
  commentId,
  initialVotesAmt,
  initialVote,
}: CommentVoteProps) => {
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  // ensure sync with server

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: CommentVoteRequest = {
        voteType: type,
        commentId: commentId,
      };

      await axios.post("/api/category/post/comment/vote", payload);
    },
    onError: (err, voteType) => {
      if (voteType === "UP") setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          toast.error("You must be logged in.");
        }
      }
      toast.error("Something went wrong.");
    },
    onMutate: (type) => {
      if (currentVote?.type === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === "UP") setVotesAmt((prev) => prev - 1);
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote({ type });
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex flex-row gap-4 ">
      {/* upvote */}

      <Button
        isIconOnly
        size="sm"
        className={`hover:text-danger-200/20 hover:text-danger-500 bg-transparent text-xl rounded-full hover:bg-default-200  ${
          currentVote?.type === "UP" ? "text-danger-500" : ""
        }`}
        onClick={() => vote("UP")}
        aria-label="upvote"
      >
        {currentVote?.type === "UP" ? <AiFillHeart /> : <AiOutlineHeart />}
      </Button>

      {/* score */}
      <p className="text-center py-2 font-medium text-xs text-foreground">
        {votesAmt}
      </p>

      {/* downvote */}
      {/* <button
        onClick={() => vote("DOWN")}
        className={cn({
          "text-emerald-500": currentVote?.type === "DOWN",
        })}
        aria-label="downvote"
      >
        <AiOutlineArrowDown
          className={cn(
            "h-5 w-5 hover:fill-red-500 hover:bg-default-50 rounded-full",
            {
              " fill-red-500": currentVote?.type === "DOWN",
            }
          )}
        />
      </button> */}
    </div>
  );
};

export default CommentVotes;
