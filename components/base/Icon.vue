<script setup lang="ts">
const props = defineProps({
  width: {
    type: [Number, String],
    default: 24,
  },
  height: {
    type: [Number, String],
    default: 24,
  },
  iconColor: {
    type: String,
    default: "currentColor",
  },
  iconHoverColor: {
    type: String,
    default: "currentColor",
  },
  viewBox: {
    type: String,
    default: "0 0 24 24",
  },
  name: {
    type: String,
    default: null,
  },
  fill: {
    type: Boolean,
    default: false,
  },
});
const isHover = ref(false);

const iconComponent = computed(() => {
  if (!props.name) return;
  return defineAsyncComponent(
    () => import(`@/components/icons/${props.name}Icon.vue`)
  );
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :style="`min-width: ${width}px; max-width: ${width}px;`"
    :viewBox="viewBox"
    role="presentation"
    class="base_icon"
    @click="$emit('click')"
  >
    <g
      class="icon"
      :stroke="!fill && isHover ? iconHoverColor : iconColor"
      :fill="!fill ? 'none' : isHover ? iconHoverColor : iconColor"
      @mouseover="isHover = true"
      @mouseout="isHover = false"
    >
      <component v-if="name" :is="iconComponent" />
      <slot />
    </g>
  </svg>
</template>

<style scoped>
.icon {
  /* transition: fill 0.4s ease; */
}
</style>
