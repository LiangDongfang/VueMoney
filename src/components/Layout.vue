<template>
  <div class="layout-wrapper" :class="classPerfix && `${classPerfix}-wrapper`">
    <div class="content" :class="classPerfix && `${classPerfix}-content`">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang='ts'>
export default {
  props: ["classPerfix"],
  name: "Layout"
};
</script>

<style lang="scss">
.layout-content {
  border: 3px solid red;
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex: 1;
  overflow: auto;
}
</style>