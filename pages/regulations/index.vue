<script setup lang="ts">
const { t, locale } = useI18n();
import TextRu from "./TextRu.vue";
import TextUzLatn from "./TextUzLatn.vue";
import TextUzCyrl from "./TextUzCyrl.vue";
</script>
<template>
  <div class="pb-10">
    <div class="container">
      <div class="title-lg my-6">{{ t("regulations") }}</div>

      <div class="regulations-content">
        <TextRu class="text" v-if="locale === 'ru'" />
        <TextUzLatn class="text" v-if="locale === 'uz-latn'" />
        <TextUzCyrl class="text" v-if="locale === 'uz'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.regulations-content {
  max-width: 900px;
}
</style>
