'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';

import { store } from 'src/store';
import Aside from 'src/containers/Aside';
import CCard from 'src/components/CCard';
import Header from 'src/containers/Header';

import 'src/styles/globals.css';
import theme from '../styles/theme';
import StyledComponentsRegistry from '../styles/registry';
import { Pages } from 'src/constants/pages';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const pathname = usePathname();
  const knownRoutes = Object.values(Pages).includes(pathname as Pages);

  return (
    <html lang="en">
      <body className="bg-alabaster">
        <Provider store={store}>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              <main
                className="px-8 pt-[9px] pb-7 w-full xxl:w-[100%] 2xl:!w-[60%] 3xl:!w-[35%] h-screen
                2xl:h-[80vh] 3xl:h-[50vh] 4xl:h-[30vh] 4xl:!w-[30%] m-auto"
              >
                <CCard className="mb-[10px]" bgColor="white">
                  <Header />
                </CCard>
                <section className={`inline-flex basis-full gap-4 w-full h-[90%] overflow-hidden`}>
                  <CCard
                    className={`relative overflow-hidden ${!knownRoutes && 'hidden'} ${
                      isMinimized
                        ? 'basis-[80px] transition-all duration-500'
                        : 'basis-[30%] lg:basis-[20%] transition-all duration-500'
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
                <Toaster position="bottom-center" />
              </main>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
}
