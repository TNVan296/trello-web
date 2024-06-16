import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
import BackgroundImg from '~/assets/milin-john-sea-unsplash.jpg'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '50px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{
      backgroundImage: `url(${BackgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: (theme) => (theme.trello.boardContentHeight),
      display: 'flex'
    }}
    >
      {/* Đây là box của 1 column */}
      <Box sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: '#f1f2f4',
        color: '#44546f',
        // margin-left
        margin: '10px',
        borderRadius: 3
      }}>
        <Box sx={{
          height: COLUMN_HEADER_HEIGHT,
          p: 3.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant='h7'sx={{
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
                color: '#485460',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#d2dae2',
                  color: '#485460',
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
        <Box sx={{}}>
          List Card
        </Box>
        <Box sx={{
          height: COLUMN_FOOTER_HEIGHT,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          Footer
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent