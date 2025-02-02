import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    { style: 'normal', weight: '400', path: '../../public/font/Aeonik-Regular.woff' },
    { style: 'normal', weight: '500', path: '../../public/font/Aeonik-Medium.woff' },
  ],
});

export default myFont;
