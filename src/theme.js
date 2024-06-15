import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { blueGrey, grey } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '60px',
    boardBarHeight: '65px'
  },

  colorSchemes: {
    light: {
      // nếu khách hàng mỗi thay đổi 1 số điều kiện, ta chỉ cần custom ngay vào đây
      // spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: { }
  },
  components: {
    // update scroll bar trong MuiCssBaseline
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // apply cho toàn bộ scroll bar trong trang web
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          // apply màu của scroll bar
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          },
          // apply màu của scroll bar khi hover
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#636e72',
            borderRadius: '8px'
          }
        }
      }
    },
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
        root: () => ({
          // color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
          fontWeight: 'bold',
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: () => ({
          // color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
          fontSize: '0.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
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