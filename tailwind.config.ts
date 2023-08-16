import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    theme: {
      extend: {
        colors: {
          alabaster: '#fafafa',
          mistyblue: '#ebfdff',
          mintcream: '#e4ffed',
          lavenderblush: '#f0efff',
          babyblueeyes: '#9af3ff',
          ufogreen: '#35e471',
          junglegreen: '#1c9b47',
          copperred: '#d98f7f',
          royalblue: '#3a21d4',
          lavenderblue: '#be7cff',
          lavender: '#f5ebff',
          mistyrose: '#ffe8e3',
          midnightblue: '#050142',
          transparentmidnightblue: 'rgba(5, 1, 66, 0.5)',
        },
        screens: {
          sm: { min: '640px', max: '767px' },
          md: { min: '768px', max: '1023px' },
          lg: { min: '1024px', max: '1279px' },
          xl: { min: '1280px', max: '1535px' },
          xxl: { min: '1536px' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
