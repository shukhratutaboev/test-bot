<script setup lang="ts">
import { mdiInstagram } from "@quasar/extras/mdi-v6";
import {
  fabTelegram,
  fabFacebook,
  fabInstagram,
  fabYoutube,
} from "@quasar/extras/fontawesome-v6";
const { formatPhoneNumber, phoneNumber } = useUtils();

const { t } = useI18n();

const navLinks = [
  {
    label: "About_us",
    to: "/about-us",
  },
  {
    label: "Regulatory_documents",
    to: "/reg",
  },
];
const socialLinks = [
  {
    icon: fabInstagram,
    to: "instagram.com",
  },
  {
    icon: fabFacebook,
    to: "facebook.com",
  },
  {
    icon: fabTelegram,
    to: "telegram.org",
  },
  {
    icon: fabYoutube,
    to: "youtube.com",
  },
];
</script>
<template>
  <footer class="footer">
    <div class="container">
      <BaseLogo />
      <div class="links_wrap">
        <div class="nav_links">
          <BaseLink
            v-for="item in navLinks"
            :label="t(item.label)"
            class="link"
            :to="localePath(item.to)"
            active-class="active"
          />
        </div>
        <div class="social_links">
          <a
            v-for="item in socialLinks"
            target="_blank"
            :href="`https://${item.to}`"
            class="link"
          >
            <q-icon :name="item.icon" />
          </a>
        </div>
      </div>
      <div class="contacts">
        <a :href="`tel:+${phoneNumber}`" class="contact">
          <span class="phone-number">
            {{ formatPhoneNumber(phoneNumber) }}
          </span>
        </a>

        <div class="hint">{{ t("footer_hint") }}</div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  border-top: 1px solid $border-color;
  padding-top: 20px;
  padding-bottom: 30px;
  .container {
    display: flex;
  }
  .links_wrap {
    margin-left: 100px;
    .nav_links {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
      .link {
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 14px;
        &.active {
          background: linear-gradient(92.14deg, #6850ff -4.77%, #fb29b3 132.3%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }
    }
    .social_links {
      display: flex;
      gap: 12px;
      .link {
        background-color: $border-color;
        width: 24px;
        height: 24px;
        border-radius: 40%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        &:nth-child(1) {
          &:hover {
            color: $red-5;
          }
        }
        &:nth-child(2) {
          &:hover {
            color: $primary;
          }
        }
        &:nth-child(3) {
          &:hover {
            color: $blue-4;
          }
        }
        &:nth-child(4) {
          &:hover {
            color: $red-6;
          }
        }
      }
    }
  }
  .contacts {
    margin-left: auto;
    .contact {
      font-weight: 700;
      font-size: 18px;
      line-height: 23px;
      display: block;
      width: max-content;
      margin-bottom: 8px;
    }
    .hint {
      font-size: 14px;
      line-height: 18px;
      color: $text-grey;
    }
  }
}
</style>
