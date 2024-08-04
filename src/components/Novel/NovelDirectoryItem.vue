<template>
  <div class="novel-directory-item">
    <div class="novel-directory-name">
      {{ name }}
    </div>
    <div class="novel-directory-chapter">
      <p v-for="chapter in props.rollChapterList" @click="onLink(chapter.id)">{{ chapter.chapter_title }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ""
  },
  rollChapterList: {
    type: Array,
    default: []
  }
})

function onLink(id) {
  window.location.href = `/read/${id}`
}

</script>

<style scoped lang="scss">
.novel-directory-item {
  .novel-directory-name {
    padding: 8px 20px;
    font-size: 18px;
    color: #666;
    background-color: #eee;
  }
  .novel-directory-chapter p {
    border-bottom: 1px solid #eee;
    padding: 20px;
    font-size: 18px;
  }
}
</style>
