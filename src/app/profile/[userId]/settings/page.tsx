export const metadata = {
  title: "Settings",
  description: "Account settings",
};

import UserNameSettings from "@/components/Forms/Settings/UserNameSettings";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

interface pageProps {}

const page = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }

  return (
    <div className="grow flex flex-col pt-12 px-4 gap-4">
      <div className="Settings-header">
        <h1 className="font-semibold text-xl">Settings</h1>
      </div>
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
