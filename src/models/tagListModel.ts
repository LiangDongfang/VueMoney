const localStorageKey = 'tagList'

type TagListModel = {
  data: string[];
  fetch: () => string[];
  create: (name: string) => 'success' | 'duplicated'; // 联合类型
  save: () => void;
}

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]')
    return this.data
  },
  create(name: string) {
    if (this.data.indexOf(name) >= 0) { return 'duplicated' }
    this.data.push(name);
    this.save();
    return 'success';

  },
  save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(this.data))
  }


}

export default tagListModel