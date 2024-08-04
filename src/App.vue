<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Home', 'Library', 'User', 'Search']">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script setup>
</script>

<style lang="scss">
</style>
