<script setup lang="ts"></script>
<template>
  <div class="main_layout">
    <CommonTheHeader />
    <NuxtPage />
    <CommonTheFooter />
    <CommonSelectRegionDialog />
  </div>
</template>

<style scoped lang="scss">
.main_layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
}
</style>
