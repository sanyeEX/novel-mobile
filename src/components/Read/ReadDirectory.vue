<template>
  <div class="read-directory">
    <ReadDirectoryItem
      :name="item.roll_title"
      :roll-chapter-list="item.chapter_list"
      v-for="item in rollArr"
    >
    </ReadDirectoryItem>
  </div>
</template>

<script setup>
import ReadDirectoryItem from "@/components/Read/ReadDirectoryItem.vue";

const props = defineProps({
  rollArr: {
    type: Array,
    default: []
  }
})
</script>

<style scoped lang="scss">
.read-directory {
  width: 70vw;
}
</style>
