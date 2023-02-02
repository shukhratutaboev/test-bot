<script lang="ts" setup>
import PartnerCard from "./modules/PartnerCard.vue";

const { t } = useI18n();
const route = useRoute();
const allProdType = "all";
const productType = ref(route.query?.type === allProdType ? allProdType : null);

const breadcrumbsList = ref([
  {
    label: "home",
    link: "/",
  },
  {
    label: "home",
    link: null,
  },
]);
const products: any = ref([]);

interface IPartner {
  imgName: string;
  name: string;
  location: string;
  totalScore: string;
  averageScore: string;
}
const partner: IPartner = {
  imgName: "/images/partners/partner1.png",
  name: "OOO «Aqua Stream»",
  location: "Узбекистан, Ташкент",
  totalScore: "31",
  averageScore: "4.5",
};

const productStore = useProduct();
onMounted(async () => {
  const res = await productStore.fetch({ size: 8 });
  products.value = res;
});
</script>
<template>
  <div class="partner_page">
    <div class="container">
      <PartialBreadcrumbs :data="breadcrumbsList" />
      <div class="header">
        <nuxt-img
          width="100%"
          height="300px"
          quality="60"
          src="/images/partners/cover.png"
          class="image"
          alt="partner_cover"
        />
        <PartnerCard :item="partner" />
      </div>

      <section class="content">
        <div class="header">
          <div class="title">{{ t("Sales_hits") }}</div>
        </div>
        <div class="products products_grid">
          <PartialsProductCard
            v-for="(item, idx) in products"
            :product="item"
          />
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
.partner_page {
  padding-top: 26px;
  .container {
    > .header {
      position: relative;
      margin-bottom: 100px;
      padding-top: 26px;
      :deep(.partner_card) {
        position: absolute;
        bottom: -50px;
        left: 20px;
      }
    }
  }
  .content {
    .header {
      @apply flex;
      margin-bottom: 34px;
      margin-top: 30px;
      .title {
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
      }
    }
  }
  .products {
  }
}
</style>
