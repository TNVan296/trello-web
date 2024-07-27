/**
 * Sort Columns/Cards
 * Created by trungquandev.com's author on March 28, 2021
 * Updated by trungquandev.com's author on Jun 28, 2023
 * Copy by ThuongNVa on July 25, 2024
 * ---
 * @param {*} originalArray = mảng ban đầu cần sắp xếp
 * @param {*} orderArray = mảng mà muốn sắp xếp thành
 * @param {*} key = key để sắp xếp
 * @return new Ordered Array
 *
 * Đây là thuật toán sắp xếp mảng ban đầu (originalArray) sắp xếp lại mảng dựa trên mảng muốn sắp xếp (orderArray)
 * thành mảng đã sắp xếp (orderedArray)
 */


export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}

// /**
//  * Example:
//  */
// // đây là mảng ban đầu cần sắp xếp
// const originalItems = [
//   { id: 'id-1', name: 'One' },
//   { id: 'id-2', name: 'Two' },
//   { id: 'id-3', name: 'Three' },
//   { id: 'id-4', name: 'Four' },
//   { id: 'id-5', name: 'Five' }
// ]

// // đây là mảng mà ta muốn sắp xếp thành (mẫu)
// const itemOrderIds = ['id-5', 'id-4', 'id-2', 'id-3', 'id-1']
// const key = 'id'

// // áp dụng 3 tham số vào mảng mapOrder để sắp xếp mảng
// const orderedArray = mapOrder(originalItems, itemOrderIds, key)
// console.log('Original:', originalItems)
// console.log('Ordered:', orderedArray)