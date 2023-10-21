import CPageCard from 'src/components/CPageCard';
import CreateStreamCardPurpleCard from 'src/containers/CreateStreamCardPurpleCard';
import DocumentationCard from 'src/containers/DocumentationCard';
import WelcomeToFluxityCard from 'src/containers/WelcomeToFluxityCard';

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
