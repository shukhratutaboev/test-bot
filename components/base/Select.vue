<template>
  <q-select
    class="base_select"
    hide-bottom-space
    dropdown-icon="keyboard_arrow_down"
    transition-show="jump-up"
    transition-hide="jump-down"
    :transition-duration="50"
    lazy-rules="ondemand"
    v-bind="attrs"
    options-dense
    @update:model-value="change"
    :model-value="modelValue"
  >
    <template v-if="selected && modelValue" #selected>
      {{ t(modelValue?.label || "") }}
    </template>
    <template v-else-if="placeholder && !modelValue" #selected>
      <div class="placeholder">
        <span>{{ placeholder }}</span>
        <span v-if="required" class="text-red">*</span>
      </div>
    </template>
    <template v-if="!placeholder" #label>
      <span>{{ label }}</span>
    </template>
    <template v-if="append" #append>
      <slot name="append" />
    </template>
    <template v-if="prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="option" #option="item">
      <slot name="option" v-bind="item" />
    </template>
  </q-select>
</template>

<script setup>
import { useAttrs } from "vue-demi";
import { useI18n } from "vue-i18n";

const attrs = useAttrs();

// const props =
defineProps({
  modelValue: [Number, String, Object, null],
  placeholder: String,
  required: {
    type: Boolean,
    default: false,
  },
  append: {
    type: Boolean,
    default: false,
  },
  prepend: {
    type: Boolean,
    default: false,
  },
  option: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const { t } = useI18n();

function change(v) {
  emit("update:modelValue", v);
}
</script>

<style lang="scss" scoped>
.base_select {
  &.q-field--outlined {
    :deep() {
      .q-field {
        &__control,
        &__append {
          // height: 44px;
        }
        &__control {
          border-radius: 10px;
          .q-icon {
            color: $text-grey;
          }
          &:before {
            border-color: $border-color;
          }
        }
      }
    }
  }
  .placeholder {
    color: $text-grey;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
  }
}
</style>
