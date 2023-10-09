"use client";

import { Skeleton } from "@nextui-org/react";
import { FC } from "react";

interface PostsSkeletonProps {}

const PostsSkeleton: FC<PostsSkeletonProps> = ({}) => {
  return (
    <div className="mt-6 md:p-2 gap-6 pt-6 flex  flex-row min-w-1 flex-grow">
      {/* Card Section Top */}
      <div className="flex flex-col gap-2 w-full px-4 md:px-4 lg:px-8">
        <Skeleton className="h-8 w-12 rounded-lg" />
        <div className="flex flex-row justify-between items-center mb-6 gap-2">
          <Skeleton className="h-3 w-12 rounded-lg" />
          <Skeleton className="h-3 w-12 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 gap-6 justify-center w-full">
          {[...Array(8).keys()].map((item) => (
            <div
              key={item}
              className=" grow bg-transparent border-none px-2 rounded-xl cursor-pointer"
            >
              <div className="py-5 gap-2 flex flex-col">
                <div className="post-header flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-2">
                    <Skeleton className="flex rounded-full w-8 h-8" />

                    <Skeleton className="h-3 w-16 rounded-lg" />
                    <div>
                      <Skeleton className="h-3 w-3 rounded-full" />
                    </div>
                    <div className="flex flex-row items-center flex-wrap">
                      <span className="text-xs text-foregroundSecond">
                        <Skeleton className="h-3 w-12 rounded-lg" />
                      </span>
                    </div>
                  </div>

                  <div className="post-actions">
                    <Skeleton className="h-3 w-10 rounded-lg" />
                  </div>
                </div>
                <div className="post-title w-full break-all">
                  <h3 className="inline-block text-xl overflow-auto mb-4 text-foreground ">
                    <Skeleton className="h-3 w-48 rounded-lg" />
                  </h3>
                </div>

                <div className="relative text-sm max-h-40 w-full overflow-clip">
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>

                <div className="flex flex-row items-center gap-4 px-2 pt-4">
                  <div className="gap-2 px-4 flex flex-row items-center post-actions ">
                    <Skeleton className="h-3 w-5 rounded-lg" />
                    <Skeleton className="h-3 w-5 rounded-lg" />
                  </div>
                  <div className="gap-2 flex flex-row items-center post-actions ">
                    {/* <GoComment/> */}

                    <Skeleton className="h-3 w-5 rounded-lg" />
                    <p className="text-center font-medium text-sm text-foreground">
                      <Skeleton className="h-3 w-5 rounded-lg" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-b-1 border-default-100">{}</div>
      </div>
    </div>
  );
};

export default PostsSkeleton;
