import type { Metadata } from 'next';

import CPageCard from 'src/components/CPageCard';
import DocumentationCard from 'src/containers/DocumentationCard';
import WelcomeToFluxityCard from 'src/containers/WelcomeToFluxityCard';
import CreateStreamCardPurpleCard from 'src/containers/CreateStreamCardPurpleCard';

export const metadata: Metadata = {
  title: 'Fluxity - Home',
  description: 'Your command center to create, monitor, and manage your token streams.',
};

export default function Home() {
  return (
    <CPageCard className="w-full py-[23px] px-[27px] ">
      <WelcomeToFluxityCard />
      <p className="text-2xl font-normal my-[18px] ml-1">More with Fluxity</p>
      <div className="flex gap-6">
        <CreateStreamCardPurpleCard />
        <DocumentationCard />
      </div>
    </CPageCard>
  );
}
