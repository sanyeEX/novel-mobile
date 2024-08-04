<template>
  <div class="library-back-top shadow" v-show="isTop" @click="onBackTop">
    <to-top theme="outline" size="24" fill="#ff3992" strokeLinejoin="bevel" strokeLinecap="square"/>
  </div>
</template>

<script setup>
import { ToTop } from "@icon-park/vue-next";
import {onMounted, ref} from "vue";

const isTop = ref(false)

onMounted(() => {
  // 监听页面滚动
  window.addEventListener('scroll', () => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    isTop.value = scrollTop >= 300;
  })
})
// 返回顶部
function onBackTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
</script>

<style scoped lang="scss">
.library-back-top {
  padding: 12px 8px;
  position: fixed;
  bottom: 140px;
  right: 25px;
  background-color: #fff;
}
</style>
