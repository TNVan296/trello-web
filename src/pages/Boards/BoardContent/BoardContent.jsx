import Box from '@mui/material/Box'
import BackgroundImg from '~/assets/milin-john-sea-unsplash.jpg'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {

  return (
    <Box sx={{
      backgroundImage: `url(${BackgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: (theme) => (theme.trello.boardContentHeight),
      p: '10px 5px'
    }}
    >
      <ListColumns />
    </Box>
  )
}

export default BoardContent