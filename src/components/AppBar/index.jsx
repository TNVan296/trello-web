import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import ModeSelect from '~/components/ModeSelect'
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
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

function AppBar() {
  return (
    <Box px={1.5} sx={{
      backgroundColor: 'primary.light',
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1.5,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AppsIcon sx={{ color: 'secondary.900' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': {
              bgcolor: 'secondary.A400',
              borderRadius: 1.5
            }
          }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'secondary.900' }} />
          <Typography variant='span' sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'secondary.900' }}>Trello</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />

          <Button variant='outlined'
            sx={{
              fontWeight: 'bold',
              bgcolor: 'secondary.A400',
              color: 'secondary.900',
              '&:hover': {
                bgcolor: 'secondary.A400',
                color: 'secondary.900'
              } }}>
                Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <ModeSelect />
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          size='small'
          sx={{
            minWidth: '120px',
            borderRadius: 1.5
          }}/>

        <Tooltip title='Notifications'>
          <Button
            sx={{
              color: 'secondary.900',
              '&:hover': {
                bgcolor: 'secondary.A400'
              }
            }}>
            <NotificationsNoneIcon
              sx={{
                cursor: 'pointer',
                color: 'secondary.900',
                '&:hover': {
                  bgcolor: 'secondary.A400',
                  borderRadius: 1.5
                }
              }}/>
          </Button>
        </Tooltip>

        <Tooltip title='Help'>
          <Button
            sx={{
              color: 'secondary.900',
              '&:hover': {
                bgcolor: 'secondary.A400'
              }
            }}>
            <HelpOutlineIcon
              sx={{
                cursor: 'pointer',
                color: 'secondary.900',
                '&:hover': {
                  bgcolor: 'secondary.A400',
                  borderRadius: 1.5
                }
              }}/>
          </Button>
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar