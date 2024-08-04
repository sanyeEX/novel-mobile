<template>
  <div class="home-daily">
    <div class="home-daily-title">
      <div>每日更新</div>
      <router-link to="/library">
        <span>更多</span>
      </router-link>
    </div>
    <div class="home-daily-list">
      <div class="home-daily-item">
        <HomeList
          :id="item.id"
          :pic-url="item.picUrl"
          :name="item.name"
          :tags="item.classTags"
          :key="item.id"
          v-for="item in novelList[0]"
        >
        </HomeList>
      </div>
      <div class="home-daily-item">
        <HomeList
          :id="item.id"
          :pic-url="item.picUrl"
          :name="item.name"
          :tags="item.classTags"
          :key="item.id"
          v-for="item in novelList[1]"
        >
        </HomeList>
      </div>
      <var-loading type="wave" v-if="isLoading" color="#ff3992" />
    </div >
  </div>
</template>

<script setup>
import HomeList from "@/components/Home/HomeList.vue";
import { getNovelList } from "@/api/home";
import { onMounted, ref } from "vue";

const limit = ref(20)
const page = ref(1)
const novelList = ref([])
const isLoading = ref(true)

onMounted(() => {
  // 初始化每日推荐数据
  initNovelList()
})

// 初始化每日推荐数据
async function initNovelList() {
  const res = await getNovelList(limit.value, page.value)
  novelList.value = group(res.data.list, 10)
  setTimeout(() => {
    isLoading.value = false
  }, 0)
}

function group(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while(index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}
</script>

<style scoped lang="scss">
.home-daily {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 15px 15px 15px;
  .home-daily-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    div {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }
    span {
      font-size: 18px;
      color: #ff3992;
    }
  }
  .home-daily-list {
    overflow: scroll;
    .home-daily-item {
      display: flex;
      padding: 6px 0;
    }
  }
  .home-daily-list::-webkit-scrollbar {
    display: none;
  }
  /* 隐藏 IE、Edge 和 Firefox 的滚动条 */
  .home-daily-list {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
}
</style>
