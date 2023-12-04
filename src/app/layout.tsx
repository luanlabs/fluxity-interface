'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import { usePathname } from 'next/navigation';

import { store } from 'src/store';
import myFont from 'src/utils/localFont';
import Aside from 'src/containers/Aside';
import CCard from 'src/components/CCard';
import Header from 'src/containers/Header';
import { Pages } from 'src/constants/pages';

import 'src/styles/globals.css';
import theme from '../styles/theme';
import StyledComponentsRegistry from '../styles/registry';
import AppDataFetch from 'src/containers/AppDataFetch';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const currentPath = usePathname();
  const knownRoutes = Object.values(Pages).find((path) => {
    if (currentPath === path) {
      return true;
    }

    if (currentPath.startsWith(Pages.STREAM_DETAILS)) {
      return true;
    }

    return false;
  });

  return (
    <html lang="en" className={myFont.className}>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/images/favicon.ico" />
        <meta
          name="keywords"
          content="Fluxity, Stellar, token streaming, cryptocurrency, blockchain, finance, digital payments, smart contracts"
        />
        <meta
          name="description"
          content="Fluxity offers a comprehensive token streaming solution built on the Stellar network, designed to facilitate real-time, secure, and automated digital payments. With Fluxity, users can create, manage, and monitor token streams effortlessly."
        />
        <meta name="copyright" content="Fluxity Finance" />
        <meta name="revised" content="Saturday, November 11th, 2023, 4:11 pm" />
        <meta name="abstract" content="New Payment Horizons with Token Streaming with Fluxity" />
        <meta name="topic" content="Token Streaming Solutions" />
        <meta
          name="summary"
          content="Fluxity is a token streaming platform unlocking new digital payment possibilities on the Stellar network."
        />
        <meta name="Classification" content="Business" />
        <meta name="author" content="Fluxity Team, fluxity.finance@gmail.com" />
        <meta name="designer" content="Fluxity Design Team" />
        <meta name="reply-to" content="fluxity.finance@gmail.com" />
        <meta name="owner" content="Fluxity Finance" />
        <meta name="url" content="http://fluxity.finance" />
        <meta name="identifier-URL" content="http://fluxity.finance" />
        <meta name="directory" content="submission" />
        <meta name="category" content="Finance, Cryptocurrency, Blockchain" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="subtitle" content="Unlock New Payment Possibilities" />
      </head>
      <body className="bg-alabaster">
        <Provider store={store}>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              <AppDataFetch />
              <main
                className="px-8 pt-[9px] pb-7 w-full xxl:w-[100%] 2xl:!w-[60%] 3xl:!w-[35%] h-screen
                2xl:h-[80vh] 3xl:h-[50vh] 4xl:h-[30vh] 4xl:!w-[30%] m-auto"
              >
                <CCard className="mb-[10px]" bgColor="white">
                  <Header />
                </CCard>
                <section className={`inline-flex basis-full gap-4 w-full h-[90%]`}>
                  <CCard
                    className={`relative overflow-hidden ${!knownRoutes && 'hidden'} ${
                      isMinimized
                        ? 'basis-[80px] transition-all duration-500'
                        : 'basis-[24%] lg:basis-[20%] transition-all duration-500'
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
