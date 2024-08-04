<template>
  <div class="novel-info">
    <div class="novel-info-content">
      <div class="novel-info-basic">
        <div class="novel-info-wordCount">
          {{ countManage(props.wordCount) }}字
        </div>
        <em>|</em>
        <div class="novel-info-collect">
          {{  props.collect }} <span>收藏</span>
        </div>
        <em>|</em>
        <div class="novel-info-updateTime">
          最后更新时间: <span>{{ props.updateTime }}</span>
        </div>
      </div>

      <div class="novel-info-recentChapters">
        最新章节: <span @click="onLink">{{ props.recentChapters }}</span>
      </div>
      <div class="novel-info-tags">
        分类: <p v-for="tag in props.classTags">{{ tag }}</p>
      </div>
    </div>
    <div class="novel-intro">
      <p v-for="item in props.intro">{{ item.replace(/\s+/g, "") }}</p>
    </div>
  </div>
</template>

<script setup>
import { bigNumberTransform } from "@/utils/countManage"

const props = defineProps({
  wordCount: {
    type: String,
    default: ""
  },
  collect: {
    type: String,
    default: ""
  },
  updateTime: {
    type: String,
    default: ""
  },
  recentChapters: {
    type: String,
    default: ""
  },
  classTags: {
    type: Array,
    default: []
  },
  intro: {
    type: Array,
    default: []
  }
})
const emit = defineEmits(['onLink'])

// 处理文字
function countManage(value) {
  return bigNumberTransform(parseInt(value))
}

// 跳转链接
function onLink() {
  emit('onLink')
}
</script>

<style scoped lang="scss">
.novel-info {
  padding: 30px 25px 10px 25px;
  .novel-info-content {
    .novel-info-basic {
      display: flex;
      align-items: center;
      >div {
        color: #555;
        font-size: 20px;
      }
      em {
        font-style: normal;
        padding: 0 10px;
        transform: translateY(-2px);
      }
    }
    >div {
      padding: 8px 0;
      font-size: 20px;
    }
    .novel-info-recentChapters {
      font-weight: bold;
      font-size: 18px;
      color: #333333;
      span {
        font-weight: normal;
        color: #ff3992;
      }
    }
    .novel-info-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-weight: bold;
      font-size: 18px;
      color: #333333;
      p {
        padding: 5px 10px;
        background-color: #eee;
        color: #666;
        margin: 0 5px 2px 5px;
        font-size: 17px;
        border-radius: 4px;
      }
    }
  }
  .novel-intro {
    padding-top: 5px;
    p {
      text-indent: 30px;
      font-size: 18px;
      padding-bottom: 5px;
      line-height: 32px;
      color: #555;
      font-weight: 600;
    }
  }
}
</style>
