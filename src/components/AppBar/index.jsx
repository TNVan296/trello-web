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
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

function AppBar() {
  return (
    <Box px={1.5} sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AppsIcon sx={{ color: 'primary.50' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.50' }} />
          <Typography variant='span' sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'primary.50' }}>Trello</Typography>
        </Box>

        <Workspaces />
        <Recent />
        <Starred />
        <Templates />

        <Button variant='outlined' sx={{ fontWeight: 'bold', color: 'primary.50', backgroundColor: 'primary.A400' }}>Create</Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <ModeSelect />
        <TextField id="outlined-search" label="Search" type="search" size='small' sx={{ backgroundColor: 'primary.A400' }}/>

        <Tooltip title='Notification'>
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{ cursor: 'pointer' }}/>
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar