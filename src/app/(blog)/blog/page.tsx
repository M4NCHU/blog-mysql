import BlogRightWrapper from "@/components/BlogRight/BlogRightWrapper";
import CardWrapper from "@/components/BlogRight/CardWrapper";
import CustomFeed from "@/components/Feed/CustomFeed";
import GeneralFeed from "@/components/Feed/GeneralFeed";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { useParams, useRouter } from "next/navigation";
import { FC, Suspense } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const { slug } = params;
  const session = await getAuthSession();

  console.log(params.slug);

  return (
    <>
      <div className="grow">
        <Suspense fallback={<PostsSkeleton />}>
          {session ? <CustomFeed /> : <GeneralFeed />}
        </Suspense>
      </div>
      <BlogRightWrapper>
        <CardWrapper>Content</CardWrapper>
      </BlogRightWrapper>
    </>
  );
};

export default page;
