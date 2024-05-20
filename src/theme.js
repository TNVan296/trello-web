import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { grey, deepOrange, blueGrey, orange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '60px',
    boardBarHeight: '65px'
  },

  colorSchemes: {
    light: {
      palette: {
        primary: blueGrey,
        secondary: deepOrange
      }
      // nếu khách hàng mỗi thay đổi 1 số điều kiện, ta chỉ cần custom ngay vào đây
      // spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary: grey,
        secondary: orange
      }
    }
  }
})

export default theme