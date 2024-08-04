<template>
  <div class="library-content">
    <div class="library-content-list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <LibraryContentItem
          :id="item.id"
          :pic-url="item.picUrl"
          :name="item.name"
          :is-animation="item.isAnimation"
          :intro="item.intro"
          :author="item.author"
          :tags="item.classTags"
          :is-serial="item.isSerial"
          v-for="item in novelList"
        >
        </LibraryContentItem>
      </van-list>
    </div>
  </div>
</template>

<script setup>
import { getLibraryNovel } from "@/api/library";
import LibraryContentItem from "@/components/Library/LibraryContentItem.vue";
import {onActivated, onDeactivated, onMounted, ref, watch} from "vue";
import { useRoute } from "vue-router";
import emitter from "@/utils/emitter";

const route = useRoute()

const query = ref({
  limit: 20,
  page: 1
})

const loading = ref(true)
const finished = ref(false)
const novelList = ref([])
const isRoute = ref(true) // 防止切换网页的时候刷新数据

onMounted(() => {
  novelList.value = [] // 默认清除小说列表
  query.value = { limit: query.value.limit, page: query.value.page , ...route.query }
  initLibraryNovel()
  // 返回顶部
  window.scrollTo({
    top: 0,
  })
})

onActivated(() => {
  isRoute.value = false
})

onDeactivated(() => {
  isRoute.value = false
})

// 接收来自libraryHeader的筛选事件
emitter.on('isRoute', value => {
  isRoute.value = value
})

// 初始化文库数据
async function initLibraryNovel() {
  loading.value = true // loading 默认不加载
  finished.value = false // finished 默认显示加载未完成
  // 发起网络请求
  const res = await getLibraryNovel(query.value)

  // 追加数据
  novelList.value = [...novelList.value, ...res.data.list]

  if (res.data.list.length < query.value.limit) {
    finished.value = true
  }

  setTimeout(() => {
    loading.value = false
  }, 1500)
}

// 下拉加载
function onLoad() {
  query.value.page++
  initLibraryNovel() // 然后在获取
}

watch(() => route.query, () => {
  if (isRoute.value) {
    novelList.value = []
    query.value = { limit: query.value.limit, page: 1,  ...route.query }

    initLibraryNovel()
  }
})
</script>

<style scoped lang="scss">
.library-content {
  background-color: #fff;
  .library-content-list {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  .is-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
