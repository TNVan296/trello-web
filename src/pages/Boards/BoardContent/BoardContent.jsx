import Box from '@mui/material/Box'
import BackgroundImg from '~/assets/milin-john-sea-unsplash.jpg'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

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
      <ListColumns columns={ orderedColumns }/>
    </Box>
  )
}

export default BoardContent