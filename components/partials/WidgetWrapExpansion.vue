<script setup>
const { t } = useI18n();
const props = defineProps({
  label: {
    type: String,
    default: "price",
  },
});

const expanded = ref(true);
</script>
<template>
  <div class="widget_wrap_expansion">
    <q-expansion-item :label="t(label)" v-model="expanded">
      <div class="content">
        <slot />
      </div>
    </q-expansion-item>
  </div>
</template>

<style lang="scss" scoped>
.widget_wrap_expansion {
  margin-bottom: 15px;
  border-radius: 24px;
  border: 1px solid $border-color;
  :deep() {
    .q-focus-helper {
      border-radius: 24px;
      background-color: #fff !important;
    }
    .q-item {
      padding: 18px;
      padding-bottom: 14px;
      &__label {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
      }
    }
    .q-icon {
      color: $text-grey;
    }
  }
  .content {
    padding: 18px;
    padding-top: 0;
    max-height: 280px;
    overflow-y: auto;
  }
}
</style>
