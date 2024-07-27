import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profiles from './Menus/Profiles'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SearchIcon from '@mui/icons-material/Search'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import InputAdornment from '@mui/material/InputAdornment'

function AppBar() {
  return (
    <Box px={1.5} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1.5,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#485460' : '#d2dae2')
    }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}>
        <AppsIcon
          sx={{
            color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
            '&:hover': {
              bgcolor: '#808e9b',
              borderRadius: 1.5
            }
          }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': {
              bgcolor: '#808e9b',
              borderRadius: 1.5
            }
          }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
            }} />
          <Typography
            variant='span'
            sx={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
            }}>
              Trello
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />

          <Button
            sx={{
              fontWeight: 'bold',
              bgcolor: '#808e9b',
              color: '#d2dae2',
              '&:hover': {
                bgcolor: '#808e9b',
                color: '#d2dae2'
              }
            }}>
                Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <ModeSelect />
        <TextField
          id="outlined-search"
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
          type="text"
          size='small'
          sx={{
            minWidth: '120px',
            maxWidth: '200px',
            borderRadius: 1.5,
            '& label': {
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
            },
            '& label.Mui-focused': {
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
            },
            '& input': {
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
              },
              '&:hover fieldset': {
                borderColor: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
              },
              '&.Mui-focused fieldset': {
                borderColor: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
              }
            }
          }}/>

        <Tooltip title='Notifications'>
          <Button
            sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
              '&:hover': {
                bgcolor: '#808e9b',
                color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                borderRadius: 1.5
              }
            }}>
            <NotificationsNoneIcon />
          </Button>
        </Tooltip>

        <Tooltip title='Help'>
          <Button
            sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
              '&:hover': {
                color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                bgcolor: '#808e9b',
                borderRadius: 1.5
              }
            }}>
            <HelpOutlineIcon />
          </Button>
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar