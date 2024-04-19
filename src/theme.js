import { createTheme } from '@mui/material/styles'
import { blue, green, red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: green[500]
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    text: {
      secondary: blue[500]
    }
  }
})

export default theme