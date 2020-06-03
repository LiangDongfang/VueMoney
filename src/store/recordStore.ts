import clone from '@/lib/clone.ts'

const localStorageKey = 'recordList'

const recordStore = {
   recordList: [] as RecordItem[],
   fetchRecords() {
      this.recordList = JSON.parse(
         window.localStorage.getItem(localStorageKey) || "[]"
      )
      return this.recordList
   },
   seveRecords() {
      window.localStorage.setItem(localStorageKey, JSON.stringify(this.recordList))
   },
   createRecords(record: RecordItem) {
      const recodeCopy: RecordItem = clone(record);
      recodeCopy.createAt = new Date().toISOString();
      this.recordList && this.recordList.push(recodeCopy);
      recordStore.seveRecords()
   }
}

recordStore.fetchRecords()

export default recordStore