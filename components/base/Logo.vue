<script setup lang="ts"></script>
<template>
  <NuxtLink :to="localePath('/')" class="base_logo">
    <nuxt-img
      src="/images/logo.png"
      quality="10"
      alt="base-logo"
      :draggable="false"
      width="129px"
      height="39"
    />
  </NuxtLink>
</template>
