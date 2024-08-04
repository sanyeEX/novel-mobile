<template>
  <div class="novel-directory">
    <div class="novel-directory-content" @click="onPopupShow">
      <div class="novel-directory-title">
        <span>目录</span>
      </div>
      <div class="novel-directory-right">
        <div class="novel-directory-update">
          <span>{{ recentChapters }}</span>
        </div>
        <div class="novel-directory-icon">
          <right theme="outline" size="0.3rem" fill="#333" strokeLinejoin="bevel" strokeLinecap="square"/>
        </div>
      </div>
    </div>
    <var-popup position="right" v-model:show="isPopup">
      <div class="novel-directory-popup">
        <div class="novel-directory-back">
          <var-app-bar color="#fff" text-color="#000" elevation="0" title="目录" title-position="center">
            <template #left>
              <var-button
                color="transparent"
                text-color="#000"
                round
                text
                @click="isPopup = false"
              >
                <var-icon name="chevron-left" :size="24" />
              </var-button>
            </template>
          </var-app-bar>
        </div>
        <div class="novel-directory-list">
          <NovelDirectoryItem
            :name="item.roll_title"
            :roll-chapter-list="item.chapter_list"
            v-for="item in rollArr"
          >
          </NovelDirectoryItem>
        </div>
      </div>
      <var-loading type="wave" color="#ff3992" v-if="rollArr.length === 0" />
    </var-popup>
  </div>
</template>

<script setup>
import { Right } from "@icon-park/vue-next";
import NovelDirectoryItem from "@/components/Novel/NovelDirectoryItem.vue";
import {ref} from "vue";

const props = defineProps({
  recentChapters: {
    type: String,
    default: ""
  },
  rollArr: {
    type: Array,
    default: []
  }
})

const isPopup = ref(false)

function onPopupShow() {
  isPopup.value = true
}
</script>

<style scoped lang="scss">
.novel-directory {
  width: 100%;
  padding: 20px 25px;
  border: 1px solid #eee;
  border-left: none;
  border-right: none;
  font-size: 18px;
  .novel-directory-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .novel-directory-title span {
      white-space: nowrap;
      padding-right: 10px;
      font-weight: 600;
      font-size: 18px;
    }
    .novel-directory-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .novel-directory-update {
        span {
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;    //设置行数
          overflow: hidden;
          color: #666666;
          font-size: 17px;
        }
      }
      .novel-directory-icon {
        transform: translateY(1px);
      }
    }
  }
}

.novel-directory-popup {
  width: 100vw;
  .novel-directory-list {
    padding-top: 0.8rem;
  }
  .novel-directory-back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
  }
}


:deep(.var-app-bar__toolbar) {
  height: 0.80rem;
}
:deep(.i-icon) {
  display: flex;
  align-items: center;
}
</style>
