<template>
  <div class="user-collect">
    <BackBar title="我的收藏" route-link="/user" :is-route="true"></BackBar>
    <div class="collect-content">
      <van-empty description="暂无收藏数据!" v-if="isNull" />
      <div class="collect-list" v-else>
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
            v-for="item in novelList"
          >
          </LibraryContentItem>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isLogin } from "@/utils/isLogin";
import BackBar from "@/components/Common/BackBar.vue";
import LibraryContentItem from "@/components/Library/LibraryContentItem.vue";
import { getUserCollect } from "@/api/user";
import {onMounted, ref} from "vue";
import {Snackbar} from "@varlet/ui";

const limit = ref(20)
const page = ref(1)
const isNull = ref(false)
const finished = ref(false)
const loading = ref(true)
const novelList = ref([])

isLogin('请登录!', '/user')

onMounted(() => {
  // 初始化收藏数据
  initUserCollect()
})

// 获取收藏数据
async function initUserCollect() {
  const res = await getUserCollect(limit.value, page.value)
  if (res.status === 204) return isNull.value = true
  if (res.status !== 200 && res.status !== 403) return Snackbar.error('请登录!')

  if (res.data.list.length < limit.value) {
    finished.value = true
    loading.value = true
  }
  novelList.value = [...novelList.value, ...res.data.list]
  setTimeout(() => {
    loading.value = false
  }, 0)
}
// 下滑加载数据
function onLoad() {
  page.value++
  initUserCollect()
}

</script>

<style scoped lang="scss">
.user-collect {
  background-color: #fff;
}
.collect-list {
  padding-top: 0.8rem;
}
:deep(.van-empty) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
