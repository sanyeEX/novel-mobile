<template>
  <div class="novel-btn">
    <div class="novel-collect-btn" @click="addCollectFun">
      <star theme="outline" size="24" :fill="isCollect ? '#ff3992' : '#333'" strokeLinejoin="bevel" strokeLinecap="square"/>
      <span :class="{ 'novel-color': isCollect }">收藏</span>
    </div>
    <div class="novel-star-btn">
      <var-button type="primary" color="#ff3992" @click="onRead">开始阅读</var-button>
    </div>
  </div>
</template>

<script setup>
import { Star } from "@icon-park/vue-next";
import { Dialog } from '@varlet/ui'
import { addCollect, addHistory, cancelCollect, getUserCollect } from "@/api/novel";
import {onMounted, ref} from "vue";
import { Snackbar } from "@varlet/ui";
import {useRouter} from "vue-router";

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  chapter_id: {
    type: Number,
    default: 0
  }
})

const isCollect = ref(false)
const isLogin = ref(false)

const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    isUserCollect()
  }
})

// 判断用户是否已经收藏
async function isUserCollect() {
  const res = await getUserCollect()
  // 判断用户是否登录
  if (res.status === 401) return isLogin.value = false
  if (res.status !== 200 && res.status !== 401 && res.status !== 204) return Snackbar.error(res.message)

  if (res.data.length !== 0) {
    isCollect.value = res.data.collectIds.some(item => parseInt(item) === parseInt(props.id))
  }

  isLogin.value = true
}
// 添加或取消收藏
async function addCollectFun() {
  // 判断是否登录
  if (!isLogin.value) {
    Snackbar.warning('请登录!')
    setTimeout(() => {
      router.push('/user')
    }, 500)
    return
  }
  if (!isCollect.value) {
    // 添加收藏
    await collectResult('是否确认收藏当前小说', addCollect, true)
  } else {
    // 取消收藏
    await collectResult('是否取消确认收藏当前小说', cancelCollect, false)
  }
}
// 弹出框
async function collectResult(message, fun, flag) {
  await Dialog({
    title: '确认',
    message,
    confirmButtonTextColor: "#ff3992",
    cancelButtonTextColor: "#ff3992",
    closeOnClickOverlay: false,
    // 按下确认或取消按钮
    async onBeforeClose(action) {
      if (action === 'confirm') {
        const res = await fun(props.id)
        if (res.status !== 200) return Snackbar.error(res.message)

        Snackbar.success(res.message)
        setTimeout(async () => {
          // 收藏按钮颜色变化
          isCollect.value = flag
          // 关闭窗口
          await Dialog.close()
        })
      } else {
        // 关闭窗口
        await Dialog.close()
      }
    }
  })
}
// 开始阅读
async function onRead() {
  // 添加历史浏览
  const res = await addHistory(props.id)
  if (res.status !== 200 && res.status !== 401) return Snackbar.error(res.message)
  // 跳转网页
  window.location.href = `/read/${props.chapter_id}`
}

</script>

<style scoped lang="scss">
.novel-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  padding: 10px 25px;
  align-items: center;
  background-color: #fff;
  z-index: 999;
  .novel-collect-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    span {
      white-space: nowrap;
      font-size: 16px;
      padding-top: 2px;
    }
  }
  .novel-star-btn {
    width: 100%;
    padding-left: 20px;
    :deep(.var-button) {
      width: 100%;
    }
  }
}
.novel-color {
  color: #ff3992;
}
</style>
