import "./globals.css";
import { ReactNode } from "react";
import LayoutWrapper from "./layout-wrapper";

export const metadata = {
  title: "BLOGIFY",
  description: "Blogging Platform for Bloggers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
