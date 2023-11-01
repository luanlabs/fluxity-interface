'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import logo from 'public/images/404.svg';
import CButton from 'src/components/CButton';
import { Pages } from 'src/constants/pages';

export default function NotFound() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(Pages.HOME);
  };

  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <Image src={logo} alt="404 image" />
      <p className="mt-5 text-2xl font-medium">Page not found</p>
      <p className="mt-4 text-base font-medium">
        Sorry, but we cannot locate your requested page.
      </p>
      <CButton
        content="Go to Home"
        variant="simple"
        color="blueWhite"
        className="!border-royalBlue border mt-[53px]"
        onClick={handleRedirect}
      />
    </div>
  );
}
