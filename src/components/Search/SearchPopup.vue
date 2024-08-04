<template>
  <div class="search-popup">
    <var-app-bar title="搜索结果" color="#fff" elevation="false" text-color="#000" class="search-back">
      <template #left>
        <var-button
          color="transparent"
          text-color="#000"
          round
          text
          @click="onBack"
        >
          <var-icon name="chevron-left" :size="24" />
        </var-button>
      </template>
    </var-app-bar>
    <div class="search-list" ref="searchListElement">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <LibraryContentItem
          :key="item.id"
          :id="item.id"
          :pic-url="item.picUrl"
          :name="item.name"
          :is-animation="item.isAnimation"
          :intro="item.intro"
          :author="item.author"
          :tags="item.classTags"
          :is-serial="item.isSerial"
          :is-tags="true"
          @click="onLink(item.id)"
          v-for="item in searchList"
        >
        </LibraryContentItem>
      </van-list>
    </div>
  </div>
</template>

<script setup>
import LibraryContentItem from "@/components/Library/LibraryContentItem.vue";
import { getNovelSearch } from "@/api/search";
import {computed, onActivated, ref, watch} from "vue";
import {Snackbar} from "@varlet/ui";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter()

const props = defineProps({
  iptValue: {
    type: String,
    default: ""
  }
})

const loading = ref(true)
const finished = ref(false)
const searchList = ref([])
const limit = ref(20)
const page = ref(1)

const emit = defineEmits(['hidePopup'])

// 初始化搜索内容
initNovelSearch()

const store = useStore()

// 获取搜索类别元素
const searchListElement = ref(null)

onActivated(() => {
  // 从小说详情页面返回搜索页面保存滚动条位置
  const searchScroll = computed(() => store.state.searchScroll)
  setTimeout(() => {
    document.querySelector('.search-list').scrollTop = parseInt(searchScroll.value)
  }, 0)
})

// 搜索内容初始化
async function initNovelSearch() {
  loading.value = true // loading 默认不加载
  finished.value = false // finished 默认显示加载未完成

  const res = await getNovelSearch(props.iptValue, limit.value, page.value)
  // 判断搜索结果是否为空
  if (res.status === 403)  {
    finished.value = true
    loading.value = true
    return
  }
  if (res.status !== 200) return Snackbar.error(res.message)
  // 处理tag标签
  const newArr = []
  res.data.list.forEach(item => {
    item.classTags = item.classTags.splice(0, 4)
    newArr.push(item)
  })
  searchList.value = [...searchList.value, ...res.data.list]
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

// 返回搜索页
function onBack() {
  searchList.value = []
  page.value = 1
  emit('hidePopup')
}

// 下拉加载
function onLoad() {
  page.value++
  initNovelSearch()
}

// 跳转页面
function onLink(id) {
  const searchScroll = searchListElement.value.scrollTop
  store.commit('setSearchScroll', searchScroll)
  router.push({
    path: `/novel/${id}`,
  })
}

watch(() => props.iptValue, () => {
  page.value = 1
  initNovelSearch()
})
</script>

<style scoped lang="scss">
.search-popup {
  .search-back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .search-list {
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    padding-top: 0.80rem;
  }
}
:deep(.var-app-bar__toolbar) {
  height: 0.80rem;
}
</style>
