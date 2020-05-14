<template>
  <div>
    <router-link to="/money">
      <Icon iconId="money" />记账
    </router-link>|
    <router-link to="/labels">
      <Icon iconId="label" />标签
    </router-link>|
    <router-link to="/statistics">
      <Icon iconId="statistics" />统计
    </router-link>
  </div>
</template>

<script lang="ts">
// import x from "@/assets/icons/label.svg";

export default {
  name: "Nav"
};
</script>


<style lang="scss" scoped>
</style>