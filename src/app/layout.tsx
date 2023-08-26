'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';

import Aside from 'src/containers/Aside';
import CCard from 'src/components/CCard';
import Header from 'src/containers/Header';
import CPageCard from 'src/components/CPageCard';

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
            <CCard className="mb-[10px]" bgColor="white">
              <Header />
            </CCard>
            <section className="inline-flex basis-full gap-4 w-full h-[87%]">
              <CCard
                className={`${
                  isMinimized ? 'basis-[5%] md:basis-1/12' : 'basis-[22%]'
                } md:basis-2/12 px-[15px] py-[19px] relative`}
                bgColor="white"
              >
                <Aside
                  isMinimized={isMinimized}
                  onClick={() => setIsMinimized(!isMinimized)}
                />
              </CCard>
              <CPageCard className="bg-white basis-full py-[23px] px-[27px]">
                <article>{children}</article>
              </CPageCard>
            </section>
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
