import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/idCreator'
import router from '@/router'

Vue.use(Vuex) //将store 传递给Vue.prototype.$store

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined
  } as rootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem('recordList') || "[]"
      )
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    createRecords(state, record: RecordItem) {
      const recodeCopy = clone(record);
      recodeCopy.createAt = new Date().toISOString();
      state.recordList.push(recodeCopy);
      store.commit('saveRecords')
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣')
        store.commit('createTag', '食')
        store.commit('createTag', '住')
        store.commit('createTag', '行')
      }
    },
    createTag(state, name: string) {
      state.createTagError = null
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicate')
        return;
      }
      const id = createId().toString()
      state.tagList.push({ id: id, name: name })
      store.commit('saveTags')
    },
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags')
        router.back();
      } else {
        window.alert("删除失败");
      }

    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0]
          tag.name = name
          tag.id = name
          store.commit('saveTags')
        }
      } else {
        return 'not found'
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    }
  }
})

export default store

