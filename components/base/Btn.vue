<script setup lang="ts">
defineProps({
  green: Boolean,
});
</script>
<template>
  <q-btn
    class="base_btn"
    :class="{ green }"
    v-bind="$attrs"
    no-caps
    unelevated
  />
</template>
<style scoped lang="scss">
.base_btn {
  border-radius: 12px;
  &.green {
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    background: linear-gradient(92.14deg, #a3cf51 -4.77%, #51af70 132.3%),
      #2970fe;
    color: #fff;
  }
}
</style>
