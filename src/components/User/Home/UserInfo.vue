<template>
  <div class="user-info">
    <div class="user-pic">
      <img src="https://sanye-1256143046.cos.ap-guangzhou.myqcloud.com/jiabaili.jpg" alt="" v-if="!picUrl">
      <img :src="picUrl" alt="" v-else>
    </div>
    <div class="user-right">
      <div class="user-btn" v-if="!nickname" @click="onLoginShow">
        登录/注册
      </div>
      <div class="user-name-info" v-else>
        <div class="user-name">
          {{ nickname }}
        </div>
        <div class="user-username">
          用户名: {{ username }}
        </div>
      </div>
    </div>
    <div class="user-bj"
         :style="{ backgroundImage: picUrl ? `url(${picUrl}) !important` : '' }"></div>
  </div>
</template>

<script setup>
import emitter from "@/utils/emitter";

const props = defineProps({
  picUrl: {
    type: String,
    default: ""
  },
  nickname: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    default: ""
  },
})
// 显示登录页面
function onLoginShow() {
  emitter.emit('loginShow', true)
}
</script>

<style scoped lang="scss">
.user-info {
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  padding: 100px 25px 50px 25px;
  .user-pic {
    z-index: 10;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .user-right {
    padding-left: 15px;
    z-index: 10;
    .user-btn {
      font-size: 20px;
    }
    .user-name-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .user-name {
        font-size: 22px;
      }
      .user-username {
        font-size: 20px;
        padding-top: 10px;
        color: #333;
      }
    }
  }
}
.user-bj {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: url("https://sanye-1256143046.cos.ap-guangzhou.myqcloud.com/jiabaili.jpg") center / cover no-repeat;
  filter: blur(35px);
  transform: scale(1.1);
}
</style>
