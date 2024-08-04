<template>
  <div class="search-popular">
    <div class="search-popular-title">
      热门搜索
    </div>
    <div class="search-popular-list">
      <div class="search-popular-item" v-for="(item, index) in popularList" :key="index" @click="onSearch(item)">
        <span>{{ index+1 }}</span>
        &nbsp;
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import emitter from "@/utils/emitter";
import {ref} from "vue";

const popularList = ref([
  '继母的拖油瓶是我的前女友',
  '关于我在无意间被隔壁的天使变成废柴这件事',
  '欢迎来到实力至上主义的教室',
  '小书痴的下克上～为了成为图书管理员不择手段～',
  '魔王学院的不适任者',
  '青梅竹马绝对不会输的恋爱喜剧',
  '安达与岛村',
  '傲娇反派千金莉洁洛特与实况主远藤同学及解说员小林同学',
  '转生公主与天才千金的魔法革命',
  '熊熊勇闯异世界'
])

function onSearch(value) {
  emitter.emit('onSearch', value)
}
</script>

<style scoped lang="scss">
.search-popular {
  padding: 10px 12px;
  .search-popular-title {
    font-size: 22px;
    color: #444;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .search-popular-list {
    display: flex;
    flex-wrap: wrap;
    .search-popular-item {
      width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 10px 5px;
      color: #333;
      span {
        font-size: 20px;
      }
    }
    .search-popular-item:nth-child(-n+3) {
      span:nth-child(1) {
        color: red;
      }
    }
  }
}
</style>
