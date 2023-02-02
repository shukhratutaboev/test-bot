<script setup>
import { ref, useAttrs, computed } from "vue-demi";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const attrs = useAttrs();
const props = defineProps({
  modelValue: [Number, String, Object],
  cbFunc: {
    type: Function,
    default: () => null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: "label",
  },
  required: {
    type: Boolean,
    default: false,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  option: {
    type: Boolean,
    default: false,
  },
  selected: {
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
});
const emit = defineEmits(["select", "loaded"]);

let initialized = false;
const list = ref([]);

const onInput = function (items) {
  emit("select", { ...items });
};

const selectedLabel = computed(() => {
  const value = props.modelValue;
  const optionValue = attrs["option-value"];
  const optionLabel = attrs["option-label"];

  if (typeof value === "number") {
    return list.value.find((el) => el[optionValue] === value)?.[optionLabel];
  }
  return value[optionLabel];
});

const filterFn = async function (val, update) {
  await init();
  update();
};

const init = async function () {
  if (!initialized) {
    let items = await props.cbFunc(props.params).catch((e) => false);
    emit("loaded", items);

    initialized = !!items?.length;
    list.value = items;
  }
};
function reset() {
  initialized = false;
}
defineExpose({
  reset,
});
</script>

<template>
  <q-select
    class="base_select_by_url"
    dropdown-icon="keyboard_arrow_down"
    v-bind="attrs"
    hide-bottom-space
    options-dense
    :options="list"
    :model-value="modelValue"
    lazy-rules="ondemand"
    transition-show="jump-up"
    transition-hide="jump-down"
    :transition-duration="50"
    @filter="filterFn"
    @update:model-value="onInput"
  >
    <template v-if="selected && modelValue" #selected>
      {{ t(selectedLabel || "") }}
    </template>
    <template v-else-if="placeholder && !modelValue" #selected>
      <div class="placeholder">
        <span>{{ placeholder }}</span>
        <!-- <span v-if="required" class="required-text-red">*</span> -->
      </div>
    </template>
    <template v-if="!placeholder" #label>
      <span>{{ attrs.label }}</span>
    </template>
    <template #no-option>
      <q-item class="items-center">
        {{ t("no_data") }}
      </q-item>
    </template>
    <template v-if="option" #option="item">
      <slot name="option" v-bind="item" />
    </template>
    <template v-if="append" #append>
      <slot name="append" />
    </template>
    <template v-if="prepend" #prepend>
      <slot name="prepend" />
    </template>
  </q-select>
</template>

<style lang="scss" scoped>
.base_select_by_url {
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
