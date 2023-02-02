<script setup>
const { prettify, trimBetween, debounce } = useUtils();
const { t } = useI18n();
const emit = defineEmits(["updateMin", "updateMax"]);
const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
  column: {
    type: Boolean,
    default: false,
  },
});

const standard = ref({
  min: props.min,
  max: props.max,
});

const minValue = ref(props.min);
const maxValue = ref(props.max);

function updateInputMinValue() {
  const { min } = standard.value;
  const minV = trimBetween(minValue.value);
  if (+min === +minV) return;
  standard.value.min = minV;
  emitUpdateMinValue();
}
function updateInputMaxValue() {
  const { max } = standard.value;
  const maxV = trimBetween(maxValue.value);
  if (+max === +maxV) return;
  standard.value.max = maxV;
  emitUpdateMaxValue();
}
function updateSliderRangeValue() {
  const { min, max } = standard.value;
  if (+trimBetween(minValue.value) !== +min) {
    emitUpdateMinValue();
  }
  if (+trimBetween(maxValue.value) !== +max) {
    emitUpdateMaxValue();
  }
  minValue.value = prettify(min);
  maxValue.value = prettify(max);
}
const emitUpdateMinValue = debounce(() => {
  emit("updateMin", standard.value.min);
}, 800);
const emitUpdateMaxValue = debounce(() => {
  emit("updateMax", standard.value.max);
}, 800);
</script>
<template>
  <div class="widget_range">
    <div class="content_row" :class="{ column }">
      <BaseInput
        v-model="minValue"
        outlined
        prepend
        dense
        type="number"
        :placeholder="t('from')"
        @update:model-value="updateInputMinValue"
      />
      <BaseInput
        v-model="maxValue"
        outlined
        prepend
        dense
        :placeholder="t('to')"
        type="number"
        @update:model-value="updateInputMaxValue"
      />
    </div>
    <q-range
      v-model="standard"
      v-bind="$attrs"
      :min="min"
      :max="max"
      class="mt-2"
      @update:model-value="updateSliderRangeValue"
    />
  </div>
</template>

<style lang="scss" scoped>
.widget_range {
  :deep() {
    .content_row {
      display: flex;
      gap: 15px;
      &.column {
        flex-direction: column;
      }

      &:not(.column) {
        .q-field {
        }
      }
    }
  }
}
</style>
