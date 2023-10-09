import { cn } from "@/lib/utils";
import "../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "@/components/Providers";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Toaster } from "react-hot-toast";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";

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
  return (
    <html lang="en">
      <body className="text-foreground bg-background min-h-screen antialiased my-custom-style">
        <Providers>
          <Toaster />
          <Layout>{children}</Layout>
          <ScrollToTopButton scrollThreshold={200} />
        </Providers>
      </body>
    </html>
  );
}
