<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon iconId="money" />记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon iconId="label" />标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon iconId="statistics" />统计
    </router-link>
  </nav>
</template>

<script lang="ts">
// import x from "@/assets/icons/label.svg";

export default {
  name: "Nav"
};
</script>


<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: 0 0 03px rgba($color: #cccccc, $alpha: 0.64);
  flex-direction: row;
  font-size: 16px;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .icon {
    width: 32px;
    height: 32px;
  }
  > .item.selected {
    color: gold;
  }
}
</style>