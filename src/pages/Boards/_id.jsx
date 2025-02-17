import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'


import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import {
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumnDetailsAPI
} from '~/apis/index'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'
import { Typography } from '@mui/material'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // tạm thời lấy cứng board id (sau này sẽ sửa đổi)
    const boardId = '677f7d9256d9cc71fff87d5b'
    // Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      // Sắp xếp thứ tự các column luôn tại đây trước khi đưa dữ liệu xuống bên dưới các component con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
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
      // Nếu Column rỗng: lúc này đang chứa 1 placeholder card
      // Ta sẽ bỏ luôn placeholder card này luôn và thêm một card vừa tạo vào cuối mảng
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        // Nếu Column đã có data thì push vào cuối mảng
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  /**
   * Func có nhiệm vụ gọi API và xử lý khi kéo thả Column xong xuôi
   * Chỉ cần gọi API để cập nhật mảng columnOrderIds của board chứa nó (thay đổi vị trí trong board)
   */
  const moveColumns = (dndOrderedColumns) => {
    // Update lại chuẩn dữ liệu state board
    const dndOrderedColumnsId = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsId
    setBoard(newBoard)

    // Gọi API
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsId })
  }

  /**
   * Func có nhiệm vụ gọi API và xử lý khi kéo thả Column xong xuôi
   * Chỉ cần gọi API để cập nhật mảng columnOrderIds của board chứa nó (thay đổi vị trí trong board)
   */
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Update lại chuẩn dữ liệu state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // Gọi API
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * Khi di chuyển card sang column khác:
   * B1: Cập nhật mảng cardOrderIds của column ban đầu chứa nó (xóa cái _id của card ra khỏi mảng)
   * B2: Cập nhật mảng cardOrderIds của column tiếp theo (thêm cái _id của card vào mảng)
   * B3: Cập nhật trường columnId mới của cái card ta đã kéo
   * => làm một API support riêng
   */
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    // Update lại chuẩn dữ liệu state board
    const dndOrderedColumnsId = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsId
    setBoard(newBoard)

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    // Gọi API
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId).cardOrderIds
    })
  }

  // xử lý xóa 1 Column và Cards bên trong nó
  const deleteColumnDetails = (columnId) => {
    // Update dữ liệu state board

    // Gọi API xử lý phía BE
    deleteColumnDetailsAPI(columnId).then(res => {
      console.log('res: ', res)
    })

  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh',
        bgcolor: 'transparent'
      }}>
        <CircularProgress />
        <Typography sx={{
          fontWeight: 'bold',
          color: (theme) => (theme.palette.mode === 'dark' ? '#d2dae2' : '#485460')
        }}>
          Loading Board...
        </Typography>
      </Box>
    )
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
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}

export default Board