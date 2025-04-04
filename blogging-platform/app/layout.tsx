import MainHeader from '../components/main-header/main-header';
import MainHeaderBackground from '../components/main-header/main-header-background';
import './globals.css';

export const metadata = {
  title: "BLOGIFY",
  description: "Blogging Platform for Bloggers",
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <>

        <MainHeaderBackground />

        <MainHeader />


        </>
        {children}
      </body>
    </html>
  );
}
