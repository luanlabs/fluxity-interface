import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#fafafa',
        mistyBlue: '#ebfdff',
        mintCream: '#e4ffed',
        lavenderBlush: '#f0efff',
        babyBlueEyes: '#9af3ff',
        ufoGreen: '#35e471',
        jungleGreen: '#1c9b47',
        copperRed: '#d98f7f',
        darkCoral: '#CD5A41',
        royalBlue: '#3a21d4',
        blueIndigo: '#4c36d8',
        lavenderBlue: '#be7cff',
        richLavender: '#852FDA',
        lavender: '#f5ebff',
        mistyRose: '#ffe8e3',
        midnightBlue: '#050142',
        softSkyBlue: '#E4F6F9',
        transparentMidnightBlue: 'rgba(5, 1, 66, 0.5)',
        darkNavyBlue: 'rgba(5, 1, 66, 0.7)',
        mutedBlue: '#7D7B9B',
        forestGreen: '#1C9B47',
        paleMint: '#E4FFED',
        paleCyan: '#EBFDFF',
        error: '#FF7474',
        darkBlue: '#050142',
        lavenderGray: '#E6E6EC',
        buttonHover: '#1C0894',
        togglePurple: '#3A21D4',
      },
      screens: {
        sm: { max: '767px' },
        md: { min: '768px', max: '1023px' },
        lg: { min: '1024px', max: '1279px' },
        xl: { min: '1280px', max: '1535px' },
        xxl: { min: '1536px' },
      },
      backgroundImage: {
        calendar: "url('/images/calendar.svg')",
        disableCalendar: "url('/images/disableCalendar.svg')",
      },
      fontFamily: {
        reg: 'Aeonik-Reg',
        med: 'Aeonik-Med',
        bld: 'Aeonik-Bold',
      },
    },
  },
  plugins: [],
};

export default config;
