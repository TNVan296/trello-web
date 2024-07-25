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
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function TrelloCard({ card }) {
  const shouldShowCardActions = () => {
    return !!card?.description || !!card?.comments?.length || !!card?.attachments?.length
  }
  // // nếu temporaryHideMedia true => return Card không chứa CardMedia và CardActions
  // if (temporaryHideMedia) {
  //   return (
  //     <Card sx={{
  //       bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436': 'white'),
  //       color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
  //       boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
  //       cursor: 'pointer',
  //       overflow: 'unset'
  //     }}>
  //       <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
  //         <Typography>Test trước BE</Typography>
  //       </CardContent>
  //     </Card>
  //   )
  // }
  // // nếu false thì ngược lại
  return (
    <Card sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436': 'white'),
      color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
      borderRadius: 2,
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      overflow: 'unset'
    }}>
      {card?.cover &&
        <CardMedia sx={{ height: 140 }} image={card?.cover} title="Test" />
      }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActions() &&
        <CardActions sx={{
          p: '0 4px 8px 4px'
        }}>
          {!!card?.description &&
            <Button size='small' startIcon={<DescriptionIcon />} sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
              '&:hover': {
                bgcolor: '#808e9b',
                color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d')
              }
            }}></Button>
          }

          {!!card?.comments?.length &&
            <Button size='small' startIcon={<CommentIcon />} sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
              '&:hover': {
                bgcolor: '#808e9b',
                color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d')
              }
            }}>{card?.comments.length}</Button>
          }

          {!!card?.attachments?.length &&
            <Button size='small' startIcon={<AttachmentIcon />} sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d'),
              '&:hover': {
                bgcolor: '#808e9b',
                color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#172b4d')
              }
            }}>
              {card?.attachments.length}
            </Button>
          }
        </CardActions>}
    </Card>
  )
}

export default TrelloCard