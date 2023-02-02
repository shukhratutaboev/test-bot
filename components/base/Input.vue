<script setup lang="ts">
import { QInput } from "quasar";
import { Ref, ref, onMounted, watch } from "vue-demi";

const { prettify, trimBetween } = useUtils();

type InputTypes =
  | "text"
  | "password"
  | "textarea"
  | "email"
  | "search"
  | "tel"
  | "file"
  | "number"
  | "url"
  | "time"
  | "date"
  | undefined;

interface IProps {
  modelValue: string | null;
  append?: boolean;
  prepend?: boolean;
  after?: boolean;
  type?: InputTypes;
}
const props = defineProps<IProps>();

interface IEmits {
  (e: "update:modelValue", value: string): void;
}
const emit = defineEmits<IEmits>();

const inputRef: Ref<typeof QInput | null> = ref(null);

onMounted(() => {
  if (props.type === "number") {
    innerType.value = "text";
    emit("update:modelValue", prettify(props.modelValue).toString());
  }
});
const innerType = ref<InputTypes>(props.type || "text");
watch(
  () => props.type,
  () => {
    innerType.value = props.type || "text";
  }
);

function focus() {
  inputRef.value?.focus();
}
function resetValidation() {
  inputRef.value?.resetValidation();
}
function onFocus(e: Event) {
  if (props.type === "number") {
    innerType.value = props.type;
    const target = <HTMLInputElement>e.target;
    emit("update:modelValue", trimBetween(target.value));
  }
}
function onBlur(e: Event) {
  if (props.type === "number") {
    innerType.value = "text";
    const target = <HTMLInputElement>e.target;
    emit("update:modelValue", prettify(target.value));
  }
}

function change(v: string | number | null) {
  emit("update:modelValue", v + "");
}

defineExpose({
  focus,
  resetValidation,
});
</script>

<template>
  <q-input
    ref="inputRef"
    v-bind="$attrs"
    :model-value="modelValue"
    hide-bottom-space
    class="base_input"
    no-error-icon
    lazy-rules="ondemand"
    :type="innerType"
    @blur="onBlur"
    @focus="onFocus"
    @update:model-value="change"
  >
    <template v-if="append" #append>
      <slot name="append" />
    </template>
    <template v-if="prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="after" #after>
      <slot name="after" />
    </template>
  </q-input>
</template>

<style scoped lang="scss">
.base_input {
  &.q-field--outlined {
    :deep() {
      .q-field {
        &__prepend {
          padding-right: 4px;
        }
        &__control {
          border-radius: 10px;
          &:before {
            border-color: $border-color;
          }
        }
      }
      .phone_prefix {
        color: $dark;
        font-size: 14px;
      }
    }
  }
  ::placeholder {
    color: $text-grey;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
  }
}
</style>
