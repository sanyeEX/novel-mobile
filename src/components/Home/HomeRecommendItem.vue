<template>
  <div class="home-recommend-item" @click="onLink">
    <div class="home-recommend-img">
      <img class="shadow" alt="" :src="picUrlSplice()">
    </div>
    <div class="home-recommend-info">
      <div class="home-recommend-name">
        {{ name }}
      </div>
      <div class="home-recommend-author">
        {{ author }}
      </div>
      <div class="home-recommend-intro">
        {{ intro.toString().replace(/\s+/g, '') }}
      </div>
      <div class="home-recommend-tags">
        <div class="recommend-tag" v-for="(tag, index) in tags" :key="index">{{ tag }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {computed} from "vue";

const store = useStore()
const router = useRouter()

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  picUrl: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  author: {
    type: String,
    default: ""
  },
  intro: {
    type: Array,
    default: []
  },
  tags: {
    type: Array,
    default: []
  },
})

// 处理图片链接
function picUrlSplice() {
  const picUrl = computed(() => store.state.picUrl)

  return `${picUrl.value}${props.id}/${props.picUrl}`
}

// 跳转路由
function onLink() {
  setTimeout(() => {
    router.push(`/novel/${props.id}`)
  }, 0)
}
</script>

<style scoped lang="scss">
.home-recommend-item {
  flex-shrink: 0;
  width: calc(100% - 20px);
  height: 100%;
  display: flex;
  padding: 5px 0;
  .home-recommend-img {
    img {
      width: 150px;
      height: 210px;
      border-radius: 5px;
    }
  }
  .home-recommend-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 10px;
    .home-recommend-name {
      font-size: 20px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;    //设置行数
      overflow: hidden;        //超出隐藏
    }
    .home-recommend-author {
      color: #666;
      font-size: 18px;
    }
    .home-recommend-intro {
      color: #333;
      font-size: 16px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;    //设置行数
      overflow: hidden;        //超出隐藏
    }
    .home-recommend-tags {
      display: flex;
      font-size: 16px;
      .recommend-tag {
        padding-right: 5px;
        color: #ff3992;
      }
    }
  }
}
</style>
