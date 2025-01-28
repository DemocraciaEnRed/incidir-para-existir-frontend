export default defineAppConfig({
  ui: {
    primary: 'electricViolet',
    gray: 'zinc',
    button: {
      base: 'font-inter'
    },
    badge: {
      base: 'font-inter'
    },
    table: {
      wrapper: 'border border-gray-200 dark:border-gray-800 rounded-lg',
      th: {
        padding: 'px-2 py-2.5'
      },
      td: {
        padding: 'px-2 py-1.5',
        color: 'text-white'
      }
    }
  },
})