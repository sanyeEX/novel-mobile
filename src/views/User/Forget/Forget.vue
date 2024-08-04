<template>
  <div class="user-forgot-pwd">
    <BackBar title="忘记密码" route-link="/user" :is-route="true"></BackBar>
    <van-form @submit="onSubmit" ref="vanForm">
      <van-cell-group inset>
        <van-field
          v-model="email"
          name="pattern"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ pattern: pattern.email, message: '邮箱不合法' }]"
        />
        <van-field
          v-model="code"
          type="text"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请输入邮箱验证码' }]"
        >
          <template #button>
            <span @click="sendEmailCode" style="color: #000000">{{ btnText }}</span>
          </template>
        </van-field>
        <van-field
          v-model="password"
          type="password"
          name="pattern"
          label="新密码"
          placeholder="新密码"
          :rules="[{ pattern: pattern.password , message: '密码必须包含(字母和数字),长度6-20位' }]"
        />
        <van-field
          v-model="confirmPassword"
          type="password"
          name="validatorMessage"
          label="确认新密码"
          placeholder="确认新密码"
          :rules="[{ validator: validatorMessage }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <var-button block type="primary" color="#ff3992" @click="onSubmit" native-type="submit">修改密码</var-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import {forgetPassword, sendCode} from "@/api/user";
import BackBar from "@/components/Common/BackBar.vue";
import {ref} from "vue";
import {Snackbar} from "@varlet/ui";

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const code = ref('')
const pattern = ref({
  email: /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
  password: /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,20}$/
})
const btnText = ref('发送验证码')
const timer = ref(null)
const flag = ref(false)

// 发起修改密码请求
async function onSubmit(values) {
  if (values.isTrusted) return
  // 进行表单全部校验
  const res = await forgetPassword(email.value, password.value, code.value)
  if (res.status !== 200) return Snackbar.error(res.message)
  Snackbar.success(res.message)
  setTimeout(() => {
    window.location.reload()
  }, 500)
}
// 发送邮箱验证码
async function sendEmailCode() {
  // 判断邮箱是否为空
  if (email.value.length === 0) {
    Snackbar.error('邮箱不能为空')
    return
  }

  // 判断验证码倒计时是否为0
  if (flag.value) return
  // 发起获取验证码请求
  const res = await sendCode(email.value)
  if (res.status !== 200) return Snackbar.error(res.message)
  Snackbar.success(res.message)
  // 验证码倒计时
  let second = 60
  flag.value = true
  // 创建定时器
  timer.value = setInterval(() => {
    btnText.value = second--
    // 倒计时到0重置
    if (second === 0) {
      second = 60
      flag.value = false
      btnText.value = '发送验证码'
      clearInterval(timer.value)
    }
  }, 1000)
  console.log(res)
}
// 校验确认密码
function validatorMessage () {
  if (!pattern.value.password.test(confirmPassword.value)) return '密码必须包含(字母和数字),长度6-20位'
  if (password.value !== confirmPassword.value) return '两次输入的密码不一致，请检查！'
}
</script>

<style scoped lang="scss">
.user-forgot-pwd {
  padding-top: .8rem;
}
</style>
