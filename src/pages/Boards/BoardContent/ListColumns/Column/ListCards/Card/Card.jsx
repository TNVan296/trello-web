// có 2 giải pháp fix:
// 1: đổi tên function
import Card from '@mui/material/Card'
// 2: đổi tên import
// import { Card as MuiCard } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import CommentIcon from '@mui/icons-material/Comment'
import DescriptionIcon from '@mui/icons-material/Description'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function TrelloCard({ temporaryHideMedia }) {
  // nếu temporaryHideMedia true => return Card không chứa CardMedia và CardActions
  if (temporaryHideMedia) {
    return (
      <Card sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436': 'white'),
        color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Test trước BE</Typography>
        </CardContent>
      </Card>
    )
  }
  // nếu false thì ngược lại
  return (
    <Card sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436': 'white'),
      color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/448438955_122154611408129690_2479098467328202501_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=g2CQfuo1UckQ7kNvgG5KCT2&_nc_ht=scontent.fsgn2-6.fna&oh=00_AYCVFgvOtMwsF5TxqLRGwKXXfXm1ZAiErjoSJ1NM90MKKQ&oe=6675F549"
        title="Test"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Test</Typography>
      </CardContent>
      <CardActions sx={{
        p: '0 4px 8px 4px'
      }}>
        <Button size='small' startIcon={<DescriptionIcon />} sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
          '&:hover': {
            bgcolor: '#808e9b',
            color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d')
          }
        }}></Button>
        <Button size='small' startIcon={<CommentIcon />} sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
          '&:hover': {
            bgcolor: '#808e9b',
            color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d')
          }
        }}>2</Button>
        <Button size='small' startIcon={<AttachmentIcon />} sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
          '&:hover': {
            bgcolor: '#808e9b',
            color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d')
          }
        }}>
          2
        </Button>
        <Button size='small' startIcon={<LibraryAddCheckIcon />} sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
          '&:hover': {
            bgcolor: '#808e9b',
            color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d')
          }
        }}>
          0/4
        </Button>
      </CardActions>
    </Card>
  )
}

export default TrelloCard