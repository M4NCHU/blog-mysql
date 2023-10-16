import BlogRightWrapper from "@/components/BlogRight/BlogRightWrapper";
import CardWrapper from "@/components/BlogRight/CardWrapper";
import CustomFeed from "@/components/Feed/CustomFeed";
import GeneralFeed from "@/components/Feed/GeneralFeed";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import TagList from "@/components/Tags/TagList";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button } from "@nextui-org/react";
import { Suspense } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const { slug } = params;
  const session = await getAuthSession();

  const tags = await db.tag.findMany({
    take: 24,
  });

  return (
    <>
      <div className="grow">
        <Suspense fallback={<PostsSkeleton />}>
          {session ? <CustomFeed /> : <GeneralFeed />}
        </Suspense>
      </div>
      <BlogRightWrapper>
        <CardWrapper>
          <h4 className="font-semibold text-lg mb-2">You may like</h4>
          <TagList tags={tags} />
        </CardWrapper>
      </BlogRightWrapper>
    </>
  );
};

export default page;
