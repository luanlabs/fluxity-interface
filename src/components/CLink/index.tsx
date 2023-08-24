import React from 'react';
import Link from 'next/link';

import { Link as Type } from 'src/constants/types';

const CustomLink = ({ title, url }: Type) => {
  return (
    <Link href={url} className="text-DarkNavyBlue text-lg mx-2">
      {title}
    </Link>
  );
};

export default CustomLink;
