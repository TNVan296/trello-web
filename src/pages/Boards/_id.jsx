import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
// import { mockData } from '~/apis/mock-data.js'
import { fetchBoardDetailsAPI } from '~/apis/index'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // tạm thời lấy cứng board id (sau này sẽ sửa đổi)
    const boardId = '677f7d9256d9cc71fff87d5b'
    // Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent board={board} />
    </Container>
  )
}

export default Board