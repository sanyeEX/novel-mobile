<template>
  <div class="read-directory-item">
    <div class="read-directory-name">
      {{ name }}
    </div>
    <div class="read-directory-chapter">
      <p
        v-for="chapter in rollChapterList"
        @click.stop="onLink(chapter.id)"
        :class="{ 'active-directory': parseInt(chapter.id) === parseInt($route.params.id)  }"
      >
        {{ chapter.chapter_title }}
      </p>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

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
  router.push({
    path: `/read/${id}`,
  })
}
</script>

<style scoped lang="scss">
.read-directory-item {
  .read-directory-name {
    padding: 8px 20px;
    font-size: 18px;
    color: #666;
    background-color: #eee;
  }
  .read-directory-chapter p {
    border-bottom: 1px solid #eee;
    padding: 16px 20px;
    font-size: 18px;
  }
}
.active-directory {
  color: #ff3992;
  border-left: 10px solid #ff3992 !important;
}
</style>
