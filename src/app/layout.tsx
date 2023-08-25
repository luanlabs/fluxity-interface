'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';

import CNavLink from 'src/components/CNavLink';
import Header from 'src/containers/Header';
import CCard from 'src/components/CCard';

import '../styles/globals.css';
import StyledComponentsRegistry from '../styles/registry';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <main className="bg-alabaster h-screen px-8 pt-[9px] pb-7">
            <CCard className="mb-3" bgColor="white">
              <Header />
            </CCard>
            <section className="inline-flex basis-full gap-4 w-full h-5/6">
              <aside
                className={`bg-white px-[15px] ${
                  isMinimized ? 'basis-1/12 md:basis-1/12' : 'basis-3/12'
                } md:basis-2/12 rounded-[14px]`}
              >
                <button
                  className="border-none outline-none"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  |-|
                </button>
                <CNavLink
                  title="Home"
                  icon={<span className="bg-blue-500 h-8 w-8" />}
                  url={'/'}
                  isMinimized={isMinimized}
                />
              </aside>
              <article className="bg-white basis-full rounded-[14px]">
                {children}
              </article>
            </section>
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
