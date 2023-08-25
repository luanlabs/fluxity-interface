import { useEffect, useState } from 'react';

const useCustomID = (key: string): string => {
  const [id, setId] = useState(0);

  useEffect(() => {
    const randomId = Math.round(Math.random() * 2000);
    setId(randomId);
  }, []);

  return `${key}${id}`;
};

export default useCustomID;
