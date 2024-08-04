<template>
  <div class="user-comment">
    <BackBar title="我的评论" route-link="/user" :is-route="true"></BackBar>
    <van-empty description="暂无评论数据!" />
  </div>
</template>

<script setup>
import BackBar from "@/components/Common/BackBar.vue";
import {isLogin} from "@/utils/isLogin";

isLogin('请登录!', '/user')
</script>

<style scoped lang="scss">
.user-comment {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
