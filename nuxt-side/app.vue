<script setup>
  particlesJS.load('particles-js', '/particles/snow.json', function() {
    ////console.log('callback - particles.js config loaded');
  });
</script>

<template>
  <AppHeader/>
  <div id="particles-js"></div>
  <NuxtPage/>
</template>

<style lang="scss">
  @use "~/public/scss/main.scss";
</style>