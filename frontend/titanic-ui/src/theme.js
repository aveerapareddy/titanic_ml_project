import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#0d0d0d',
        color: '#ffffff',
      },
    },
  },
  colors: {
    neonBlue: '#00e1ff',
    neonPink: '#ff007f',
  },
})

export default theme
