import CreateCategory from "@/components/Forms/Create/CreateCategory";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getAuthSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/blog");
  }

  return <CreateCategory />;
};

export default Page;
