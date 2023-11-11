import type { Metadata } from 'next';

import CPageCard from 'src/components/CPageCard';
import FaqCard from 'src/containers/FaqCard';
import WelcomeToFluxityCard from 'src/containers/WelcomeToFluxityCard';
import ClaimTokenCard from 'src/containers/ClaimTokenCard';

export const metadata: Metadata = {
  title: 'Fluxity - Home',
  description: 'Your command center to create, monitor, and manage your token streams.',
};

export default function Home() {
  return (
    <CPageCard className="w-full py-[23px] px-[27px]">
      <WelcomeToFluxityCard />
      <p className="text-2xl font-medium my-[18px] ml-1">More with Fluxity</p>
      <div className="flex basis-1/2 w-full gap-4">
        <FaqCard />
        <ClaimTokenCard />
      </div>
    </CPageCard>
  );
}
