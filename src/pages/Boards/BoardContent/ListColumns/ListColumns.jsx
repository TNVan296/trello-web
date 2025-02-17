import { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns, createNewColumn, createNewCard, deleteColumnDetails }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title')
      return
    }

    // Tạo dữ liệu Column để gọi API
    const newColumnData = {
      title: newColumnTitle
    }

    /**
     * Gọi lên props function createNewColumn nằm ở component cha cao nhất (boards/_id.jsx)
     * Lưu ý: Đối với các dự án có cấp component quá sâu thì việc nên dùng Redux khá tiện ích hoặc các zustand =))
     * Với việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều.
     */
    createNewColumn(newColumnData)

    // Đóng trạng thái thêm Column mới và Clear Value đã nhập
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  /**
   * SortableContext yêu cầu items phải là 1 array dạng ['id-1', 'id-2'] chứ không phải là 1 array dạng object như [{id: 'id-1'}, {id: 'id-2'}]
   * Nếu là array dạng object thì vẫn kéo được nhưng ko có animation
   * Cách hiệu quả là nên map dữ liệu ra để bỏ vào
  */
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>
        {/* map dữ liệu trong columns, với mỗi column sẽ trả về 1 component
        Column chứa props gồm key là _id (trong mock-data) và column chứa column (trong mock-data)  */}
        {columns?.map(column =>
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetails={deleteColumnDetails}
          />
        )}

        {/* Button Add new Column */}
        {!openNewColumnForm ?
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '300px',
              maxWidth: '300px',
              mx: 2,
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#485460' : '#dfe6e9'),
              borderRadius: '12px',
              height: 'fit-content'
            }}>
            <Button
              startIcon={<AddIcon />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1,
                borderRadius: '12px',
                color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                '&:hover': {
                  bgcolor: '#808e9b',
                  color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460'),
                  borderRadius: '12px'
                }
              }}
            >
              Add another list
            </Button>
          </Box>
          :
          <Box
            sx={{
              minWidth: '300px',
              maxWidth: '300px',
              mx: 2,
              p: 1,
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#485460' : '#dfe6e9'),
              borderRadius: '12px',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
            <TextField
              label="Enter list name..."
              type="text"
              size='small'
              autoFocus
              variant='outlined'
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
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
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <Button
                onClick={addNewColumn}
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
                onClick={toggleOpenNewColumnForm}
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
    </SortableContext>
  )
}

export default ListColumns
