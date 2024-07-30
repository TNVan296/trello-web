import Box from '@mui/material/Box'
import BackgroundImg from '~/assets/milin-john-sea-unsplash.jpg'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import { DndContext, TouchSensor, MouseSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState, useEffect } from 'react'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // lý do comment lại dòng này vì còn bug =))
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // yếu cầu chuột phải di chuyển chuột hơn 10 pixel thì sẽ thực hiện event, fix lỗi click cũng bắt event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // yêu cầu nhấn giữ màn hình 250ms và dung sai của cảm ứng (dễ hiểu là di chuyển/chêch lệch 5px) là sẽ kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // const mySensors = useSensors(pointerSensor)
  // ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm tốt trên cả 2 nền tảng mobile và pc (laptop), để ko bị bug =)))
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // cùng 1 thời điểm chỉ có 1 column (hoặc card) được kéo đi
  const [activeDragItemId, setActiveDragItemId] = useState([null])
  const [activeDragItemType, setActiveDragItemType] = useState([null])
  const [activeDragItemData, setActiveDragItemData] = useState([null])

  // mỗi khi dữ liệu board thay đổi sẽ gọi lại useEffect
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])

  // Trigger khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    console.log('handleDragStart: ', event)
    // đặt trạng thái active của id
    setActiveDragItemId(event?.active?.id)
    // lấy ra kiểu dữ liệu mà ta đã kéo là gì. Nếu columnId tồn tại khi active sự kiện thì nghĩa là ta đang kéo card, nếu ko thì ngược lại
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    // lấy ra data mà ta kéo
    setActiveDragItemData(event?.active?.data?.current)
  }

  // Trigger khi kết thúc hành động kéo 1 phần tử
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
    const { active, over } = event

    // kiểm tra nếu ko tồn tại over (nếu kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return

    // nếu vị trí sau khi kéo thả khác với vị trí ban đầu thì
    if (active.id !== over.id) {
      // lấy vị trí cũ (vị trí mà khi ta bắt đầu kéo (active))
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id) // tìm index khi map dữ liệu trong orderedColumns bằng _id
      // lấy vị trí mới (vị trí mà khi ta kết thúc kéo (over))
      const newIndex = orderedColumns.findIndex(c => c._id === over.id) // tìm index khi map dữ liệu trong orderedColumns bằng _id

      // dùng arrayMove của dnd-kit để sắp xếp lại mảng Columns khi kéo thả
      // arrayMove dùng để di chuyển 1 item trong array đến 1 vị trí khác, trả về 1 aray mới chứa item được chuyển sang 1 vị trí khác
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // khi kéo thả xong phải gọi API để cập nhật lại đúng dữ liệu columnOrderIds vào trong Database
      // sau này sẽ dùng các dòng này để xử lý API
      // const dndOrderedColumnsId = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderColumns: ', dndOrderedColumns)
      // console.log('dndOrderColumnsId: ', dndOrderedColumnsId)

      // cập nhật lại state của columns ban đầu sau khi kéo thả
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  // animation khi drop 1 phần tử
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={mySensors}>
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
        <DragOverlay dropAnimation={ customDropAnimation }>
          {/* nếu ta ko kéo hay làm gì cả thì nó null (chả có gì xảy ra) */}
          {!activeDragItemType && null}
          {/* nếu activeDragItemType = Column thì sẽ để lại 1 Column chứa data trong column đó là activeDragItemData với opacity = 0.5
          tức là khi ta kéo Colum thì nó sẽ giữ chỗ Column đó nhưng mờ đi) */}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent