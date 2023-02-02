<script lang="ts" setup>
const search = ref(null);
const { t } = useI18n();
</script>

<template>
  <div class="search_wrapper">
    <BaseInput
      v-model="search"
      icon="search"
      outlined
      dense
      class="base_search_input"
      :placeholder="t('Search')"
      append
    >
      <template #append>
        <q-icon v-if="!search" name="search" />
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="search = null"
        />
      </template>
    </BaseInput>
  </div>
</template>

<style scoped lang="scss">
.search_wrapper {
  width: 100%;
  max-width: 1140px;
  margin: 0 20px;
}
.base_search_input {
  // width: 100%;
}
</style>
