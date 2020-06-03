<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link
          class="tag"
          v-for="tag in tagList"
          :key="tag.id"
          :to="`/labels/edit/${tag.id}`"
        >
          <span>{{tag.name}}</span>
          <Icon iconId="right" />
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag" @click="createTag">新建标签</Button>
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import { Component } from "vue-property-decorator";
import {mixins} from "vue-class-component"
import {TagHelper} from "@/mixins/TagHelper.ts"
import Button from "@/components/Button.vue"

@Component({
  components:{Button},
  computed: {
    tagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class Labels extends mixins(TagHelper) {
  created() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: #ffffff;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #e6e6e6;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>