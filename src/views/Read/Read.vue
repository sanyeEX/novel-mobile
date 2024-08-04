<template>
  <div id="read" @click="onShowSidebar" :style="{ backgroundColor: color }">
    <ReadSidebar
      @onChangeColor="changeBackground"
      @onShowDirectory="onShowDirectory"
      :chapter-ids="chapterIds"
      :chapter-title="chapterTitle"
      :novel-id="novelId"
      v-if="isLoading"
      ref="readSidebar"
    >
    </ReadSidebar>
    <ReadContent
      :chapter-content="chapterContent"
      :chapter-title="chapterTitle"
      :novel-id="novelId"
      :is-loading="isLoading"
    >
    </ReadContent>
    <var-popup position="right" v-model:show="isPopup">
      <ReadDirectory :roll-arr="rollArr" ref="readDirectory"></ReadDirectory>
    </var-popup>
    <footer v-if="isLoading">
      <div class="footer-title">
        <p>章节已阅读完毕~</p>
      </div>
      <div class="footer-btn">
        <div class="footer-btn-left" @click.stop="onReadNext(true)">
          <left theme="outline" size=".4rem" fill="#000000"/>
          <span>上一章</span>
        </div>
        <div class="footer-btn-right" @click.stop="onReadNext(false)">
          <span>下一章</span>
          <right theme="outline" size=".4rem" fill="#000000"/>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import ReadSidebar from "@/components/Read/ReadSidebar.vue";
import ReadContent from "@/components/Read/ReadContent.vue";
import ReadDirectory from "@/components/Read/ReadDirectory.vue";
import { getChapterContent } from "@/api/read";
import { getNovelRoll } from "@/api/novel";
import { ref, watch } from "vue";
import { Snackbar } from "@varlet/ui";
import { useRoute } from "vue-router";
import { Left, Right } from "@icon-park/vue-next";

const route = useRoute()

const isSidebar = ref(true) // 显示隐藏控制栏
const color = ref('#cfb896') // 背景颜色修改
const chapterContent = ref([]) // 章节内容
const novelId = ref(0) // 小说ID
const chapterTitle = ref('') // 章节名称
const isPopup = ref(false) // 控制目录弹出层
const rollArr = ref([]) // 目录数据
const chapterIds = ref([]) // 章节id集合
const chapterId = ref(0) // 章节id
const readDirectory = ref(null) // 目录元素
const isLoading = ref(false) // 是否加载完成

chapterId.value = parseInt(route.params.id)
initChapterContent() // 初始化章节内容

// 获取用户设置的背景颜色
const userColor = localStorage.getItem('readBackground')
if (userColor) {
  color.value = userColor
}

// 小说控制栏
function onShowSidebar() {
  isSidebar.value = !isSidebar.value
  readSidebar.value.onShowSidebar(!isSidebar.value)
}

// 接收子组件修改背景颜色的请求
function changeBackground(colorValue) {
  color.value = colorValue
  localStorage.setItem('readBackground', colorValue)
}

const readSidebar = ref(null)

// 切换章节
function onReadNext(flag) {
  // 上一章
  if (flag === true) {
    readSidebar.value.onReplace(true)
  } else {
    readSidebar.value.onReplace(false)
  }
}

// 显示目录
function onShowDirectory() {
  isPopup.value = true
  setTimeout(() => {
    // 获取整个屏幕的高度
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight

    // 获取高亮选项位置
    const activeTop = document.querySelector('.active-directory').offsetTop
    // 定位高亮所在位置
    // activeTop - (windowHeight / 2) 高亮位置 减去 屏幕的一半 就可以定位到中间位置
    document.querySelector('.var-popup__content').scrollTop = activeTop - (windowHeight / 2)
  }, 50)
}
// 初始化章节
async function initChapterContent() {
  chapterContent.value = [] // 默认清空章节内容
  isLoading.value = false

  // 发起网络请求获取章节内容
  const res = await getChapterContent(chapterId.value)
  if (res.status !== 200) return Snackbar.error(res.message)
  chapterContent.value = res.data
  chapterTitle.value = res.data.chapter_title
  novelId.value = res.data.novel_id
  rollArr.value = [] // 默认清空目录
  chapterIds.value = [] // 默认清空ids
  isPopup.value = false // 隐藏popup 弹出层
  await initNovelRoll() // 章节加载完成然后初始化小说目录
}
// 获取小说卷名
async function initNovelRoll() {
  const res = await getNovelRoll(novelId.value)
  if (res.status !== 200) return Snackbar.error(res.message)
  rollArr.value = res.data.result

  res.data.result.forEach(item => {
    item.chapter_list.forEach(ids => {
      chapterIds.value.push(ids.id)
    })
  })

  // 返回顶部
  setTimeout(() => {
    window.scrollTo({
      top: 0,
    })
    isLoading.value = true
  }, 0)
}

// 监听路由
watch(() => route.params, () => {
  chapterId.value = parseInt(route.params.id)
  chapterContent.value = []
  initChapterContent()
})

</script>

<style scoped lang="scss">
#read {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background-color: #d9caab;
}
.footer-title {
  display: flex;
  width: 100vw;
  justify-content: center;
  padding: 10px 0;
}
.footer-btn {
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
  .footer-btn-left,
  .footer-btn-right {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }
}
:deep(.i-icon) {
  display: flex;
  align-items: center;
}
</style>
