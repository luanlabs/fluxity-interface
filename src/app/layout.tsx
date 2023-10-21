'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { store } from 'src/store';
import Aside from 'src/containers/Aside';
import CCard from 'src/components/CCard';
import Header from 'src/containers/Header';

import '../styles/globals.css';
import theme from '../styles/theme';
import StyledComponentsRegistry from '../styles/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              <main className="bg-alabaster h-screen px-8 pt-[9px] pb-7">
                <CCard className="mb-[10px]" bgColor="white">
                  <Header />
                </CCard>
                <section className="inline-flex basis-full gap-4 w-full h-[90%] overflow-hidden">
                  <CCard
                    className={`relative overflow-hidden ${
                      isMinimized
                        ? 'basis-[80px] transition-all duration-500'
                        : 'basis-[20%] transition-all duration-500'
                    } px-[15px] py-[19px]`}
                    bgColor="white"
                  >
                    <Aside
                      isMinimized={isMinimized}
                      onMinimized={() => setIsMinimized(!isMinimized)}
                    />
                  </CCard>
                  <article className="basis-full">{children}</article>
                </section>
              </main>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
}
