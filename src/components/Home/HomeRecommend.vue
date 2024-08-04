<template>
  <div class="home-recommend">
    <div class="home-recommend-title">
      <div>轻小说推荐</div>
    </div>
    <div class="home-recommend-list">
      <HomeRecommendItem
        :id="item.id"
        :pic-url="item.picUrl"
        :name="item.name"
        :author="item.author"
        :intro="item.intro"
        :tags="item.classTags"
        v-for="item in recommendList"
        :key="item.id"
      >
      </HomeRecommendItem>
      <var-loading type="wave" v-if="isLoading" color="#ff3992" />
    </div>
  </div>
</template>

<script setup>
import HomeRecommendItem from "@/components/Home/HomeRecommendItem.vue";
import { getNovelList } from "@/api/home";
import { onMounted, ref } from "vue";

const limit = ref(5)
const page = ref(1)
const recommendList = ref([])
const isLoading = ref(true)

onMounted(() => {
  // 初始化推荐
  initRecommend()
})

// 初始化推荐
async function initRecommend() {
  const res = await getNovelList(limit.value, page.value)
  recommendList.value = res.data.list
  setTimeout(() => {
    isLoading.value = false
  }, 0)
}
</script>

<style scoped lang="scss">
.home-recommend {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 15px 15px 15px;
  .home-recommend-title {
    display: flex;
    align-items: center;
    padding: 10px 0;
    div {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }
  }
  .home-recommend-list {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: scroll;
  }
  .home-recommend-list::-webkit-scrollbar {
    display: none;
  }
  /* 隐藏 IE、Edge 和 Firefox 的滚动条 */
  .home-recommend-list {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
}
</style>
