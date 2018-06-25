const { toString } = Object.prototype

export default (obj: any): string => {
  return toString.call(obj).slice(8, -1).toLowerCase()
}
