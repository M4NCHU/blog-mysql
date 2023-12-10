import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const session = await getAuthSession();

  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const oneHourAgo = new Date(currentDate);
  oneHourAgo.setHours(currentDate.getHours() - 1);

  const UserNotifications = await db.post.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
        lte: currentDate,
      },
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
  console.log("UserNotifications", UserNotifications);

  const category = await db.category.findMany();
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* <SidebarWrapper category={category} session={session} /> */}
        <Header
          notifications={UserNotifications ? UserNotifications : null}
          session={session}
        />
        <main className="w-full flex justify-center mt-[4rem]">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
