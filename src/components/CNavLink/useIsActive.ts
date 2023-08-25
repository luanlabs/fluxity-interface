import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useIsActive = (url: string) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (pathname === url) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname, url]);

  return isActive;
};

export default useIsActive;
