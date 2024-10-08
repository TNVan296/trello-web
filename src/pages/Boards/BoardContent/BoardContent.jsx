import Box from '@mui/material/Box'
import BackgroundImg from '~/assets/milin-john-sea-unsplash.jpg'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import { DndContext, TouchSensor, MouseSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, getFirstCollision } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState, useEffect, useCallback, useRef } from 'react'
import { cloneDeep } from 'lodash'

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
  const [oldColumn, setOldColumn] = useState([null])

  // điểm va chạm cuối cùng trước đó
  const lastOverId = useRef(null)

  // mỗi khi dữ liệu board thay đổi sẽ gọi lại useEffect
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])

  // tìm Column bằng CardId
  const findColumnByCardId = (cardId) => {
    // nhận vào tham số cardId và trả về
    // trong orderedColumns tìm mỗi column, kiểm tra khi map trong mỗi card của column xem có chứa card._id
    // và tìm xem liệu có bao gồm cardId ko ?
    // đoạn này ta cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleOvr chúng ta
    // sẽ làm dữ liệu cho cards hoàn chỉnh trước r mới tạo ra cardOrderIds sau.
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  // function xử lý logic và cập nhật lại state khi thao tác kéo thả trong cùng 1 column và giữa 2 column khác nhau
  const moveCardBetweenDifferentColumn = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // tìm vị trí (index) của cái overCard trong Column đích (nơi mà activeCard sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      // logic tính toán 'cardIndex mới', khâu này từ chối hiểu luôn (không biết nên hiểu kiểu gì)
      let newCardIndex
      // nếu ta kéo thả Card sang column khác nhau thì sẽ bắt vào logic xử lý này
      // xác định liệu thẻ đang kéo (active) có được thả phía dưới thẻ khác trong cột đích (over) hay không.
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      // Nếu thẻ được thả phía dưới một thẻ khác, modifier sẽ là 1, ngược lại, sẽ là 0, giúp xác định vị trí chính xác của thẻ sau khi thả.
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.length + 1

      // Clone mảng orderedColumn cũ ra 1 mảng mới để xử lý data rồi mới return về cập nhật lại orderedColumn mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // Column mà ta đang thao tác kéo thả
      if (nextActiveColumn) {
        // xóa card mà ta đang thao tác kéo ở Column Active (column ta đang thao tác kéo) (có thể hiểu là kéo card ra ở Column
        // này sang Column khác thì phải xóa card ở Column đó đi)
        // lấy ra 1 mảng mới chứa tất cả card không có _id là activeDraggingCardId
        // trong nextActiveColumns (tức là cho ra 1 mảng mới không chứa card ta đang kéo)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu, cập nhật các card còn lại trong column
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // Column mà ta thả tới
      if (nextOverColumn) {
        // kiểm tra xem Card mà ta đang thao tác kéo đã có ở overColumn chưa, nếu có thì lọc nó ra ngay
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // ở đây hãy clg ra avtiveDraggingCardData để nhận ra vấn đề ở đây
        // console.log('activeDraggingCardData: ', activeDraggingCardData)
        // đối với trường hợp onDragEnd thì khi kéo thả Card xong vẫn sẽ chưa cập nhật dữ liệu của columnId
        // ta phải cập nhật lại chuẩn dữ liệu columnId trong Card sau khi kéo Card giữa 2 Column khác nhau
        // lấy tất cả những dữ liệu từ activeDragItemData và ghi đè lại columnId
        // thực hiện việc thêm vào card mà ta đang thao tác vòa trong overColumn theo vị trí Index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex, 0, { ...activeDraggingCardData, columnId: nextOverColumn._id }
        )

        // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu, cập nhật các card còn lại trong column
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        // console.log('rebuild_activeDraggingCardData: ', rebuild_activeDraggingCardData)

      }

      return nextColumns
    })
  }

  // Trigger khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    // đặt trạng thái active của id
    setActiveDragItemId(event?.active?.id)
    // lấy ra kiểu dữ liệu mà ta đã kéo là gì. Nếu columnId tồn tại khi active sự kiện thì nghĩa là ta đang kéo card, nếu ko thì ngược lại
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    // lấy ra data mà ta kéo
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì ta sẽ thực hiện hành động set giá trị oldColumn (tức là ta set ra state riêng)
    if (event?.active?.data?.current?.columnId) {
      setOldColumn(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger trong qúa trình kéo (drag) 1 phần tử
  const handleDragOver = (event) => {
    // Không làm gì nếu đang kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // nếu kéo card sẽ xử lý thêm để có thể kéo card qua lại giữa các Column
    const { active, over } = event

    // kiểm tra nếu ko tồn tại active và over (nếu kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!active || !over) return

    //  activeDraggingCard là card ta đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard tức là card đang tương tác trên hoặc dưới so với card được kéo ở trên
    const { id: overCardId } = over

    // tìm 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // console.log('activeColumn: ', activeColumn)
    // console.log('overColumn: ', overColumn)

    // nếu không tồn tại 1 trong 2 thằng bên dưới thì sẽ return luôn không làm gì cả
    if (!activeColumn || !overColumn) return

    // xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, nếu kéo card trong chính column đó của nó thì sẽ không xử lý gì cả
    // vì đây là nơi xử lý lúc ta đang kéo vào (handleDragOver), còn nếu muốn xử lý lúc kéo xong thì nó sẽ nằm ở phần khác (handleDragOver)
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumn(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // Trigger khi kết thúc hành động kéo 1 phần tử
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event

    // kiểm tra nếu ko tồn tại active và over (nếu kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!active || !over) return

    // xử lý kéo thả Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // nếu vị trí sau khi kéo thả khác với vị trí ban đầu thì
      if (active.id !== over.id) {
        // lấy vị trí cũ (vị trí mà khi ta bắt đầu kéo (active))
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id) // tìm index khi map dữ liệu trong orderedColumns bằng _id
        // lấy vị trí mới (vị trí mà khi ta kết thúc kéo (over))
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id) // tìm index khi map dữ liệu trong orderedColumns bằng _id

        // dùng arrayMove của dnd-kit để sắp xếp lại mảng Columns khi kéo thả
        // arrayMove dùng để di chuyển 1 item trong array đến 1 vị trí khác, trả về 1 aray mới chứa item được chuyển sang 1 vị trí khác
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // khi kéo thả xong phải gọi API để cập nhật lại đúng dữ liệu columnOrderIds vào trong Database
        // sau này sẽ dùng các dòng này để xử lý API
        // const dndOrderedColumnsId = dndOrderedColumns.map(c => c._id)
        // console.log('dndOrderColumns: ', dndOrderedColumns)
        // console.log('dndOrderColumnsId: ', dndOrderedColumnsId)

        // cập nhật lại state của columns ban đầu sau khi kéo thả
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // xử lý kéo thả Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //  activeDraggingCard là card ta đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard tức là card đang tương tác trên hoặc dưới so với card được kéo ở trên
      const { id: overCardId } = over

      // tìm 2 column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      // console.log('oldColumn: ', oldColumn)
      // console.log('overColumn: ', overColumn)

      // nếu không tồn tại 1 trong 2 thằng bên dưới thì sẽ return luôn không làm gì cả
      if (!activeColumn || !overColumn) return

      // kéo card qua 2 Column khác nhau
      // phải dùng tới oldColumn trong handleDragEnd vì sau khi đi qua
      // handleDragOver thì state của card đã bị cập nhật 1 lần r.

      // nếu id của cột mà ta đang kéo lúc cập nhật start ở handleStart khác với id của cột ta muốn thả thì
      // xảy ra 2 trường hợp
      if (oldColumn._id !== overColumn._id) {
        // hành động kéo thả Card giữa 2 Column khác nhau
        moveCardBetweenDifferentColumn(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // hành động kéo thả Card trong cùng 1 Column
        // hành động này giống với cái nào thì bạn tự đoán nha =)))
        // lấy index cũ (từ thằng oldColumn) (ở khâu handleDragStart đã set state của thằng activeDragItemId)
        const oldCardIndex = oldColumn?.cards?.findIndex(c => c._id === activeDragItemId)
        // lấy index mới (từ thằng overColumn)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        // dùng arrayMove vì khi kéo card trong 1 cùng 1 column rất giống với hành động kéo Column trong Board content
        const dndOrderedCards = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          // Clone state orderedColumn cũ ra 1 mảng mới để xử lý data rồi mới return về cập nhật lại orderedColumn state mới
          const nextColumns = cloneDeep(prevColumns)

          // tìm tới Column mà ta đang muốn thả đến
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // cập nhật lại 2 giá trị mới là card và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          // trả về giá trị ở state mới
          return nextColumns
        })
      }
    }

    // kéo thả xong thì phải cho về null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumn(null)
  }

  // animation khi drop 1 phần tử
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  // ta sẽ custom thuật toán phát hiện va chạm
  // args = Arguments: Các đối số, tham só (ở đây có hiểu như là dữ liệu ở trong thư viện của nó)
  const collistionDetectionStrategy = useCallback((args) => {
    // Nếu ta kéo Column thì trả về thuật toán va chạm ban đầu mà ta dùng (kéo Column với thuật toán này thì ko có gì bất ổn)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // tìm các điểm giao nhau, va chạm (Intersection), trả về 1 array gồm các va chạm tại đây với con trỏ
    const pointerIntersections = pointerWithin(args)
    // nếu pointerIntersections là mảng rỗng sẽ return luôn
    // Nhằm sửa lỗi bị flickering trong thư viện dnd-kit trong TH kéo card có cover lớn thì bị ...
    if (!pointerIntersections?.length) return

    // // thuật toán phát hiện va chạm giữa các Card sẽ trả về 1 array gồm các va chạm tại đây
    // const intersections = pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)
    // // console.log('intersections: ', intersections)

    // tìm overId đầu tiên trong đám pointerIntersections ở trên
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      // nếu overId là column-id thì sẽ tìm tới card gần nhất bên trong khu vực va chạm đó dựa vòa
      // thuật toán phát hiện va chạm closestCenter hoặc closestCorners đều được.
      // lấy ra Column của overId (column mà ta va chạm)
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        // trả về id của Column va chạm đầu tiên
        // console.log('overId before: ', overId)
        // xử lý tìm container gần nhất
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
        // console.log('overId after: ', overId)
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }

    // nếu tồn tại lastOverId.current thì lập tức trả về 1 mảng json obj hoặc mảng rỗng
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
    // cảm biến
      sensors={mySensors}
      // thuật toán phát hiện va chạm (Collision Detection Algoriths)
      // nếu ko có thuật toán thì khi kéo card với cover lớn sẽ không kéo qua được Column khác vì lúc đó
      // nó đang bị conflict giữa Card và Column, ta nên dùng closestCorners thay vì closestCenter
      // cmt lại dòng dưới này vì nếu để sẽ xảy ra 1 bug flickering + sai lệch dữ liệu nha =)))
      // collisionDetection={closestCorners}

      // tự custom thuật toán phát hiện va chạm
      collisionDetection={collistionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
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