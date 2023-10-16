import BlogRightWrapper from "@/components/BlogRight/BlogRightWrapper";
import CardWrapper from "@/components/BlogRight/CardWrapper";
import SidebarOpenBtn from "@/components/Sidebar/SidebarOpenBtn";
import SidebarResume from "@/components/Sidebar/SidebarResume";
import { SidebarWrapper } from "@/components/Sidebar/sidebar";
import ResumeContents from "@/components/resume/ResumeContents";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Metadata } from "next";

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

  const category = await db.category.findMany();
  return (
    <div className="flex w-full flex-row min-h-screen flex-grow container ">
      <SidebarWrapper category={category} session={session}>
        <SidebarResume category={category} session={session} />
      </SidebarWrapper>
      {children}
      <BlogRightWrapper>
        <ResumeContents />
      </BlogRightWrapper>
      {/* <ScrollToTopButton bottom="bottom-16" scrollThreshold={200} /> */}
      <SidebarOpenBtn />
    </div>
  );
}
