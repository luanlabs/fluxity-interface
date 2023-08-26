import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useIsActive = (url: string) => {
  const pathname = usePathname();
  return pathname === url;
};

export default useIsActive;
