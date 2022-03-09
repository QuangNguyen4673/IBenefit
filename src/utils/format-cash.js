export function formatCash(str) {
  if (str) return (str + "").replace(/\B(?=(\d{4})+(?!\d))/g, ",")
  else return 0
}
export function unFormatCash(str) {
  if (str) return str.replaceAll(",", "")
  else return 0
}
