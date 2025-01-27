import { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
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
import CloseIcon from '@mui/icons-material/Close'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import ListCards from './ListCards/ListCards'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Column({ column, createNewCard }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderedCards = column.cards

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')

  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error('Please enter Card title', { position: 'bottom-right', theme: 'colored'})
      return
    }

    // Tạo dữ liệu Card để gọi API
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    /**
     * Gọi lên props function createNewCard nằm ở component cha cao nhất (boards/_id.jsx)
     * Lưu ý: Đối với các dự án có cấp component quá sâu thì việc nên dùng Redux khá tiện ích hoặc các zustand =))
     * Với việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều.
     */
    createNewCard(newCardData)

    // Đóng trạng thái thêm Card mới và Clear Value đã nhập
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

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
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(3)})`
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
                  color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#808e9b' : '#a5b1c2'),
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
          px: 1
        }}
        >
          {!openNewCardForm ?
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Button
                onClick={toggleOpenNewCardForm}
                startIcon={<AddIcon />}
                data-no-dnd='true'
                sx={{
                  minWidth: '240px',
                  maxWidth: '250px',
                  justifyContent: 'left',
                  color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                  fontWeight: 'bold',
                  '&:hover': {
                    color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#808e9b' : '#a5b1c2'),
                    borderRadius: 1.5
                  }
                }}
              >
                Add a card
              </Button>
              <Button
                title='Create template card'
                data-no-dnd='true'
                sx={{
                  minWidth: '40px',
                  maxWidth: '40px',
                  cursor: 'pointer',
                  color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                  '&:hover': {
                    color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#808e9b' : '#a5b1c2'),
                    borderRadius: 1.5
                  }
                }}
              >
                <PermMediaIcon />
              </Button>
            </Box>
            :
            <Box
              sx={{
                // minWidth: '200px',
                // maxWidth: '200px',
                pl: 1,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#485460' : '#dfe6e9'),
                borderRadius: '12px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
              <TextField
                label="Enter title..."
                type="text"
                size='small'
                autoFocus
                data-no-dnd='true'
                variant='outlined'
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
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
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1.5
                  }
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                <Button
                  onClick={addNewCard}
                  data-no-dnd='true'
                  variant='contained'
                  size='small'
                  sx={{
                    minWidth: '70px',
                    maxWidth: '70px',
                    height: '40px',
                    color: '#d2dae2',
                    bgcolor: '#0984e3',
                    mr: 0.25,
                    '&:hover': {
                      bgcolor: '#0984e3',
                      color: '#d2dae2',
                      borderRadius: 1
                    }
                  }}>
                  Add list
                </Button>
                <Button
                  onClick={toggleOpenNewCardForm}
                  data-no-dnd='true'
                  sx={{
                    minWidth: '40px',
                    maxWidth: '40px',
                    height: '40px',
                    ml: 0.25,
                    color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                    '&:hover': {
                      color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#808e9b' : '#a5b1c2'),
                      borderRadius: 1.5
                    }
                  }}>
                  <CloseIcon
                    fontSize='small'
                    cursor='pointer'
                  />
                </Button>
              </Box>
            </Box>
          }
        </Box>

      </Box>
    </div>
  )
}

export default Column
