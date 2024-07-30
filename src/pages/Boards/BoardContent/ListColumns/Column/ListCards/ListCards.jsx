import Box from '@mui/material/Box'
import TrelloCard from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 5px',
        m: '0 4px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        // Chiều cao tối đa của list card bằng chiều cao tối đa của columns
        maxHeight: (theme) => `calc(
          ${theme.trello.boardContentHeight} -
          ${theme.spacing(4)} -
          ${theme.trello.columnHeaderHeight} -
          ${theme.trello.columnHeaderHeight}
          )`,
        // custom scroll bar cho List Cards
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#bfc2cf' : '#091E4224'),
          borderRadius: '8px'
        },
        // custom scroll bar cho List Cards khi hover
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#bfc2cf' : '#091E4224'),
          borderRadius: '8px'
        }
      }}>
        {cards?.map(card => <TrelloCard key={card._id} card={card} />)}
      </Box>
    </SortableContext>
  )
}

export default ListCards
