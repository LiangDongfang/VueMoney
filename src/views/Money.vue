<template>
  <div>
    {{recodeList}}
    <Layout classPerfix="layout">
      <NumberPad :value.sync="recode.amount" @submit="saveRecode" />
      <Types :value.sync="recode.type" />
      <Notes @update:value="onUpdateNotes" />
      <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import recodeListModel from "@/models/recordListModel.ts";
import tagListModel from "@/models/tagListModel.ts";

type RecodeItem = {
  tags: string[];
  type: string;
  notes: string;
  amount: number;
  createAt?: Date; //？表示可以不存在
};

const recodeList = recodeListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: { NumberPad, Tags, Notes, Types }
})
export default class Money extends Vue {
  tags = tagList;
  recodeList: RecodeItem[] = recodeList;
  recode: RecodeItem = {
    tags: [],
    type: "-",
    notes: "",
    amount: 0
  };

  onUpdateTags(value: string[]) {
    this.recode.tags = value;
  }
  onUpdateNotes(value: string) {
    this.recode.notes = value;
  }
  saveRecode() {
    const recodeCopy: RecodeItem = recodeListModel.clone(this.recode);
    recodeCopy.createAt = new Date();
    this.recodeList.push(recodeCopy);
  }
  @Watch("recodeList")
  onReacdeListchange() {
    recodeListModel.save(this.recodeList);
  }
}
</script>