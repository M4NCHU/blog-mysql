import SidebarOpenBtn from "@/components/Sidebar/SidebarOpenBtn";
import { SidebarWrapper } from "@/components/Sidebar/sidebar";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";
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

  const category = await db.category.findMany();
  return (
    <div className="flex w-full flex-row flex-grow container ">
      <SidebarWrapper category={category} session={session} />
      {children}
      {/* <ScrollToTopButton bottom="bottom-16" scrollThreshold={200} /> */}
      <SidebarOpenBtn />
    </div>
  );
}
