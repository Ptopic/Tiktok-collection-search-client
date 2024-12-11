import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      red: '#FF0000',
      turquoise100: '#EFFCFF',
      turquoise200: '#DFFAFF',
      turquoise300: '#BDF4FF',
      turquoise400: '#97EEFF',
      turquoise500: '#00E1FF',
      turquoise600: '#00C4DE',
      turquoise700: '#00A7BE',
      turquoise800: '#007080',
      turquoise900: '#00272E',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
