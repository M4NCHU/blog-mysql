import BlogRightWrapper from "@/components/BlogRight/BlogRightWrapper";
import CardWrapper from "@/components/BlogRight/CardWrapper";
import SidebarBlog from "@/components/Sidebar/SidebarBlog";
import SidebarOpenBtn from "@/components/Sidebar/SidebarOpenBtn";
import SidebarProfile from "@/components/Sidebar/SidebarProfile";
import { SidebarWrapper } from "@/components/Sidebar/sidebar";
import TagList from "@/components/Tags/TagList";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
};

interface RootLayoutProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default async function Layout({ children, authModal }: RootLayoutProps) {
  const session = await getAuthSession();
  if (!session) redirect("/");

  const category = await db.category.findMany();
  return (
    <div className="flex w-full flex-row min-h-screen flex-grow container ">
      <SidebarWrapper category={category} session={session}>
        <SidebarProfile category={category} session={session} />
      </SidebarWrapper>
      {children}
      <BlogRightWrapper>
        <CardWrapper>
          <h4 className="font-semibold text-lg mb-2">You may like</h4>
        </CardWrapper>
      </BlogRightWrapper>
      {/* <ScrollToTopButton bottom="bottom-16" scrollThreshold={200} /> */}
      <SidebarOpenBtn />
    </div>
  );
}
