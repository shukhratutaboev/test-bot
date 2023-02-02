<script setup lang="ts">
interface IProps {
  icon?: string;
  qIcon?: string;
  iconRight?: string;
  qIconRight?: string;
  label: string;
  vertical?: boolean;
  iconWidth?: string;
  iconHeight?: string;
  iconColor?: string;
  qIconSize?: string;
  qIconColor?: string;
  fontSize?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  iconWidth: "25",
  iconHeight: "25",
  qIconSize: "22px",
  qIconColor: "grey-5",
  fontSize: "14px",
});

const { t } = useI18n();
</script>
<template>
  <NuxtLink
    v-bind="$attrs"
    class="base_link"
    :class="{ icon, vertical: icon && vertical }"
  >
    <BaseIcon
      v-if="icon"
      :name="icon"
      :width="iconWidth"
      :height="iconHeight"
    />
    <q-icon v-if="qIcon" :name="qIcon" :size="qIconSize" :color="qIconColor" />
    <span class="label">{{ t(label) }}</span>
    <BaseIcon
      v-if="iconRight"
      :name="iconRight"
      :width="iconWidth"
      :height="iconHeight"
    />
    <q-icon
      v-if="qIconRight"
      :name="qIconRight"
      :size="qIconSize"
      :color="qIconColor"
    />
  </NuxtLink>
</template>

<style scoped lang="scss">
.base_link {
  display: inline-flex;
  align-items: center;
  font-weight: 400;
  font-size: v-bind(fontSize);

  :deep(.nuxt-icon) {
    path {
      stroke: v-bind(iconColor);
    }
  }
  &:hover {
    .label {
      text-decoration: underline;
    }
    &:deep(.nuxt-icon) {
      path {
        stroke: v-bind(iconColor);
      }
    }
  }
  &.icon {
    .label {
      margin-left: 5px;
    }
  }
  &.vertical {
    flex-direction: column;
    .label {
      margin-left: 0;
      margin-top: 3px;
    }
  }
}
</style>
