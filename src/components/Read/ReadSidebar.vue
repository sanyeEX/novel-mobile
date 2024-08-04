<template>
  <div class="read-sidebar">
    <div class="read-sidebar-top" :class="{ 'read-sidebar-add': isSidebar }">
      <div class="read-sidebar-item">
        <div class="read-sidebar-left">
          <left theme="outline" size="24" fill="#fff" strokeLinejoin="bevel" strokeLinecap="square" @click.stop="$router.back()"/>
          <span>{{ chapterTitle }}</span>
        </div>
        <div class="read-sidebar-right">
          <config theme="outline" size="24" fill="#fff" strokeLinejoin="bevel" strokeLinecap="square" @click.stop="showPopover = !showPopover"/>
          <home theme="outline" size="24" fill="#fff" strokeLinejoin="bevel" strokeLinecap="square" @click.stop="onLink"/>
          <like theme="outline" size="24" fill="#fff" strokeLinejoin="bevel" strokeLinecap="square" @click.stop="addIsCollect" v-if="!isCollect"/>
          <like theme="outline" size="24" fill="#ff3992" strokeLinejoin="bevel" strokeLinecap="square" @click.stop="addIsCollect" v-else/>
        </div>
      </div>
      <div class="read-sidebar-site-box" v-show="showPopover">
        <div class="read-sidebar-site-color">
          <span v-for="color in backgroundColor" :style="{ backgroundColor: color }" @click.stop="onChangeColor(color)"></span>
        </div>
        <div class="read-sidebar-site-fontSize">
          <span>字体大小</span>
          <button @click.stop="onChangeFontSize(true)">放大</button>
          <button @click.stop="onChangeFontSize(false)">缩小</button>
        </div>
      </div>
    </div >
    <div class="read-sidebar-bottom" :class="{ 'read-sidebar-reduce': isSidebar }">
      <span @click.stop="onReplace(true)">上一章</span>
      <span @click.stop="onShowDirectory">目录</span>
      <span @click.stop="backNovel">书页</span>
      <span @click.stop="onReplace(false)">下一章</span>
    </div>
  </div>
</template>

<script setup>
import { Left, Config, Home, Like } from "@icon-park/vue-next"
import { getUserCollect, addCollect, cancelCollect } from "@/api/novel";
import {Dialog, Snackbar} from "@varlet/ui";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import emitter from "@/utils/emitter";

const showPopover = ref(false)
const backgroundColor = ref(['#d9caab', '#e6e1c3', '#cfb896', '#d0d1d3', '#1c8646', '#ffffff', '#dfd2ca', '#696969'])// 背景颜色更换
const isLogin = ref(false) // 是否登录
const isCollect = ref(false) // 是否收藏
const isSidebar = ref(false)

const props = defineProps({
  chapterIds: {
    type: Array,
    default: []
  },
  chapterTitle: {
    type: String,
    default: ''
  },
  novelId: {
    type: Number,
    default: 0
  }
})

const route = useRoute()
const router = useRouter()

const emit = defineEmits(['onChangeColor', 'onChangeFontSize', 'onShowDirectory'])

// 初始化小说是否被收藏
isUserCollect()

// 向父组件发送修改背景颜色的请求
function onChangeColor(color) {
  emit('onChangeColor', color)
}

// 发送给ReadContent组件修改字体大小请求
function onChangeFontSize(flag) {
  emitter.emit('onChangeFontSize', flag)
}
// 显示目录
function onShowDirectory() {
  emit('onShowDirectory')
}
// 更换章节
function onReplace(flag) {
  // 加载完成返回顶部
  setTimeout(() => {
    window.scrollTo({
      top: 0,
    })
  }, 0)
  const id = parseInt(route.params.id) // 获取当前章节id
  let currentIndex = props.chapterIds.map(ids => ids).indexOf(id) // 获取当前章节id所在章节ids集合位置

  // 判断是上一章还是下一章
  if (flag) {
    currentIndex--
  } else {
    currentIndex++
  }

  // 判断是否超出上下章节
  if (currentIndex < 0 || currentIndex > props.chapterIds.length - 1) return Snackbar.warning('章节为空')

  router.push({
    path: `/read/${props.chapterIds[currentIndex]}`,
  })
}
// 状态栏显示隐藏
function onShowSidebar(flag) {
  isSidebar.value = flag
}
// 返回小说页面
function backNovel() {
  window.location.href = `/novel/${props.novelId}`
}

// 判断用户是否已经收藏
async function isUserCollect() {
  const res = await getUserCollect()
  // 判断用户是否登录
  if (res.status === 401) return isLogin.value = false
  if (res.status !== 200 && res.status !== 401 && res.status !== 204) return
  if (res.data.length !== 0) {
    isCollect.value = res.data.collectIds.some(item => parseInt(item) === props.novelId)
  }
  isLogin.value = true
}

// 添加或取消收藏
async function addIsCollect() {
  // 判断是否登录
  if (!isLogin.value) {
    Snackbar.warning('请登录!')
    setTimeout(() => {
      window.location.href = '/user'
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
        const res = await fun(props.novelId)
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

// 跳转链接
function onLink() {
  window.location.href = '/'
}
defineExpose({
  onReplace,
  onShowSidebar
})
</script>

<style scoped lang="scss">
.read-sidebar-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0,0,0,.8);
  padding: 15px 25px;
  transition: .5s;
  .read-sidebar-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .read-sidebar-left {
      display: flex;
      align-items: center;
      span:nth-child(2) {
        color: #fff;
        padding-left: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;    //设置行数
        overflow: hidden;        //超出隐藏
      }
    }
    .read-sidebar-right {
      display: flex;
      :deep(span) {
        margin-left: 15px;
      }
    }
  }
  .read-sidebar-site-box {
    width: 100vw;
    display: flex;
    flex-direction: column;
    .read-sidebar-site-color {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      span {
        display: block;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .read-sidebar-site-fontSize {
      width: 100%;
      display: flex;
      align-items: center;
      color: #fff;
      margin-top: 20px;
      span {
        white-space: nowrap;
        padding-right: 20px;
      }
      button {
        background-color: transparent;
        outline: none;
        padding: 5px 40px;
        border: 1px solid #fff;
        margin: 0 10px;
        border-radius: 10px;
      }
    }
  }
}
.read-sidebar-bottom {
  position: fixed;
  bottom: -1px;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.8);
  transition: .5s;
  span {
    color: #fff;
    flex: 1;
    text-align: center;
    font-size: 18px;
    padding: 20px 25px;
  }
}
.read-sidebar-add {
  transform: translateY(-100%);
}
.read-sidebar-reduce {
  transform: translateY(100%);
}
</style>
