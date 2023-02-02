<script setup>
const { t } = useI18n();
const emit = defineEmits(["update"]);
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const model = ref(null);

const items = ref(props.data);

let isFirstLoad = true;
function onUpdateModelValue(e) {
  if (!isFirstLoad) emit("update", e);
}

onMounted(() => {
  setTimeout(() => {
    isFirstLoad = false;
  }, 100);
});
</script>
<template>
  <div class="widget_radio">
    <q-radio
      v-for="(item, index) in items"
      :key="index"
      v-model="model"
      :val="item.val"
      :label="t(item.label || '')"
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>

<style lang="scss" scoped>
.widget_radio {
}
</style>
