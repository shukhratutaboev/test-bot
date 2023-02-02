<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue-demi";
import TermRuText from "./TermRuText.vue";
import TermUzLatnText from "./TermUzLatnText.vue";
import TermUzCyrlText from "./TermUzCyrlText.vue";

const { locale, t } = useI18n();

const emit = defineEmits(["send"]);
const dialog = ref(false);
function open() {
  dialog.value = true;
}
function close() {
  dialog.value = false;
}
defineExpose({
  open,
  close,
});
</script>
<template>
  <q-dialog v-model="dialog" @hide="onHide" class="public_term_dialog">
    <q-card>
      <q-btn
        icon="close"
        round
        flat
        dense
        color="grey-6"
        v-close-popup
        class="close_btn"
      />

      <div class="card_wrap">
        <header class="header">{{ t("Public_offer") }}</header>
        <div class="content">
          <TermRuText v-if="locale === 'ru'" />
          <TermUzLatnText v-if="locale === 'uz-Latn'" />
          <TermUzCyrlText v-if="locale === 'uz-Cyrl'" />
        </div>
        <footer class="footer">
          <q-btn color="grey-6" no-caps :label="t('Cancel')" v-close-popup />
          <q-btn
            color="primary"
            no-caps
            :label="t('Accept_terms')"
            @click="emit('send')"
          />
        </footer>
      </div>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.public_term_dialog {
  .q-card {
    max-width: 780px;
    width: 100%;
    position: relative;
  }
  .close_btn {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .card_wrap {
    padding: 0 24px;
  }
  .header {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    letter-spacing: -0.02em;
    padding: 34px 0;
  }
  .content {
    overflow-y: auto;
    height: 100%;
    height: calc(100vh - 250px);
  }
  .footer {
    padding: 24px 0;
    display: flex;
    gap: 12px;
    justify-content: center;
  }
}
</style>
