<template>
  <div class="home-library">
    <div class="home-library-title">
      <div>文库每日更新</div>
    </div>
    <div class="home-library-list">
      <div class="home-library-item" v-for="(item, index) in libraryClass">
        <var-tabs
          v-model:active="active[index]"
          color="#fff"
          active-color="#ff3992"
          inactive-color="#000"
          indicator-size="0"
        >
          <var-tab v-for="tabName in item">{{ tabName }}</var-tab>
        </var-tabs>
        <var-tabs-items v-model:active="active[index]" :can-swipe="false">
          <var-tab-item v-for="(itemList, index) in libraryList[index]">
            <HomeList
              :id="item.id"
              :pic-url="item.picUrl"
              :name="item.name"
              :tags="item.classTags"
              :key="item.id"
              v-for="item in itemList"
            >
            </HomeList>
          </var-tab-item>
        </var-tabs-items>
        <var-loading type="wave" v-if="isLoading" color="#ff3992" />
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeList from "@/components/Home/HomeList.vue";
import { getNovelLibrary } from "@/api/home";
import {onMounted, ref} from "vue";

const active = ref([])
const libraryClass = ref([
  ['电击文库', '富士见文库', '角川文库', 'MF文库J'],
  ['Fami通文库', 'GA文库', 'HJ文库', '一迅社'],
  ['集英社', '小学馆', '讲谈社', '少女文库']
])
const libraryList = ref([])
const limit = ref(10)
const page = ref(1)
const isLoading = ref(true)

onMounted(() => {
  // 初始化分类小说
  initLibrary()
})

// 初始化分类小说
function initLibrary() {
  libraryClass.value.forEach(async item => {
    const arr = []
    for (const list of item) {
      const res = await getNovelLibrary(list, limit.value, page.value)
      arr.push(res.data.list)
    }
    libraryList.value.push(arr)
    setTimeout(() => {
      isLoading.value = false
    }, 0)
  })
}
</script>

<style scoped lang="scss">
.home-library {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 15px 15px 15px;
  .home-library-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    div {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }
  }
  .home-library-list {
    .home-library-item {
      padding: 5px 0;
      //border-bottom: 1px solid #ddd;
      :deep(.var-swipe-item) {
        display: flex;
        overflow: scroll;
        height: 100%;
      }
      :deep(.var-swipe-item)::-webkit-scrollbar {
        display: none;
      }
      /* 隐藏 IE、Edge 和 Firefox 的滚动条 */
      :deep(.var-swipe-item) {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
      :deep(.var-tabs--layout-horizontal-padding) {
        padding: 0;
      }
      :deep(.var-swipe) {
        height: 100%;
      }
    }
    .home-library-item:last-of-type {
      border: none;
    }
  }
}
</style>
