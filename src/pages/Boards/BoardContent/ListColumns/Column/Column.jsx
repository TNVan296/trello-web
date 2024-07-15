import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AddCardIcon from '@mui/icons-material/AddCard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MoveDownIcon from '@mui/icons-material/MoveDown'
import CloudIcon from '@mui/icons-material/Cloud'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import AddIcon from '@mui/icons-material/Add'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import ListCards from './ListCards/ListCards'

function Column() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    // Column 1
    <Box sx={{
      minWidth: '300px',
      maxWidth: '300px',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#485460' : 'white'),
      color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
      m: '0 8px',
      borderRadius: '12px',
      height: 'fit-content',
      maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(4)})`
    }}>

      {/* Column Header (Column Title) */}
      <Box sx={{
        height: (theme) => theme.trello.columnHeaderHeight,
        p: 3.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h6'sx={{
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
        >
          Column Title
        </Typography>

        <Tooltip>
          <MoreHorizOutlinedIcon
            id="basic-column-dropdown"
            aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#808e9b',
                color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                borderRadius: 1.5
              }
            }}
          />
        </Tooltip>

        <Menu
          id="basic-menu-column-dropdown"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-column-dropdown'
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <AddCardIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Add card</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopyIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Copy card</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MoveDownIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Move card</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <DeleteIcon fontSize='small'/>
            </ListItemIcon>
            <ListItemText>Delete column</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <CloudIcon fontSize='small'/>
            </ListItemIcon>
            <ListItemText>Archive column</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* Column List Card (Column Cards) */}
      <ListCards />

      {/* Column Footer (Add a card) */}
      <Box sx={{
        height: (theme) => theme.trello.columnFooterHeight,
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button startIcon={<AddIcon />} sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: '#808e9b',
            color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
            borderRadius: 1.5
          }
        }}>
          Add a card
        </Button>

        <Tooltip title='Create template card'>
          <PermMediaIcon sx={{
            minWidth: '40px',
            cursor: 'pointer',
            color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
            '&:hover': {
              bgcolor: '#808e9b',
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
              borderRadius: 1.5
            }
          }}
          />
        </Tooltip>
      </Box>

    </Box>

  )
}

export default Column
