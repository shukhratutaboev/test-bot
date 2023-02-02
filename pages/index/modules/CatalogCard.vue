<script setup lang="ts">
import { ICatalog } from "../modules/types/catalog.types";
const productsStore = useProduct();
interface IProps {
  item: ICatalog;
}
const props = defineProps<IProps>();

const { t } = useI18n();

const countProduct = ref<Number>(0);

async function fetchProducts() {
  const res: any = await productsStore.getAllCount({
    categoryId: props.item.id,
  });
  countProduct.value = res;
}
onMounted(() => fetchProducts());
</script>
<template>
  <div class="catalog_card">
    <div class="image_wrap">
      <nuxt-img
        :src="`/images/catalog/${item.imgName}.png`"
        height="200px"
        quality="10"
        alt="catalog-image"
      />
    </div>
    <div class="title_wrap">
      <div class="title">{{ t(item.title) }}</div>
      <div class="count">{{ t("p_products_with_count", countProduct) }}</div>
    </div>
    <div class="desc">{{ t(item.desc) }}</div>
    <ul class="list">
      <li class="item" v-for="listItem in item.list">
        <BaseIcon width="27" :name="listItem.iconName" />
        <div class="label">{{ t(listItem.label) }}</div>
      </li>
    </ul>
    <BaseLink
      :label="t(item.action.label)"
      class="link"
      :to="localePath('/category') + '?type=' + item.id"
      q-icon-right="chevron_right"
    />
  </div>
</template>
<style scoped lang="scss">
.catalog_card {
  border: 1px solid $border-color;
  border-radius: 32px;
  padding-left: 34px;
  padding-right: 22px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  .image_wrap {
    height: 200px;
    position: relative;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    img {
      position: absolute;
      top: -20px;
    }
  }
  .title_wrap {
    display: flex;
    align-items: center;
    .title {
      font-weight: 700;
      font-size: 26px;
      line-height: 32px;
    }
    .count {
      max-width: 115px;
      border: 1px solid #eef0f4;
      border-radius: 24px;
      color: $green;
      padding: 6px 14px;
      margin-left: 14px;
    }
  }
  .desc {
    color: $text-grey;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    margin-top: 14px;
    margin-bottom: 24px;
  }
  .list {
    padding-right: 15px;
    margin-bottom: 20px;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 13px;
      .label {
        margin-left: 21px;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
  .link {
    margin-top: auto;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
