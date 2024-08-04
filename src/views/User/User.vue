<template>
  <div id="user">
    <UserInfo
      :pic-url="userInfo.picture"
      :nickname="userInfo.nickname"
      :username="userInfo.username"
    />
    <UserOptions />
    <UserQuit :username="userInfo.username" />
    <var-popup position="right" v-model:show="loginShow">
      <div class="user-login-block">
        <div class="user-back" @click.stop="onBack">
          <close theme="outline" size="24" fill="#333" strokeLinejoin="bevel" strokeLinecap="square"/>
        </div>
        <UserLogin v-if="isShow"></UserLogin>
        <UserReg v-else></UserReg>
      </div>
    </var-popup>
    <BottomTab :active="2" />
  </div>
</template>

<script name="User" setup>
import UserInfo from "@/components/User/Home/UserInfo.vue";
import UserOptions from "@/components/User/Home/UserOptions.vue";
import UserQuit from "@/components/User/Home/UserQuit.vue";

import UserLogin from "@/components/User/Home/UserLogin.vue";
import UserReg from "@/components/User/Home/UserReg.vue";
import BottomTab from "@/components/Common/BottomTab.vue";

import { Close } from "@icon-park/vue-next";
import { getUserInfo } from "@/api/user";
import { ref, watch } from "vue";
import emitter from "@/utils/emitter";

import { useRoute, useRouter } from "vue-router";
import {Snackbar} from "@varlet/ui";

const route = useRoute()
const router = useRouter()

const loginShow = ref(true)
const isShow = ref(true)
const userInfo = ref({})

// 判断token是否存在
if (localStorage.getItem('token')) {
  loginShow.value = false
  initUserInfo()
}
monitorRoute()

// UserInfo子组件让登录或注册组件的显示与隐藏
emitter.on('loginShow', flag => {
  loginShow.value = flag
})

// 监听登录或注册的显示与隐藏
function monitorRoute() {
  const query = route.query
  if (query.isShow) {
    isShow.value = parseInt(query.isShow) === 1
  } else {
    isShow.value = true
  }
}
// 返回
function onBack() {
  loginShow.value = false
  router.push({
    path: '/user',
  })
}
// 获取用户信息
async function initUserInfo() {
  const res = await getUserInfo()
  if (res.status === 401) {
    loginShow.value = true
    localStorage.clear('token')
    return Snackbar.error('请重新登录')
  }
  if (res.status !== 200) return this.Snackbar.error(res.message)
  userInfo.value = res.data
}

watch(() => route.query, () => {
  monitorRoute()
})

</script>

<style scoped lang="scss">
.user-home {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: scroll;
  padding-bottom: var(--bottom-navigation-height);
}
.user-login-block {
  width: 100vw;
  height: 100vh;
  .user-back {
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px 20px;
    line-height: 1px;
    color: #333;
    span {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      font-size: 18px;
    }
  }
}
.user-quit {
  width: 100%;
  padding-top: 25px;
}
</style>
