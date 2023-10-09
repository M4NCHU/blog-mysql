"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarContextProvider } from "@/context/SidebarContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <SidebarContextProvider>{children}</SidebarContextProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
