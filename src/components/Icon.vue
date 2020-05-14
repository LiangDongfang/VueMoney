<template>
  <svg class="icon">
    <use v-bind:xlink:href="'#'+iconId" />
  </svg>
</template>

<script lang="ts">
//批量导入svg
//声明一个importAll，
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  name: "Icon",
  props: ["iconId"]
};
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>