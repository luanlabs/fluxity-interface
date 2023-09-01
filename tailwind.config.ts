import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#fafafa',
        mistyblue: '#ebfdff',
        mintcream: '#e4ffed',
        powderblue: '#E4F6F9',
        lavenderblush: '#f0efff',
        babyblueeyes: '#9af3ff',
        ufogreen: '#35e471',
        junglegreen: '#1c9b47',
        copperred: '#d98f7f',
        darkcoral: '#CD5A41',
        royalblue: '#3a21d4',
        blueindigo: '#4c36d8',
        lavenderblue: '#be7cff',
        richlavender: '#852FDA',
        lavender: '#f5ebff',
        mistyrose: '#ffe8e3',
        midnightblue: '#050142',
        softSkyBlue: '#E4F6F9',
        transparentmidnightblue: 'rgba(5, 1, 66, 0.5)',
        darkNavyBlue: 'rgba(5, 1, 66, 0.7)',
        darkcoral: '#CD5A41',
        powderblue: '#E4F6F9',
        richlavender: '#852FDA',
        mutedblue: '#7D7B9B',
        blueindigo: '#4c36d8',
      },
      screens: {
        sm: { max: '767px' },
        md: { min: '768px', max: '1023px' },
        lg: { min: '1024px', max: '1279px' },
        xl: { min: '1280px', max: '1535px' },
        xxl: { min: '1536px' },
      },
    },
  },
  plugins: [],
};

export default config;
