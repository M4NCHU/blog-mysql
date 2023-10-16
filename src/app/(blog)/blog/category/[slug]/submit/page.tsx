import CreatePost from "@/components/Forms/Create/CreatePost";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const session = await getAuthSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/blog");
  }

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
