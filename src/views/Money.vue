<template>
  <div>
    <Layout classPerfix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecode" />
      <Tab :data-source="recordTypeList" :value.sync="record.type" />
      <div class="notes">
        <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
      </div>
      <Tags :value.sync="record.tags" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NumberPad from "@/components/money/NumberPad.vue";
import FormItem from "@/components/money/FormItem.vue";
import Tags from "@/components/money/Tags.vue";
import Tab from "@/components/Tab.vue";
import recordTypeList from "@/constants/recordTypeList.ts";
@Component({
  components: { NumberPad, Tags, FormItem, Tab }
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    type: "-",
    notes: "",
    amount: 0
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  saveRecode() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("亲选择至少一个标签");
    }
    this.$store.commit("createRecords", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
    }
    this.record.notes = "";
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>