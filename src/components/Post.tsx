'use client'

import { formatTimeToNow } from '@/lib/utils'
import { Post, User, Vote } from '@prisma/client'
// import { MessageSquare } from 'lucide-react'
import {Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link} from "@nextui-org/react";
import NextLink from "next/link";
import { FC, useRef } from 'react'
import EditorOutput from './EditorOutput'
import PostVoteClient from './post-vote/PostVoteClient'
import { Avatar, Card, CardBody } from '@nextui-org/react'
import { AiOutlineDotChart } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { GoComment, GoDotFill } from 'react-icons/go'
// import EditorOutput from './EditorOutput'
// import PostVoteClient from './post-vote/PostVoteClient'

type PartialVote = Pick<Vote, 'type'>

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  votesAmt: number
  subredditName: string
  currentVote?: PartialVote
  commentAmt: number
}

const Post: FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  subredditName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null)

  return (
    <>
    
    
    <Card className=" bg-default-50/60 dark:bg-default-100/503" isBlurred shadow="sm">
      
      <CardBody className="py-5 gap-4">
        <div className='post-header flex flex-row justify-between items-center'>
          <div className='flex flex-row items-center gap-2'>
            <Avatar isBordered src={post.author.image ? post.author.image : undefined} size='sm' />
            {subredditName ? (
            <Link href={`/r/${subredditName}`} as={NextLink} color="success" isBlock className='text-sm'>
             {subredditName}
            </Link>
              ) : null}
              <div>
                <GoDotFill className="text-xs"/>
              </div>
            <div className='flex flex-row items-center flex-wrap'>
              <span className='text-xs'>Posted by <Link href={`/u/${post.author.username}`} as={NextLink} color="foreground" className='text-xs'>{post.author.username}</Link> - </span>
              <span className='text-xs'>{formatTimeToNow(new Date(post.createdAt))}</span>
            </div>

          </div>

          <div>
          <Dropdown>
            <DropdownTrigger>
              <Button 
                isIconOnly variant="ghost" aria-label="Open options"
              >
                <BiDotsHorizontalRounded/>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">Save post</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Do not show again
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </div>
          
        </div>
        <div className='post-title'>
          <Link href={`/r/${subredditName}/post/${post.id}`}>
            <h3>
              {post.title}
            </h3>
          </Link>
        </div>

        <div className='relative text-sm max-h-40 w-full overflow-clip'
            ref={pRef}>
        
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'></div>
            ) : null}
        </div>

        <div className='post-actions flex flex-row gap-4'>
          <Chip color="default" variant="flat">
            <PostVoteClient
              postId={post.id}
              initialVotesAmt={_votesAmt}
              initialVote={_currentVote?.type}
            />
          </Chip>
          <Chip startContent={<GoComment size={18} />} color="default" variant="flat" className='gap-2 px-4'>
            {/* <GoComment/> */}
            {commentAmt}
          </Chip>
        </div>
      </CardBody>
    </Card>
    
    {/* <hr className='text-white mt-12 w-full'/> */}
    </>
  )
}
export default Post