<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 6,
  },
});
</script>

<template>
  <div class="skeleton_product_card" v-for="(_, idx) in size" :key="idx">
    <div class="image-wrap">
      <q-skeleton square />
    </div>
    <q-skeleton width="120px" class="mt-1" square />
    <q-skeleton class="w100 mt-2" square />
    <q-skeleton width="150px" class="mt-3" square />
    <q-skeleton width="250px" class="mt-1" square />
    <q-skeleton width="100px" class="mt-1" square />
    <q-skeleton width="160px" class="mt-2" square />
    <q-skeleton width="100px" class="mt-1" square />
    <q-skeleton class="skeleton-btn mt-2" square />
  </div>
</template>

<style lang="scss" scoped>
.skeleton_product_card {
  background-color: #fff;
  width: 100%;
  border-radius: 6px;
  padding: 16px;
  .image-wrap {
    display: flex;
    justify-content: center;
    > div {
      max-width: 240px;
      width: 100%;
      height: 240px;
    }
  }
  .skeleton-btn {
    height: 50px;
    width: 100%;
    border-radius: 6px;
  }
}
</style>
