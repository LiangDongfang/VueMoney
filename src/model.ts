const localStorageKey = 'recodeList'

const model = {
  clone(data: RecodeItem[] | RecodeItem) {
    return JSON.parse(JSON.stringify(data))
  },
  fetch() {
    return JSON.parse(
      window.localStorage.getItem(localStorageKey) || "[]"
    ) as RecodeItem
  },
  save(data: RecodeItem) {
    window.localStorage.setItem(localStorageKey, JSON.stringify(data))
  }

}

export default model