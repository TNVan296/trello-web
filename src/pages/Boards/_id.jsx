import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import Container from '@mui/material/Container'

import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetailsAPI, updateBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis/index'
import { generatePlaceholderCard } from '~/utils/formatters'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // tạm thời lấy cứng board id (sau này sẽ sửa đổi)
    const boardId = '677f7d9256d9cc71fff87d5b'
    // Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      }
      )
      setBoard(board)
    })
  }, [])

  // Func có nhiệm vụ gọi API tạo mới Column và làm mới dữ liệu state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi tạo Colum mới thì nó sẽ chưa có card, cần xử lý vấn đề kéo thả vào 1 Column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cập nhật state board
    // Lưu ý: ở phần này thì ở phía FE hoặc BE đều có thể tự cập nhật state board luôn
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // Func có nhiệm vụ gọi API tạo mới Card và làm mới dữ liệu state board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cập nhật state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  // Func có nhiệm vụ gọi API và xử lý khi kéo thả Column xong xuôi
  const moveColumns = async (dndOrderedColumns) => {
    // Update lại chuẩn dữ liệu state board
    const dndOrderedColumnsId = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsId
    setBoard(newBoard)

    // Gọi API
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsId })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}

export default Board