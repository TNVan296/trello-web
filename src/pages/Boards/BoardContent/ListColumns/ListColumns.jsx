import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import AddIcon from '@mui/icons-material/Add'

function ListColumns() {

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden'
    }}>
      <Column />
      <Column />
      <Box sx={{
        minWidth: '300px',
        maxWidth: '300px',
        mx: 2,
        bgcolor: '#ffffff3d',
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
              bgcolor: '#091E4224',
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
