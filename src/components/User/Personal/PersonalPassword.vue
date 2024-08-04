<template>
  <div class="personal-avatar-item">
    <div class="personal-avatar-content" v-ripple="{ color: '#aaa' }" @click.stop="show = true">
      <div class="personal-avatar-left">
        <span class="user-picture">{{ name }}</span>
      </div>
      <div class="personal-avatar-right">
        <right theme="outline" size="0.4rem" fill="#555" strokeLinejoin="bevel" strokeLinecap="square"/>
      </div>
    </div>
    <var-dialog
      title="昵称修改"
      v-model:show="show"
      confirm-button-text-color="#ff3992"
      cancel-button-text-color="#ff3992"
      @before-close="onChangePwd"
      :closeOnClickOverlay="false"
    >
      <div class="personal-dialog">
        <var-input
          type="password"
          ref="oldPassword"
          placeholder="请输入旧密码"
          :rules="[v => !!v || '用户名不能为空']"
          v-model="formData.oldPassword"
          focus-color="#ff3992"
        />
        <var-input
          type="password"
          ref="newPassword"
          placeholder="请输入新密码"
          :rules="[v => !!v || '新密码不能为空']"
          v-model="formData.newPassword"
          focus-color="#ff3992"
        />
        <var-input
          type="password"
          ref="confirmPassword"
          placeholder="确认密码"
          :rules="[v => !!v || '确认密码不能为空']"
          v-model="formData.confirmPassword"
          focus-color="#ff3992"
        />
      </div>
    </var-dialog>
    <ResultDialog :show="isResultDialog" description="您的密码已经修改成功了!!"></ResultDialog>
  </div>
</template>

<script setup>
import { Right } from "@icon-park/vue-next";
import ResultDialog from "@/components/Common/ResultDialog.vue";
import { updatePwd } from "@/api/user";
import {ref} from "vue";
import {Snackbar} from "@varlet/ui";

const props = defineProps({
  name: {
    type: String,
    default: ""
  },
})

const formData = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
})
const show = ref(false)
const isResultDialog = ref(false)

async function onChangePwd(action) {
  if (action === 'confirm') {
    const pwdForm = formData.value
    // 判断新密码个确认密码是否正确
    if (pwdForm.newPassword !== pwdForm.confirmPassword) return Snackbar.error('新密码和确认密码不一致')
    // 请求更改密码
    const res = await updatePwd(pwdForm.oldPassword, pwdForm.newPassword)
    if (res.status !== 200) return Snackbar.error(res.message)
    setTimeout(() => {
      show.value = false
      isResultDialog.value = true
    }, 400)
  } else {
    show.value = false
  }
}
</script>

<style scoped lang="scss">
.personal-avatar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  :deep(.personal-avatar-right) {
    display: flex;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    span {
      padding-left: 15px;
    }
    .personal-avatar-info {
      font-size: 20px;
      color: #555;
    }
  }
}
.personal-avatar-item {
  .personal-dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 0;
  }
  :deep(.var-uploader) {
    width: unset;
  }
  :deep(.var-form-details) {
    display: none;
  }
  :deep(.var-image) {
    width: 80px;
    height: 80px;
    box-shadow: 0 3px 1px -2px var(--shadow-key-umbra-opacity), 0 2px 2px 0 var(--shadow-key-penumbra-opacity), 0 1px 5px 0 var(--shadow-key-ambient-opacity);
    img {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
