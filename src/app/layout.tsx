'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import { usePathname } from 'next/navigation';

import { store } from 'src/store';
import Aside from 'src/containers/Aside';
import CCard from 'src/components/CCard';
import Header from 'src/containers/Header';
import { Pages } from 'src/constants/pages';

import '../styles/globals.css';
import theme from '../styles/theme';
import StyledComponentsRegistry from '../styles/registry';
import AppDataFetch from 'src/containers/AppDataFetch';

const myFont = localFont({
  src: [
    { style: 'normal', weight: '400', path: '../../public/font/Aeonik-Regular.ttf' },
    { style: 'normal', weight: '500', path: '../../public/font/Aeonik-Medium.ttf' },
    { style: 'normal', weight: '700', path: '../../public/font/Aeonik-Bold.ttf' },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const pathname = usePathname();
  const knownRoutes = Object.values(Pages).includes(pathname as Pages);

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
      <body>
        <Provider store={store}>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              <AppDataFetch />
              <main className="bg-alabaster h-screen px-8 pt-[9px] pb-7">
                <CCard className="mb-[10px]" bgColor="white">
                  <Header />
                </CCard>
                <section className={`inline-flex basis-full gap-4 w-full h-[90%] overflow-hidden`}>
                  <CCard
                    className={`relative overflow-hidden ${!knownRoutes && 'hidden'} ${
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
                <Toaster position="bottom-center" />
              </main>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
}
