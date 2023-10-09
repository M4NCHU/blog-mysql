import CreatePost from "@/components/Forms/Create/CreatePost";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const category = await db.category.findFirst({
    where: {
      name: params.slug,
    },
  });

  const categoryNames = await db.category.findMany();
  const names = categoryNames.map((category) => category.name);

  if (!category) {
    return notFound();
  }

  return (
    <CreatePost slug={params.slug} categoryId={category.id} names={names} />
  );
};

export default page;
