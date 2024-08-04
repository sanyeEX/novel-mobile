<template>
  <div class="library-header">
    <div class="library-content-title">
      <div class="library-content-title-list">
        <h3>文库筛选</h3>
        <div class="library-content-item">
          <span v-for="key in filterKey">{{ key }}</span>
        </div>
      </div>
      <div class="library-content-icon" @click="onPopupShow">
        <svg width="0.40rem" height="0.40rem" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L20.4 25.8178V38.4444L27.6 42V25.8178L42 9H6Z" fill="none" stroke="#ff3992" stroke-width="4" stroke-linejoin="bevel"/></svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import emitter from "@/utils/emitter";

const route = useRoute()

const filterKey = ref([])
const query = ref({})

onMounted(() => {
  // 初始化筛选关键词
  titleListUpdate()
})

// 点击筛选按钮 显示popup弹出层 发送给组件libraryPopup和libraryContent
function onPopupShow() {
  // 显示popup libraryPopup
  emitter.emit('popupShow', true)
  // 路由筛选链接可被监听 libraryContent
  emitter.emit('isRoute', true)
}
// 更新筛选关键词
function titleListUpdate() {
  query.value = route.query // 获取筛选关键词
  filterKey.value = []
  // 判断是否存在筛选条件
  if (Object.values(query.value).length === 0) {
    return filterKey.value = []
  }

  // 筛选不存在的关键词
  const titleArr = ['isSerial', 'isAnimation', 'classTags', 'className']
  for (let key in query.value) {
    const isFlag = titleArr.some(item => key === item)
    if (!isFlag) {
      delete query.value[key]
    }
  }

  // 追加新的关键字
  let index = 0
  for (let key in query.value) {
    filterKey.value[index] = query.value[key]
    if (key === 'isSerial') {
      filterKey.value[index] = parseInt(query.value[key]) === 1 ? '连载中' : '已完结'
    } else if (key === 'isAnimation') {
      filterKey.value[index] = parseInt(query.value[key]) === 1 ? '已动画化' : '未动画化'
    }
    index++
  }
}

// 监听筛选关键词的变化
watch(() => route.path, () => {
  titleListUpdate()
})
</script>

<style scoped lang="scss">
.library-content-title {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  .library-content-title-list {
    display: flex;
    align-items: center;
    >h3 {
      font-weight: 400;
      font-size: 20px;
      padding-right: 10px;
      transform: translateY(2px);
    }
    .library-content-item {
      span {
        font-size: 16px;
        padding: 2px 10px;
        border-radius: 30px;
        color: #ff3992;
        border: 1px solid #ff3992;
        margin-right: 5px;
      }
    }
  }
  .library-content-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 14px;
      color: #ff3992;
    }
  }
}
</style>
