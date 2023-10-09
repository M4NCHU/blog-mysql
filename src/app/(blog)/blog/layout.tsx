import { SidebarWrapper } from "@/components/Sidebar/sidebar";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog",
};

interface RootLayoutProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default async function RootLayout({
  children,
  authModal,
}: RootLayoutProps) {
  const session = await getAuthSession();
  // console.log(props.slug && props.slug);

  const category = await db.category.findMany();
  return (
    <div className="flex w-full flex-row flex-grow container ">
      <SidebarWrapper category={category} session={session} />
      {children}
    </div>
  );
}
