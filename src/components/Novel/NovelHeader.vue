<template>
  <div class="novel-header" v-if="props.picUrl">
    <div class="novel-header-pic">
      <img :src="picUrl()" class="shadow" alt="" >
    </div>
    <div class="novel-header-info">
      <div class="novel-header-top">
        <div class="novel-header-name">
          {{ props.name }}
        </div>
        <div class="novel-header-author">
          {{ props.author }}
        </div>
      </div>
      <div class="novel-header-bottom">
        <div class="novel-header-isSerial">
          {{ props.isSerial === true ? '连载中' : '完结' }}
        </div>
        <div class="novel-header-className">
          {{ props.className }}
        </div>
        <div class="novel-header-isAnimation">
          {{ props.isAnimation === true ? '动画化' : '未动画化' }}
        </div>
      </div>
    </div>
    <div class="novel-header-bj">
      <div class="bj" :style="{ background: `url('${picUrl()}') center / cover no-repeat` }"></div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()

const storePicUrl = computed(() => store.state.picUrl)

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  picUrl: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  isSerial: {
    type: Boolean,
    default: true
  },
  className: {
    type: String,
    default: ''
  },
  isAnimation: {
    type: Boolean,
    default: true
  },
})

// 处理图片链接
function picUrl() {
  return `${storePicUrl.value}${props.id}/${props.picUrl}`
}
</script>

<style scoped lang="scss">
.novel-header {
  display: flex;
  position: relative;
  padding: 50px 25px 0 25px;
  .novel-header-pic {
    position: relative;
    z-index: 11;
    transform: translateY(20px);
    img {
      width: 140px;
      height: 200px;
      object-fit: cover;
    }
  }
  .novel-header-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    z-index: 11;
    padding: 0 0 10px 10px;
    color: #fff;
    .novel-header-top {
      .novel-header-name {
        font-size: 24px;
        font-weight: 500;
        letter-spacing: 1px;
        text-shadow: 0 0 30px #000;	//设置发光效果
      }
      .novel-header-author {
        font-size: 20px;
        text-shadow: 0 0 30px #000;	//设置发光效果
        padding-top: 10px;
      }
    }
    .novel-header-bottom {
      display: flex;
      padding: 12px 0 10px 0;
      >div {
        padding-right: 15px;
        font-size: 17px;
        text-shadow: 0 0 30px #000;	//设置发光效果
      }
    }
  }
  .novel-header-bj {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    .bj {
      width: 100%;
      height: 100%;
      filter: blur(40px);
      transform: scale(1.1);
    }
  }
}
</style>
