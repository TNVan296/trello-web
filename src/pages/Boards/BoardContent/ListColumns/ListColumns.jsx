import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import AddIcon from '@mui/icons-material/Add'

function ListColumns({ columns }) {

  return (
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
  )
}

export default ListColumns
