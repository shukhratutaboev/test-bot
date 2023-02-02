<script setup lang="ts"></script>
<template>
  <q-btn-dropdown
    class="base_btn_dropdown"
    dense
    flat
    no-caps
    color="dark"
    v-bind="$attrs"
    dropdown-icon="keyboard_arrow_down"
  >
    <template #label>
      <slot name="label" />
    </template>
    <slot />
  </q-btn-dropdown>
</template>
<style scoped lang="scss">
.base_btn_dropdown {
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  :deep() {
    .q-icon {
      color: $grey-5;
      font-size: 22px;
    }
  }
}
</style>
