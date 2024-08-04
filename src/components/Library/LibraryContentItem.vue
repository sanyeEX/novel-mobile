<template>
  <div class="library-content-item" @click.stop="onLink">
    <div class="library-content-img">
      <img v-lazy="picUrlSplice()" class="shadow" alt="">
    </div>
    <div class="library-content-info">
      <div class="library-content-top">
        <div class="library-content-name">
          {{ name }}
        </div>
        <div class="library-content-animation" v-if="isAnimation">
          动画化
        </div>
      </div>
      <div class="library-content-intro">
        {{ intro.toString().replace(/\s+/g, '') }}
      </div>
      <div class="library-content-bottom">
        <div class="library-content-author">
          {{ author }}
        </div>
        <div class="library-content-bottom-right">
          <div class="library-content-tags">
            <div class="library-content-tag" v-for="tag in tags" v-if="isTags">{{ tag }}</div>
            <div class="library-content-tag" v-for="tag in tagsSplice(tags)" v-else>{{ tag }}</div>
          </div>
          <div class="library-content-serial">
            {{ isSerial ? '连载中' : '已完结' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const router = useRouter()
const store = useStore()

const storePicUrl = computed(() => store.state.picUrl)

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
  isAnimation: {
    type: Boolean,
    default: false
  },
  intro: {
    type: Array,
    default: []
  },
  author: {
    type: String,
    default: ""
  },
  tags: {
    type: Array,
    default: []
  },
  isSerial: {
    type: Boolean,
    default: false
  },
  isTags: {
    type: Boolean,
    default: false
  }
})

// 处理图片链接
function picUrlSplice() {
  return `${storePicUrl.value}${props.id}/${props.picUrl}`
}

// 搜索区域tags 显示不正常
function tagsSplice(tags) {
  return tags.splice(0, 3)
}

// 跳转路由
function onLink() {
  router.push({
    path: `/novel/${props.id}`,
  })
}
</script>

<style scoped lang="scss">
.library-content-item {
  display: flex;
  padding: 15px 10px;
  border-bottom: 1px solid #eee;
  .library-content-img img {
    width: 120px;
    height: 180px;
    border-radius: 2px;
  }
  .library-content-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    .library-content-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .library-content-name {
        font-size: 22px;
        font-weight: 600;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;    //设置行数
        overflow: hidden;
      }
      .library-content-animation {
        white-space: nowrap;
        font-size: 18px;
        color: red;
        padding-left: 2px;
      }
    }
    .library-content-intro {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;    //设置行数
      overflow: hidden;        //超出隐藏
      font-size: 20px;
      color: #666;
    }
    .library-content-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .library-content-author {
        font-size: 18px;
        color: #666;
      }
      .library-content-bottom-right {
        display: flex;
        align-items: center;
        .library-content-tags {
          display: flex;
          border: 1px solid #ff3992;
          border-radius: 2px;
          padding: 0 2px;
          .library-content-tag {
            font-size: 16px;
            color: #ff3992;
            padding: 2px 0 2px 5px;
          }
        }
        .library-content-serial {
          font-size: 16px;
          color: #1E90FF;
          padding-left: 8px;
        }
      }
    }
  }
}
</style>
