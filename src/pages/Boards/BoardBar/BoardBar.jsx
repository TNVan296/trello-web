import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'
import GroupIcon from '@mui/icons-material/Group'
import LeaderBoardIcon from '@mui/icons-material/Leaderboard'
import FilterListIcon from '@mui/icons-material/FilterList'
import BoltIcon from '@mui/icons-material/Bolt'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'

function BoardBar(props) {
  const { board } = props
  // const board = props.board

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box px={1.5} sx={{
      bgcolor: '#d2dae2',
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1.5,
      overflowX: 'auto',
      borderTop: '2px solid #7f8c8d'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip
          sx={{
            bgcolor: 'transparent',
            color: '#34495e',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: 4,
            padding: '5px',
            '&:hover': {
              bgcolor: '#808e9b'
            }
          }}
          label={board?.title}
          clickable />
        <Tooltip title='Click to star or unstar this board'>
          <Button
            sx={{
              color: '#485460',
              '&:hover': {
                bgcolor: '#808e9b',
                color: '#485460',
                borderRadius: 1
              }
            }}>
            <StarOutlineRoundedIcon />
          </Button>
        </Tooltip>
        <Tooltip title='Change visibility' disableHoverListener='true'>
          <Chip
            onClick={handleClick}
            icon={<GroupIcon />}
            label={board?.type}
            sx={{
              bgcolor: 'transparent',
              color: '#485460',
              fontWeight: 'bold',
              borderRadius: 1,
              '&:hover': {
                bgcolor: '#808e9b',
                color: '#485460'
              }
            }}
          />
          <Menu
            id="menu-droplist"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'button-menu-droplist'
            }}>
            <MenuItem onClick={handleClose}>Private</MenuItem>
            <MenuItem onClick={handleClose}>Workspace</MenuItem>
            <MenuItem onClick={handleClose}>Organization</MenuItem>
            <MenuItem onClick={handleClose}>Public</MenuItem>
          </Menu>
        </Tooltip>
        <Tooltip title='Board'>
          <Button
            sx={{
              color: '#d2dae2',
              bgcolor: '#808e9b',
              '&:hover': {
                bgcolor: '#808e9b',
                color: '#d2dae2',
                borderRadius: 1
              }
            }}>
            <LeaderBoardIcon /> Board
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
                color: '#485460',
                '&:hover': {
                  bgcolor: '#808e9b',
                  color: '#485460',
                  borderRadius: 1
                }
              }}>
              <BoltIcon fontSize='small' />
            </Button>
          </Tooltip>
          <Tooltip title='Filter cards'>
            <Button
              sx={{
                color: '#485460',
                '&:hover': {
                  bgcolor: '#808e9b',
                  color: '#485460',
                  borderRadius: 1
                }
              }}>
              <FilterListIcon fontSize='small' /> Filters
            </Button>
          </Tooltip>
        </Box>
        |
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <AvatarGroup
            max={3}
            total={5}
            sx={{
              '& .MuiAvatar-root': {
                width: 30,
                height: 30,
                fontSize: 16,
                border: 'none',
                color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                cursor: 'pointer',
                '&:first-of-type': { bgcolor: 'a4b0de' }
              }
            }}
          >
            <Tooltip title="ThuongNVa">
              <Avatar alt="ThuongNVa" src="~/assets/personal_picture.jpg" />
            </Tooltip>
            <Tooltip title="Firefly">
              <Avatar alt="Firefly" src="/static/images/avatar/2.jpg" />
            </Tooltip>
            <Tooltip title="SAM">
              <Avatar alt="SAM" src="/static/images/avatar/3.jpg" />
            </Tooltip>
            <Tooltip title="Robin">
              <Avatar alt="Robin" src="/static/images/avatar/4.jpg" />
            </Tooltip>
            <Tooltip title="Sunday">
              <Avatar alt="Sunday" src="/static/images/avatar/5.jpg" />
            </Tooltip>
          </AvatarGroup>
          <Tooltip title='Share'>
            <Button
              sx={{
                color: '#d2dae2',
                bgcolor: '#808e9b',
                '&:hover': {
                  bgcolor: '#808e9b',
                  color: '#d2dae2',
                  borderRadius: 1
                }
              }}>
              <PersonAddAltOutlinedIcon /> Share
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardBar