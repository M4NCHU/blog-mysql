"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
// import { MessageSquare } from 'lucide-react'
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import NextLink from "next/link";
import { FC, useEffect, useRef } from "react";
import EditorOutput from "../EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import { AiOutlineDotChart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GoComment, GoDotFill } from "react-icons/go";
import { getAuthSession } from "@/lib/auth";
import { classNames } from "uploadthing/client";
import { useRouter } from "next/navigation";
import PostHeader from "./PostHeader";
// import EditorOutput from './EditorOutput'
// import PostVoteClient from './post-vote/PostVoteClient'

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmt: number;
  categoryName: string;
  currentVote?: PartialVote;
  commentAmt: number;
}

const Post: FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  categoryName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLParagraphElement>(null);

  const router = useRouter();

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    // Tutaj możesz umieścić swoją logikę obsługi kliknięcia przycisku
  };

  // Dodajmy efekt, który przypisze obsługę kliknięcia przyciskowi
  useEffect(() => {
    const postActionsElements = buttonRef.current?.querySelectorAll("button");
    if (postActionsElements) {
      postActionsElements.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
      });
    }

    // Warto usunąć nasłuchiwanie zdarzeń, gdy komponent jest oczyszczany
    return () => {
      if (postActionsElements) {
        postActionsElements.forEach((button) => {
          button.removeEventListener("click", handleButtonClick);
        });
      }
    };
  }, []);

  return (
    <>
      <div
        className=" hover:bg-default-100 grow bg-transparent border-none px-4 rounded-xl cursor-pointer"
        ref={buttonRef}
      >
        <div className="py-5 gap-4 flex flex-col">
          <div className="post-header flex flex-row justify-between items-center">
            <PostHeader
              categoryName={categoryName}
              createdAt={post.createdAt}
              image={
                post.author.image ? (post.author.image as string) : undefined
              }
            />

            <div className="post-actions">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="border-none text-xl rounded-full"
                    aria-label="Open options"
                  >
                    <BiDotsHorizontalRounded />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">Save post</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Do not show again
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="post-title w-full break-all">
            <h3 className="inline-block text-xl overflow-auto  font-semibold py-2 mb-2 text-foreground ">
              {post.title}
            </h3>
          </div>

          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-default-50/60 to-transparent"></div>
            ) : null}
          </div>

          <div className="flex flex-row items-center gap-4 px-2 pt-4">
            <div className="gap-2 flex flex-row items-center post-actions ">
              <PostVoteClient
                postId={post.id}
                initialVotesAmt={_votesAmt}
                initialVote={_currentVote?.type}
              />
            </div>
            <div className="gap-2 flex flex-row items-center post-actions ">
              {/* <GoComment/> */}

              <Button
                size="sm"
                isIconOnly
                className={`hover:bg-default-200 bg-transparent text-xl rounded-full`}
                onClick={() => router.push("/")}
              >
                <GoComment />
              </Button>
              <p className="text-center font-medium text-sm text-foreground">
                {commentAmt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-default-100 mt-2">{}</div>
      {/* <hr className='text-white mt-12 w-full'/> */}
    </>
  );
};
export default Post;
