<template>
  <div class="list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="items" v-for="item in items" @click="onClick">{{ item }}</div>
    </van-list>
  </div>
</template>

<script setup>
import {ref} from "vue";

const loading = ref(false)
const finished = ref(false)
const items = ref([])

function onClick() {
  console.log(document.querySelector('.list').scrollTop);
}

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      items.value.push(items.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (items.value.length >= 500) {
      finished.value = true;
    }
  }, 1000)
  console.log('load')
}
</script>

<style scoped lang="scss">
.list {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}
.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #d1d1d1;
}
</style>
