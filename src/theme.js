import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { blueGrey, grey } from '@mui/material/colors'

const APP_BAR_HEIGHT = '60px'
const BOARD_BAR_HEIGHT = '65px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '50px'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
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
    MuiTypography: {
      styleOverrides: {
        root: () => ({
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
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