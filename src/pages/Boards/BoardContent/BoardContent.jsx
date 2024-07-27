import Box from '@mui/material/Box'
import BackgroundImg from '~/assets/milin-john-sea-unsplash.jpg'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import { DndContext, PointerSensor, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState, useEffect } from 'react'

function BoardContent({ board }) {
  // lý do comment lại dòng này vì còn bug =))
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // yếu cầu chuột phải di chuyển chuột hơn 10 pixel thì sẽ thực hiện event, fix lỗi click cũng bắt event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // yêu cầu nhấn giữ màn hình 250ms và dung sai của cảm ứng (dễ hiểu là di chuyển/chêch lệch 5px) là sẽ kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })

  // const mySensors = useSensors(pointerSensor)
  // ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm tốt trên cả 2 nền tảng mobile và pc (laptop), để ko bị bug =)))
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // mỗi khi dữ liệu board thay đổi sẽ gọi lại useEffect
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])

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
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
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
    </DndContext>
  )
}

export default BoardContent