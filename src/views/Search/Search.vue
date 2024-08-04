<template>
  <div id="search">
    <BackBar title="搜索"></BackBar>
    <SearchInput></SearchInput>
    <SearchPopular></SearchPopular>
    <SearchHistory></SearchHistory>
  </div>
</template>

<script name="Search" setup>
import BackBar from "@/components/Common/BackBar.vue";
import SearchInput from "@/components/Search/SearchInput.vue";
import SearchPopular from "@/components/Search/SearchPopular.vue";
import SearchHistory from "@/components/Search/SearchHistory.vue";
</script>

<style scoped lang="scss">
#search {
  padding-top: 1.6rem;
}
:deep(.var-app-bar) {
  z-index: 10;
}
</style>
