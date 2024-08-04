<template>
  <div id="library">
    <LibraryPopup />
    <LibraryHeader />
    <LibraryContent />
    <LibraryBackTop />
    <BottomTab :active="1" />
  </div>
</template>

<script name="Library" setup>
import LibraryPopup from "@/components/Library/LibraryPopup.vue";
import LibraryHeader from "@/components/Library/LibraryHeader.vue";
import LibraryContent from "@/components/Library/LibraryContent.vue";
import LibraryBackTop from "@/components/Library/LibraryBackTop.vue";
import BottomTab from "@/components/Common/BottomTab.vue";
</script>

<style scoped lang="scss">

</style>
