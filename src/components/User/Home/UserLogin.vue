<template>
  <div class="user-login">
    <div class="user-login-title">
      <h4>登录</h4>
      <span>欢迎登录次元轻小说</span>
    </div>
    <div class="user-login-from">
      <div class="user-login-username">
        <input type="text" placeholder="用户名" v-model="formData.username">
      </div>
      <div class="user-login-password">
        <input type="password" placeholder="密码" v-model="formData.password">
      </div>
    </div>
    <div class="user-login-forget">
      <span @click="onRegShow">立即注册</span>
      <span @click="onLink">忘记密码</span>
    </div>
    <div class="user-login-btn">
      <var-button type="primary" @click="onLogin">登录</var-button>
    </div>
  </div>
</template>

<script setup>
import { getLogin } from "@/api/user"
import {ref} from "vue";
import { useRouter } from "vue-router";
import { Snackbar } from "@varlet/ui";

const router = useRouter()

const formData = ref({
  username: "",
  password: "",
  code: "text"
})

// 进行登录
async function onLogin() {
  const loginInfo = formData.value
  if (!loginInfo.username || !loginInfo.password || !loginInfo.code) return Snackbar.error('用户名,密码,验证码不能为空')

  const userCheck = /^[a-zA-Z0-9]{4,16}$/;
  const pwdCheck = /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,20}$/;
  if (!userCheck.test(loginInfo.username)) return Snackbar.error('用户名长度4到16位不包含中文和特殊字符')
  if (!pwdCheck.test(loginInfo.password)) return Snackbar.error('密码必须包含(字母和数字),长度6-20位')

  // 发起登录请求
  const res = await getLogin(loginInfo.username, loginInfo.password, loginInfo.code)
  if (res.status !== 200) {
    Snackbar.error(res.message)
    return
  }
  setTimeout(() => {
    Snackbar.success(res.message)
    location.reload()
  }, 200)
  localStorage.setItem('token', res.data.token) // 保存token
}
// 显示注册
function onRegShow() {
  router.push({
    path: '/user',
    query: {
      isShow: 0
    }
  })
}

// 忘记密码
function onLink() {
  router.push('/user/forget')
}

</script>

<style scoped lang="scss">
.user-login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.user-login-title {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h4 {
    font-size: 40px;
    font-weight: 400;
    letter-spacing: 3px;
  }
  span {
    font-size: 20px;
    margin-top: 15px;
    color: #333;
  }
}
.user-login-from {
  width: 100%;
  padding: 0 50px;
  margin-top: 50px;
  >div {
    width: 100%;
    padding: 15px 0;
    border-bottom: 3px solid #e1e1e1;
    margin-top: 25px;
    >input {
      width: 100%;
      outline: none;
      background-color: transparent;
      border: none;
      padding-left: 10px;
      color: #000;
    }
  }
  .user-login-code {
    display: flex;
    align-items: center;
    padding: 6px 0;
  }
}
.user-login-forget {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  font-size: 20px;
  margin-bottom: 50px;
  color: #333;
}
.user-login-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  button {
    border: none;
    background-color: #ff3992;
    color: #fff;
    padding: 15px 100px;
    font-size: 20px;
    border-radius: 5px;
  }
}
</style>
