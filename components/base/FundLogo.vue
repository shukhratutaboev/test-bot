<script setup>
const imgRuUrl = "/images/logo/logo-ru.svg";
const imgUzLatnUrl = "/images/logo/logo-latn.svg";
const imgUzCyrlUrl = "/images/logo/logo-cyrl.svg";
const imgUrl = ref(imgRuUrl);

const { locale } = useI18n();
checkImg();
watch(locale, checkImg);

function checkImg() {
  switch (locale.value) {
    case "ru":
      imgUrl.value = imgRuUrl;
      break;
    case "uz-latn":
      imgUrl.value = imgUzLatnUrl;
      break;
    case "uz":
      imgUrl.value = imgUzCyrlUrl;
      break;
  }
}
</script>
<template>
  <div class="logo_wrap">
    <BaseImg :src="imgUrl" alt="logo" class="logo" v-bind="$attrs" />
  </div>
</template>

<style lang="scss" scoped>
.logo_wrap {
  display: flex;
  align-items: center;
}
.mobile {
  .logo {
    height: 50px;
  }
}
</style>
