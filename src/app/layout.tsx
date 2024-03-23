import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.scss';

import {
  StyledComponentsRegistry,
  RecoilRootProvider,
  TanstackQueryProvider,
} from '@/app/lib/providers';
import { NavigationBar } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maru',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className={inter.className}>
        <TanstackQueryProvider>
          <RecoilRootProvider>
            <StyledComponentsRegistry>
              <NavigationBar />
              <main>{children}</main>
            </StyledComponentsRegistry>
          </RecoilRootProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
