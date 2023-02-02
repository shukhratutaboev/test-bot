<script setup>
import TextRu from "./modules/TextRu.vue";
import TextUzLatn from "./modules/TextUzLatn.vue";
import TextUzCyrl from "./modules/TextUzCyrl.vue";

const { locale, t } = useI18n();
const { formatPhoneNumber, phoneNumber } = useUtils();
</script>

<template>
  <div class="about_us_page">
    <div class="container">
      <!-- <div class="breadcrumbs">Главная >{{ t("about_us") }}</div> -->
      <div class="header">
        <div class="title">{{ t("About_us") }}</div>

        <BaseFundLogo width="340px" height="100px" />
      </div>
      <div class="content">
        <TextRu class="text" v-if="locale === 'ru'" />
        <TextUzLatn class="text" v-if="locale === 'uz-latn'" />
        <TextUzCyrl class="text" v-if="locale === 'uz'" />
        <div class="card_info_row">
          <div class="card">
            <BaseIcon
              name="Location"
              width="54"
              height="54"
              viewBox="0 0 18 18"
              class="text-green-400"
            />
            <p style="max-width: 300px">
              г. Ташкент, Юнусабадский р-н, ул. Чингиза Айтматова, 2Б.
            </p>
          </div>
          <div class="card">
            <BaseIcon
              name="Phone"
              width="54"
              height="54"
              class="text-green-400"
            />
            <a :href="`tel:+${phoneNumber}`" class="contact">
              <span class="phone-number">
                {{ formatPhoneNumber(phoneNumber) }}
              </span>
            </a>
          </div>
          <div class="card">
            <BaseIcon
              name="Message"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              class="text-green-400"
            />
            <p class="text-gray-400 mb-0">Наш e-mail:</p>
            <p>info@iesf.uz</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about_us_page {
  padding-bottom: 140px;
  .header {
    margin-bottom: 24px;
    .title {
      font-weight: 600;
      font-size: 36px;
      line-height: 44px;
      margin-top: 26px;
      margin-bottom: 28px;
    }
  }
  .content {
    .text {
      padding-right: 20px;
      font-size: 16px;
      line-height: 24px;
      max-width: 820px;
    }
    .card_info_row {
      display: flex;
      gap: 20px;
      max-width: 1100px;
      margin-top: 68px;
      .card {
        width: calc(33%);
        background: #f9f9f9;
        border: 1px solid #eef0f4;
        border-radius: 18px;
        padding-top: 34px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        .base_icon {
          margin-bottom: 22px;
        }
      }
    }
  }
}
.mobile {
  .about_us_page {
    .content {
      .text {
        padding: 0;
      }
    }
  }
}
</style>
