import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { deepOrange, blueGrey, orange, lightBlue } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '60px',
    boardBarHeight: '65px'
  },

  colorSchemes: {
    light: {
      palette: {
        primary: lightBlue,
        secondary: deepOrange
      }
      // nếu khách hàng mỗi thay đổi 1 số điều kiện, ta chỉ cần custom ngay vào đây
      // spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary: blueGrey,
        secondary: orange
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main
          }
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            }
          },
          '& fieldset': {
            borderWidth: '1px !important'
          }
        })
      }
    }
  }
})

export default theme