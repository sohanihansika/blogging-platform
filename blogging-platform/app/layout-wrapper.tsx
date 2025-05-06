"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import MainHeader from "@/components/main-header/main-header";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import { SessionProvider } from "next-auth/react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signup" || pathname === "/signin";

  return (
    <SessionProvider>
      {!isAuthPage && (
        <>
          <MainHeaderBackground />
          <MainHeader />
        </>
      )}
      {children}
    </SessionProvider>
  );
}
