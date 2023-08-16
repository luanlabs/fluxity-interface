import '../styles/registry';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../styles/registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fluxity',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <header>head</header>
          <aside>aside</aside>
          <section> {children}</section>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
