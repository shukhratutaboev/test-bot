<script setup>
import { onMounted, ref } from "vue-demi";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const regionId = useState("regionId");
const regionsList = useState("regionsList");

const { setRegionId } = useRegions();

const dialog = ref(false);

onMounted(() => {
  !regionId.value && open();
});

function onChangeRegionId(id) {
  setRegionId(id);
  close();
}
function open() {
  dialog.value = true;
}
function close() {
  dialog.value = false;
}
</script>
<template>
  <q-dialog
    v-model="dialog"
    persistent
    :full-height="$q.platform.is.mobile"
    class="select_regions_dialog"
  >
    <q-card>
      <header class="header">
        <div class="title">{{ t("Select_your_region") }}</div>
      </header>
      <div class="content">
        <div class="col" v-for="(item, index) in regionsList" :key="index">
          <q-radio
            :model-value="+regionId"
            :val="item.id"
            :label="item.name"
            @update:model-value="onChangeRegionId(item.id)"
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.select_regions_dialog {
  .q-card {
    max-width: 662px;
    width: 100%;
    position: relative;
  }
  .close_btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .header {
    width: 100%;
    padding-top: 35px;
    padding-bottom: 35px;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 1;
    .title {
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      letter-spacing: -0.02em;
    }
  }
  .content {
    padding: 46px;
    padding-top: 0px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    :deep(.q-radio) {
      font-size: 18px;
      line-height: 21px;
      white-space: nowrap;
    }
  }
}
.mobile {
  .select_regions_dialog {
    .header {
      padding-top: 25px;
      padding-bottom: 0;
    }
    .content {
      display: block;
      // max-height: 400px;
      overflow-y: scroll;
      padding: 20px;
    }
    :deep(.q-radio) {
      font-size: 16px;
      line-height: 19px;
    }
  }
}
</style>
