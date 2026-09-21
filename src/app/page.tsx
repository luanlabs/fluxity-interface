import type { Metadata } from 'next';

import CPageCard from 'src/components/CPageCard';
import ClaimTokens from 'src/containers/ClaimTokens';
import FaqCard from 'src/containers/FaqCard';
import WelcomeToFluxityCard from 'src/containers/WelcomeToFluxityCard';

export const metadata: Metadata = {
  title: 'Fluxity - Home',
  description:
    'Welcome to Fluxity, your premier token streaming platform on the Stellar network. Experience seamless creation, management, and monitoring of your cryptocurrency streams. Create token streams, manage vesting schedules, view detailed activity history, and get testnet USDC through Blux. Fluxity brings security, efficiency, and real-time payment tools together in one streamlined interface.',
  keywords:
    'token stream, cryptocurrency, Stellar, time-based payment, automated transactions, faq, test token',
};

export default function Home() {
  return (
    <CPageCard
      scroll
      borderStatus="borderless"
      className="w-full h-full pb-2 pt-[23px] px-[27px] mobile:h-full mobile:overflow-y-scroll mobile:pt-3 mobile:px-5"
    >
      <WelcomeToFluxityCard />
      <p className="text-2xl font-medium my-[18px] mobile:my-3 ml-1">More with Fluxity</p>
      <div className="flex mobile:flex-col mobile:basis-full basis-1/2 w-full gap-4 mobile:gap-2 mobile:mb-2">
        <FaqCard />
        <ClaimTokens />
      </div>
    </CPageCard>
  );
}
