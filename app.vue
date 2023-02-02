<script setup>
const { useQuasar } = useUtils();
const $q = useQuasar();
if ($q.platform.is.platform === "win") {
  document.body.classList.add("windows");
}
</script>
<template>
  <NuxtLayout name="main-layout" />
</template>
