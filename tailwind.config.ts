import { _aspectRatio } from '#tailwind-config/theme'
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
      }
    }
  },
  plugins: [
    aspectRatio
  ]
}
