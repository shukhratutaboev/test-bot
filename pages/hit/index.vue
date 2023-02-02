<script setup lang="ts">
import { IProduct } from "~~/types/product.types";

const { t, locale } = useI18n();

const productStore = useProduct();

onMounted(async () => {
  await fetchProductsHist();
});

const productsHitsList = ref<IProduct[] | null>(null);
async function fetchProductsHist() {
  const res = await productStore.fetch({ hit: 1 });

  productsHitsList.value = res.items || null;
}
</script>
<template>
  <div class="pb-20">
    <div class="container">
      <div class="title-md my-6">{{ t("Sales_hits") }}</div>

      <div class="products products_grid">
        <PartialsProductCard
          v-for="(item, idx) in productsHitsList"
          :product="item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
