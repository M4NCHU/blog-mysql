import Providers from "@/components/Providers";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";
import Layout from "@/components/layout/Layout";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

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
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="text-foreground bg-background min-h-screen antialiased my-custom-style min-h-screen">
        <Providers>
          <Toaster />
          <Layout>{children}</Layout>
          <ScrollToTopButton scrollThreshold={200} />
        </Providers>
      </body>
    </html>
  );
}
