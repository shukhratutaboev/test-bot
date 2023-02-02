<script setup lang="ts">
interface IProps {
  src: string;
  placeholderImg?: string;
}

const props = defineProps<IProps>();

const defaultPlaceholderImg = "/images/product-placeholder.png";

const imgUrl = computed(() => {
  return props.src || props.placeholderImg || defaultPlaceholderImg;
});
const show = ref(true);
onMounted(async () => {
  show.value = false;
  await nextTick();
  show.value = true;
});
</script>

<template>
  <q-img
    v-if="show"
    :src="imgUrl"
    class="base-img"
    v-bind="$attrs"
    :draggable="false"
    fit="contain"
    spinner-size="18px"
  >
    <template #error>
      <q-img
        :src="placeholderImg || defaultPlaceholderImg"
        alt="error-placeholder"
        :width="`${$attrs.width || '30px'}`"
        :height="`${$attrs.height || '30px'}`"
        :spinner-size="`${$attrs['spinner-size'] || '18px'}`"
        :draggable="false"
        fit="contain"
      />
    </template>
  </q-img>
</template>

<style lang="scss" scoped>
.base-img {
  :deep(.q-img__content) {
    // text-align: center;
    > div {
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 6px;
      left: 0;
    }
  }
}
</style>
