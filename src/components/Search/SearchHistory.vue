<template>
  <div class="search-history">
    <div class="search-history-top">
      <span>搜索历史</span>
      <span @click="onEmpty">清空历史</span>
    </div>
    <div class="search-history-list">
      <div class="search-history-item" v-for="item in historyList" @click="onSearch(item)">
        {{ item }}
      </div >
    </div>
    <van-empty description="历史记录为空" v-if="historyList.length === 0" />
  </div>
</template>

<script setup>
import emitter from "@/utils/emitter";
import { Dialog } from "@varlet/ui";
import { ref } from "vue";

const historyList = ref([])

// 初始化历史记录
addStorage()

// 监听localStorage 变化
window.addEventListener('setItemEvent', (e) => {
  addStorage()
})

function onSearch(value) {
  emitter.emit('onSearch', value)
}

// 清空历史记录
function onEmpty() {
  Dialog({
    title: '确认',
    message: '是否清除历史记录',
    confirmButtonTextColor: "#ff3992",
    cancelButtonTextColor: "#ff3992",
    closeOnClickOverlay: false,
    // 按下确认或取消按钮
    async onBeforeClose(action) {
      if (action === 'confirm') {
        historyList.value = []
        localStorage.removeItem('SearchHistory')
        await Dialog.close()
      } else {
        // 关闭窗口
        await Dialog.close()
      }
    }
  })
}

// 添加历史记录到本地存储
function addStorage() {
  // 异步获取
  setTimeout(() => {
    const history = localStorage.getItem('SearchHistory')
    if (history) {
      historyList.value = JSON.parse(history)
    }
  }, 0)
}
</script>

<style scoped lang="scss">
.search-history {
  padding: 8px 12px;
  .search-history-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 22px;
    color: #444;
    span:nth-child(2) {
      color: #666;
      font-size: 18px;
    }
  }
  .search-history-list {
    display: flex;
    flex-wrap: wrap;
    .search-history-item {
      padding: 8px 10px;
      font-size: 18px;
      background-color: #eee;
      margin: 8px;
      border-radius: 2px;
    }
  }
}
</style>
