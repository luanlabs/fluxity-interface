'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';

import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import StyledComponentsRegistry from '../styles/registry';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isFolded, setIsFolded] = useState(false);
  console.log(isFolded);

  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <main className="bg-alabaster h-screen px-8 pt-[9px] pb-7">
            <header className="bg-white h-[72px] rounded-[14px] mb-3">head</header>
            <section className="inline-flex basis-full gap-4 w-full h-5/6">
              <aside
                className={`bg-white ${
                  isFolded ? 'basis-1/12 md:basis-1/12' : 'basis-3/12'
                } md:basis-2/12 rounded-[14px]`}
              >
                <button
                  className="border-none outline-none"
                  onClick={() => setIsFolded(!isFolded)}
                >
                  |-|
                </button>
                aside
              </aside>
              <article className="bg-white basis-full rounded-[14px]">{children}</article>
            </section>
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
