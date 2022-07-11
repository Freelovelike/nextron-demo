export const getQueryString = () => {
  // 定义返回结果
  const result: { [key: string]: any } = {}
  // 获取url上的参数（使用decodeURIComponent对url参数进行解码）
  const search = decodeURIComponent(window.location.search)
  const tempArr = search !== "" ? search.substr(1).split("&") : []
  for (const item of tempArr) {
    if (item) {
      const itemArr = item.split("=")
      result[itemArr[0]] = itemArr[1]
    }
  }
  return result
}
