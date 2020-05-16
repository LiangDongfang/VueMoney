<template>
  <div>
    <Layout classPerfix="layout">
      <NumberPad />
      <Types :xxx = "333"/>
      <Notes />
      <Tags />
    </Layout>
  </div>
</template>

<script lang='ts'>
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
export default {
  name: "Money",
  components: { NumberPad, Types, Notes, Tags }
};
</script>