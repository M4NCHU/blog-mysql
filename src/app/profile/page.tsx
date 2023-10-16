import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

interface pageProps {}

const page = async ({}) => {
  const session = await getAuthSession();

  if (!session) redirect("/");

  return redirect(`/profile/${session.user.id}`);
};

export default page;
