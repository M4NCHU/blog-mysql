import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";
import Header from "../Header/Header";
import { SidebarWrapper } from "../Sidebar/sidebar";
import Footer from "../Footer/Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const session = await getAuthSession();

  const category = await db.category.findMany();
  return (
    <>
      <div className="flex flex-col">
        {/* <SidebarWrapper category={category} session={session} /> */}
        <Header session={session} />
        <main className="w-full flex justify-center mt-[4rem]">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
