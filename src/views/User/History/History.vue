<template>
  <div class="user-history">
    <BackBar title="历史浏览" route-link="/user" :is-route="true"></BackBar>
    <div class="history-content" :class="{'history-content-center': isNull}">
      <van-empty description="暂无浏览记录" v-if="isNull" />
      <div class="history-list" v-else>
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
            v-for="item in historyList"
          >
          </LibraryContentItem>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import BackBar from "@/components/Common/BackBar.vue";
import { isLogin } from "@/utils/isLogin";
import LibraryContentItem from "@/components/Library/LibraryContentItem.vue";
import {getUserCollect, getUserHistory} from "@/api/user";
import {onMounted, ref} from "vue";
import { Snackbar } from "@varlet/ui";

const isNull = ref(false)
const loading = ref(true)
const finished = ref(false)
const limit = ref(20)
const page = ref(1)
const historyList = ref([])

isLogin('请登录!', '/user')

onMounted(() => {
  initHistory()
})

// 初始化历史记录
async function initHistory() {
  const res = await getUserHistory(limit.value, page.value)
  if (res.status === 204) return isNull.value = true
  if (res.status !== 200 && res.status !== 403) return Snackbar.error('请登录!')

  if (res.data.list.length < limit.value) {
    finished.value = true
    loading.value = true
  }
  historyList.value = [...historyList.value, ...res.data.list]
  setTimeout(() => {
    loading.value = false
  }, 0)

}

// 下拉加载
function onLoad() {
  page.value++
  initHistory()
}
</script>

<style scoped lang="scss">
.history-content {
  background-color: #fff;
}
.history-content-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.history-list {
  padding-top: 0.8rem;
}
:deep(.van-empty) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
