import type { Metadata } from 'next';

import CPageCard from 'src/components/CPageCard';
import FaqCard from 'src/containers/FaqCard';
import WelcomeToFluxityCard from 'src/containers/WelcomeToFluxityCard';
import ClaimTokenCard from 'src/containers/ClaimTokens';

export const metadata: Metadata = {
  title: 'Fluxity - Home',
  description:
    'Welcome to Fluxity, your premier token streaming platform on the Stellar network. Experience seamless creation, management, and monitoring of your cryptocurrency streams. Dive into our user-friendly interface where you can easily navigate to create token streams, manage vesting schedules, and view detailed activity history. Claim your testnet tokens today and begin exploring the future of digital payments. With Fluxity, streamline your transactions with cutting-edge blockchain technology, ensuring security, efficiency, and real-time payment solutions. Get quick support with our comprehensive FAQ section and start your token streaming journey with us.',
  keywords:
    'token stream, cryptocurrency, Stellar, time-based payment, automated transactions, faq, test token',
};

export default function Home() {
  return (
    <CPageCard
      className="w-full py-[23px] px-[27px] mobile:pt-3 mobile:px-5 mobile:mb-[50px]"
      borderStatus="bordered"
    >
      <WelcomeToFluxityCard />
      <p className="text-2xl font-medium my-[18px] mobile:my-3 ml-1">More with Fluxity</p>
      <div className="flex mobile:flex-col mobile:basis-full basis-1/2 w-full gap-4 mobile:gap-2">
        <FaqCard />
        <ClaimTokenCard />
      </div>
    </CPageCard>
  );
}
