export const metadata = {
  title: "Settings",
  description: "Account settings",
};

import UserNameSettings from "@/components/Settings/UserNameSettings";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

interface pageProps {}

const page = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }

  return (
    <div>
      <UserNameSettings
        user={{
          id: session.user.id,
          username: session.user.username || "",
        }}
      />
    </div>
  );
};

export default page;
