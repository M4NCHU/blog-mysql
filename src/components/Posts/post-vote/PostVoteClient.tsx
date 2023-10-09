"use client";

import { cn } from "@/lib/utils";
import { PostVoteRequest } from "@/lib/validators/vote";
import { usePrevious } from "@mantine/hooks";
import { Button } from "@nextui-org/react";
import { VoteType } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useMutation } from "react-query";
import PostVoteButton from "./PostVoteButton";
import { BiHeartCircle } from "react-icons/bi";

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient = ({
  postId,
  initialVotesAmt,
  initialVote,
}: PostVoteClientProps) => {
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  // ensure sync with server
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: type,
        postId: postId,
      };

      await axios.post("/api/category/post/vote", payload);
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
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === "UP") setVotesAmt((prev) => prev - 1);
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <>
      {/* upvote */}
      <div className="flex flex-row items-center gap-2">
        <PostVoteButton
          action={() => vote("UP")}
          currentVote={currentVote}
          type="UP"
        />

        {/* score */}
        <p className="text-center font-medium text-sm text-foreground">
          {votesAmt}
        </p>
      </div>

      {/* downvote */}
    </>
  );
};

export default PostVoteClient;
