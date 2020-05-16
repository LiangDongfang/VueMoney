<template>
  <div>
    <Layout classPerfix="layout">
      <NumberPad />
      <Types />
      <Notes />
      <Tags :data-source="tags" />
    </Layout>
  </div>
</template>

<script>
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
export default {
  name: "Money",
  components: { NumberPad, Types, Notes, Tags },
  data() {
    return {
      tags: ["衣", "食", "住", "行"]
    };
  }
};
</script>