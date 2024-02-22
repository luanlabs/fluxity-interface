import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 1024);
  const [isDesktop, setIsDesktop] = useState(width > 1024);

  const handleResize = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    setIsMobile(newWidth <= 1024);
    setIsDesktop(newWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { width, isMobile, isDesktop };
};

export default useWindowSize;
