// import { _aspectRatio } from '#tailwind-config/theme'
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import aspectRatio from '@tailwindcss/aspect-ratio'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
        sans: ['Gotham', ...defaultTheme.fontFamily.sans],
        serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {

        pumpkin: {
          DEFAULT: '#ff7109',
          '50': '#fff7ed',
          '100': '#ffeed4',
          '200': '#ffd8a8',
          '300': '#ffbc70',
          '400': '#ff9437',
          '500': '#ff7109',
          '600': '#f05906',
          '700': '#c74207',
          '800': '#9e340e',
          '900': '#7f2d0f',
          '950': '#451405',
        },
        electricViolet: {
          DEFAULT: '#9204d2',
          '50': '#fcf3ff',
          '100': '#f7e3ff',
          '200': '#f0ccff',
          '300': '#e5a4ff',
          '400': '#d56aff',
          '500': '#c632ff',
          '600': '#b70bff',
          '700': '#a300f3',
          '800': '#9204d2', // default
          '900': '#71059e',
          '950': '#4e0078',
        },
        mindaro: {
          DEFAULT: '#D4F779',
          '50': '#FFFFFF',
          '100': '#FFFFFF',
          '200': '#F9FEED',
          '300': '#EDFCC6',
          '400': '#E0F9A0',
          '500': '#D4F779',
          '600': '#C3F444',
          '700': '#B2F10F',
          '800': '#8BBC0B',
          '900': '#648808',
          '950': '#516D07'
        },
      }
    }
  },
  plugins: [
    aspectRatio
  ]
}
