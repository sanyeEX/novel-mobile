<template>
  <div class="user-reg">
    <div class="user-reg-title">
      <h4>注册</h4>
      <span>欢迎注册次元轻小说</span>
    </div>
    <div class="user-reg-from">
      <div class="user-reg-username">
        <input type="text" placeholder="用户名" v-model="formData.username">
      </div>
      <div class="user-reg-email">
        <input type="email" placeholder="邮箱" v-model="formData.email">
      </div>
      <div class="user-reg-password">
        <input type="password" placeholder="密码" v-model="formData.password">
      </div>
      <div class="user-reg-confirm">
        <input type="password" placeholder="确认密码" v-model="formData.confirmPwd">
      </div>
      <!-- <div class="user-reg-code">
        <input type="text" placeholder="验证码" v-model="formData.code">
        <div class="user-code" style="width: 150px; height: 35px" v-html="codeSvg" @click="initRegCode"></div>
      </div> -->
    </div>
    <div class="user-reg-forget">
      <span @click="onLoginShow">立即登录</span>
      <span @click="onLink">忘记密码</span>
    </div>
    <div class="user-reg-btn">
      <var-button type="primary" @click="onReg">注册</var-button>
    </div>
  </div>
</template>

<script setup>
import { getReg } from "@/api/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {Snackbar} from "@varlet/ui";

const formData = ref({
  username: "",
  email: "",
  password: "",
  confirmPwd: "",
  code: "text"
})

const router = useRouter()

// 显示登录
function onLoginShow() {
  router.push({
    path: '/user',
    query: {
      isShow: 1
    }
  })
}
// 进行注册
async function onReg() {
  const regInfo = formData.value
  for (let key in regInfo) {
    if (!regInfo[key]) {
      return Snackbar.error('用户名,邮箱,密码,确认密码,验证码不能为空')
    }
  }
  const userCheck = /^[a-zA-Z0-9]{4,16}$/;
  const pwdCheck = /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,20}$/;
  const emailCheck = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;

  // 验证用户信息
  if (!userCheck.test(regInfo.username)) return Snackbar.error('用户名长度4到16位不包含中文和特殊字符')
  if (!emailCheck.test(regInfo.email)) return Snackbar.error('邮箱不合法')
  if (!pwdCheck.test(regInfo.password)) return Snackbar.error('密码必须包含(字母和数字),长度6-20位')
  if (regInfo.password !== regInfo.confirmPwd) return Snackbar.error('两次输入的密码不一致，请检查！')

  const res = await getReg(regInfo)
  if (res.status !== 200) return Snackbar.error(res.message)
  setTimeout(() => {
    Snackbar.success('注册成功')
    onLoginShow()
  }, 100)
}

// 忘记密码
function onLink() {
  router.push('/user/forget')
}
</script>

<style scoped lang="scss">
.user-reg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .user-reg-title {
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
  .user-reg-from {
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
    .user-reg-code {
      display: flex;
      align-items: center;
      padding: 6px 0;
    }
  }
  .user-reg-forget {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    font-size: 20px;
    margin-bottom: 50px;
    color: #333;
  }
  .user-reg-btn {
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
}
</style>
