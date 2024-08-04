<template>
  <div id="novel" v-if="rollArr.length !== 0">
    <NovelBackBar />
    <NovelHeader
      :id="novelInfo.id"
      :name="novelInfo.name"
      :author="novelInfo.author"
      :class-name="novelInfo.className"
      :is-animation="novelInfo.isAnimation"
      :is-serial="novelInfo.isSerial"
      :pic-url="novelInfo.picUrl"
    />
    <NovelInfo
      :word-count="novelInfo.wordCount"
      :collect="novelInfo.collect"
      :updateTime="novelInfo.updateTime"
      :recentChapters="novelInfo.recentChapters"
      :classTags="novelInfo.classTags"
      :intro="novelInfo.intro"
      @on-link="newestLink"
    />
    <NovelDirectory
      :recent-chapters="novelInfo.recentChapters"
      :roll-arr="rollArr"
    />
    <NovelComment :id="ids" />
    <NovelBtn
      :id="ids"
      :chapter_id="rollArr[0].chapter_list[0].id"
    />
  </div>
</template>

<script setup>
import { getNovelInfo, getNovelRoll } from "@/api/novel";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Snackbar } from "@varlet/ui"

import NovelBackBar from "@/components/Novel/NovelBackBar.vue";
import NovelHeader from "@/components/Novel/NovelHeader.vue";
import NovelInfo from "@/components/Novel/NovelInfo.vue";
import NovelDirectory from "@/components/Novel/NovelDirectory.vue";
import NovelComment from "@/components/Novel/NovelComment.vue";
import NovelBtn from "@/components/Novel/NovelBtn.vue";

const route = useRoute()

const id = route.params.id
const ids = ref(id)

const novelInfo = ref({})
const rollArr = ref([])

onMounted(() => {
  novelInfo.value = {}
  rollArr.value = []

  // 初始化小说基本信息
  initNovelInfo()
  initNovelRoll()
})

// 获取小说信息
async function initNovelInfo() {
  const res = await getNovelInfo(id)
  if (res.status !== 200) return Snackbar.error(res.message)
  novelInfo.value = res.data
}

// 获取小说卷名
async function initNovelRoll() {
  const res = await getNovelRoll(id)
  if (res.status !== 200) return Snackbar.error(res.message)
  rollArr.value = res.data.result
}


// 点击最新章节跳转
function newestLink() {
  setTimeout(() => {
    window.location.href = `/read/${ rollArr.value.slice(-1)[0].chapter_list.slice(-1)[0].id }`
  }, 0)
}
</script>

<style scoped lang="scss">
#novel {
  width: 100%;
  background-color: #fff;
  padding-bottom: 70px;
}
</style>
