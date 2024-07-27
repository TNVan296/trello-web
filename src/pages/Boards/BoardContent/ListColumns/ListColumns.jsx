import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import AddIcon from '@mui/icons-material/Add'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
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
        {columns?.map(column => <Column key={column._id} column={column} />)}

        {/* Button Add new Column */}
        <Box sx={{
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
      </Box>
    </SortableContext>
  )
}

export default ListColumns
