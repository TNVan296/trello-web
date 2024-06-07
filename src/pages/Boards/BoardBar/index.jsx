import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'
import GroupIcon from '@mui/icons-material/Group'
import LeaderBoardIcon from '@mui/icons-material/Leaderboard'
import FilterListIcon from '@mui/icons-material/FilterList'
import BoltIcon from '@mui/icons-material/Bolt'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'

function BoardBar() {
  return (
    <Box px={1.5} sx={{
      backgroundColor: 'primary.light',
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1.5,
      overflowX: 'auto',
      borderTop: '1px solid #00bfa5'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Chip
          sx={{
            bgcolor: 'primary.light',
            color: 'secondary.900',
            border: 'none',
            borderRadius: 4,
            padding: '5px',
            '&:hover': {
              bgcolor: 'secondary.A400'
            }
          }}
          label='ThuongNVa Board'
          clickable />
        <Tooltip title='Click to star or unstar this board'>
          <Button
            sx={{
              color: 'secondary.900',
              '&:hover': {
                bgcolor: 'secondary.A400',
                color: 'secondary.900'
              }
            }}>
            <StarOutlineRoundedIcon
              sx={{
                color: 'secondary.900',
                '&:hover': {
                  bgcolor: 'secondary.A400',
                  borderRadius: 1.5
                }
              }}/>
          </Button>
        </Tooltip>
        <Tooltip title='Change visibility'>
          <Button
            sx={{
              color: 'secondary.900',
              '&:hover': {
                bgcolor: 'secondary.A400',
                color: 'secondary.900'
              }
            }}>
            <GroupIcon
              sx={{
                color: 'secondary.900',
                '&:hover': {
                  bgcolor: 'secondary.A400',
                  borderRadius: 1.5
                }
              }}/>
          </Button>
        </Tooltip>
        <Tooltip title='Board'>
          <Button
            sx={{
              color: 'secondary.100',
              bgcolor: 'secondary.500',
              '&:hover': {
                bgcolor: 'secondary.600',
                color: 'secondary.100'
              }
            }}>
            <LeaderBoardIcon
              sx={{
                color: 'secondary.100',
                fontSize: 'medium',
                '&:hover': {
                  bgcolor: 'secondary.600'
                }
              }}/> Board
          </Button>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}>
          <Tooltip title='Automation'>
            <Button
              sx={{
                color: 'secondary.900',
                '&:hover': {
                  bgcolor: 'secondary.A400',
                  borderRadius: 1.5,
                  color: 'secondary.900'
                }
              }}>
              <BoltIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Filter cards'>
            <Button
              sx={{
                color: 'secondary.900',
                '&:hover': {
                  bgcolor: 'secondary.A400',
                  borderRadius: 1.5,
                  color: 'secondary.900'
                }
              }}>
              <FilterListIcon /> Filters
            </Button>
          </Tooltip>
        </Box>
        |
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}>
          <Tooltip
            title='Group Members'
            sx={{
              '& .MuiAvatar-root': {
                width: 30,
                height: 30,
                fontSize: 16
              }
            }}>
            <AvatarGroup max={3} total={5}>
              <Avatar alt="ThuongNVa" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Firefly" src="/static/images/avatar/2.jpg" />
              <Avatar alt="SAM" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Robin" src="/static/images/avatar/4.jpg" />
              <Avatar alt="Sunday" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
          </Tooltip>
          <Tooltip title='Share'>
            <Button
              sx={{
                color: 'secondary.100',
                bgcolor: 'secondary.500',
                '&:hover': {
                  bgcolor: 'secondary.600',
                  color: 'secondary.100'
                }
              }}>
              <PersonAddAltOutlinedIcon
                sx={{
                  color: 'secondary.100',
                  fontSize: 'medium',
                  '&:hover': {
                    bgcolor: 'secondary.600'
                  }
                }}/> Share
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardBar