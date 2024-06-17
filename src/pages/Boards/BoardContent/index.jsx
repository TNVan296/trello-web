import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import AddCardIcon from '@mui/icons-material/AddCard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MoveDownIcon from '@mui/icons-material/MoveDown'
import CloudIcon from '@mui/icons-material/Cloud'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import AddIcon from '@mui/icons-material/Add'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import CommentIcon from '@mui/icons-material/Comment'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import AttachmentIcon from '@mui/icons-material/Attachment'
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
        {/* Column Header (Column Title) */}
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

        {/* Column List Card (Column Cards) */}
        <Box sx={{
          p: '0 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <Card sx={{
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer'
          }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/448438955_122154611408129690_2479098467328202501_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=g2CQfuo1UckQ7kNvgG5KCT2&_nc_ht=scontent.fsgn2-6.fna&oh=00_AYCVFgvOtMwsF5TxqLRGwKXXfXm1ZAiErjoSJ1NM90MKKQ&oe=6675F549"
              title="Test"
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>Firefly / SAM</CardContent>
            <CardActions sx={{
              p: '0 4px 8px 4px'
            }}>
              <Button size='small' startIcon={<CommentIcon />}></Button>
              <Button size='small' startIcon={<AttachmentIcon />}>2</Button>
              <Button size='small' startIcon={<LibraryAddCheckIcon />}>0/4</Button>
            </CardActions>
          </Card>
          <Card sx={{
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>Firefly / SAM</CardContent>
          </Card>
        </Box>

        {/* Column Footer (Add a card) */}
        <Box sx={{
          height: COLUMN_FOOTER_HEIGHT,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Button startIcon={<AddIcon />} sx={{
            color: '#485460',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#d2dae2',
              color: '#485460',
              borderRadius: 1.5
            }
          }}>
            Add a card
          </Button>

          <Tooltip title='Create template card'>
            <PermMediaIcon sx={{
              minWidth: '40px',
              cursor: 'pointer',
              color: '#485460',
              '&:hover': {
                bgcolor: '#d2dae2',
                color: '#485460',
                borderRadius: 1.5
              }
            }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent