<template>
  <div class="search-input">
    <div class="search-input-box shadow">
      <div class="search-input-top">
        <div class="search-input-left">
          <search theme="outline" size="0.35rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square"/>
          <input type="text" placeholder="熊熊勇闯异世界" v-model="iptValue" @keyup.enter="onSearch(iptValue)">
        </div>
        <div class="search-input-right" @click="onEmpty">
          <close-small theme="outline" size="0.35rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square" v-if="isContent"/>
        </div>
      </div>
      <div class="search-input-bottom" v-show="isContent">
        <div class="search-input-item" v-for="item in novelList" @click="onSearch(item.name)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <var-popup position="right" v-model:show="isPopup">
      <SearchPopup @hidePopup="hidePopup" :ipt-value="iptValue"></SearchPopup>
    </var-popup>
  </div>
</template>

<script setup>
import { Search, CloseSmall } from "@icon-park/vue-next";
import { getNovelSearch } from "@/api/search";
import SearchPopup from "@/components/Search/SearchPopup.vue";
import emitter from "@/utils/emitter";
import {ref, watch} from "vue";
import {Snackbar} from "@varlet/ui";

const iptValue = ref("")
const isContent = ref(false)
const limit = ref(10)
const page = ref(1)
const novelList = ref([])
const timer = ref(null)
const isPopup = ref(false)

emitter.on('onSearch', value => {
  onSearch(value)
})

// 预搜索内容初始化
async function initNovelSearch() {
  const res = await getNovelSearch(iptValue.value, limit.value, page.value)
  // 判断搜索结果是否为空
  if (res.status === 403)  {
    isContent.value = false
    novelList.value = []
    return
  }
  if (res.status !== 200) return Snackbar.error(res.message)
  isContent.value = true
  novelList.value = res.data.list
}

// 清空搜索框
function onEmpty() {
  novelList.value = []
  iptValue.value = ""
}

// 按下搜索关键词
function onSearch(value) {
  if (!value) return Snackbar.error('搜索框不能为空')
  isPopup.value = true
  iptValue.value = value

  // 保存历史记录
  const history = localStorage.getItem('SearchHistory') // 获取历史记录

  // 判断先前是否存在历史记录
  if (history) {
    const historyArr = JSON.parse(history) // 解析历史记录
    // 判断记录是否存在
    if (historyArr.some(item => item === value)) return
    // 追加新记录
    historyArr.push(value)
    // 保存历史
    localStorage.setItem('SearchHistory', JSON.stringify(historyArr))
  } else {
    const arr = []
    arr.push(value)
    localStorage.setItem('SearchHistory', JSON.stringify(arr))
  }
}

// 隐藏popup弹出层
function hidePopup() {
  isPopup.value = false
}

// 监听input搜索框变化
watch(() => iptValue.value, () => {
  if (iptValue.value) {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      initNovelSearch()
    }, 500)
  } else {
    isContent.value = false
  }
})
</script>

<style scoped lang="scss">
.search-input {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.9rem 12px 10px 12px;
  .search-input-box {
    background-color: #fff;
    border-radius: 2px;
    padding: 14px 12px;
  }
  .search-input-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-input-left {
      display: flex;
      align-items: center;
      width: 100%;
      input {
        width: 100%;
        border: none;
        outline: none;
        padding-left: 10px;
        font-size: 18px;
      }
    }
  }
  .search-input-bottom {
    padding-top: 14px;
    .search-input-item {
      padding: 14px 0;
      font-size: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 1px solid #f1f1f1;
      color: #333;
    }
  }
}
:deep(.var-popup__content) {
  overflow: unset;
}
</style>
