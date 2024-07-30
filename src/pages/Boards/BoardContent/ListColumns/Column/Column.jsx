import { useState } from 'react'
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
import { mapOrder } from '~/utils/sorts'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Column({ column }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  // lúc này khi kéo sẽ nảy ra 1 bug phát sinh
  // chiều dài ở đây ta phải luôn đặt là 100% vì nếu không sẽ sinh ra lỗi lúc kéo Column ngắn qua 1 column dài
  // thì phải kéo ở khu vực giữa của column
  // ta phải lưu ý lúc này kết hợp Box cùng với { ...listeners } chứ ko được để chung với các para khác ở div ngoài để
  // tránh trường hợp kéo vào vùng xanh mà vẫn kéo theo Column
  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    // làm mờ khi ta kéo Column
    opacity: isDragging ? 0.5 : undefined
  }

  return (
    // Column
    // lý do ta làm như thế này vì
    // khi set sự kiện kéo thả cho bên Card sẽ xảy ra 1 bug khiến Column khi kéo bị Flickering (chủ yếu là chiều cao của 1 Column, nếu Column
    // đủ cao thì khi kéo sẽ không xảy ra bug đó)
    // ta chỉ để lại listeners lại trong box của Column để bắt sự kiện
    <div ref={setNodeRef} style= {dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#485460' : '#dfe6e9'),
          color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
          m: '0 8px',
          borderRadius: '12px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(4)})`
        }}
      >

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
            {column?.title}
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
        <ListCards cards= { orderedCards } />

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
    </div>
  )
}

export default Column
