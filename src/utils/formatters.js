export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
  // trả về chuỗi sau khi đã viết hoa chữ cái đầu, nếu ko có ${val.slice(1)} thì chỉ trả về kí tự viết hoa đầu tiên
}