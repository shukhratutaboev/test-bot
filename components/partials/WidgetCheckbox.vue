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

const items = ref([
  ...props.data.map((v) => ({ id: v.id, label: v.name, value: false })),
]);

let isFirstLoad = true;
function onUpdateModelValue(e) {
  if (!isFirstLoad) emit("update", e);
}

onMounted(() => {
  setTimeout(() => {
    isFirstLoad = false;
  }, 100);
});

const checkedItems = computed(() =>
  items.value.filter((v) => v.value).map((v) => v.id)
);
</script>

<template>
  <div class="widget_checkbox">
    <q-checkbox
      v-for="(item, index) in items"
      :key="index"
      v-model="item.value"
      :label="t(item.label || item.name || '')"
      @update:model-value="() => onUpdateModelValue(checkedItems)"
    />
  </div>
</template>

<style lang="scss" scoped>
.widget_checkbox {
}
</style>
