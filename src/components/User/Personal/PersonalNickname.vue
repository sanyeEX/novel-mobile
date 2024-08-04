<template>
  <div class="personal-options-item">
    <div class="personal-options-content" v-ripple="{ color: '#aaa' }" @click.stop="show = true">
      <div class="personal-options-left">
        <span class="user-picture">{{ name }}</span>
      </div>
      <div class="personal-options-right">
        <span class="personal-options-info">{{ info }}</span>
        <right theme="outline" size="0.4rem" fill="#555" strokeLinejoin="bevel" strokeLinecap="square"/>
      </div>
    </div>
    <var-dialog
      title="昵称修改"
      v-model:show="show"
      confirm-button-text-color="#ff3992"
      cancel-button-text-color="#ff3992"
      @confirm="onChangeNickname"
      :close-on-click-overlay="false"
    >
      <var-input placeholder="请输入新的昵称" v-model="value" focus-color="#ff3992" text-color="#000" />
    </var-dialog>
    <ResultDialog :show="isResultDialog" description="您的昵称已经修改成功了!!"></ResultDialog>
  </div>
</template>

<script setup>
import { Right } from "@icon-park/vue-next";
import { updateUserInfo } from "@/api/user";
import ResultDialog from "@/components/Common/ResultDialog.vue";
import {ref, watch} from "vue";
import {Snackbar} from "@varlet/ui";

const props = defineProps({
  name: {
    type: String,
    default: ""
  },
  info: {
    type: String,
    default: ""
  },
})

const show = ref(false)
const value = ref("")
const isResultDialog = ref(false)

// 发起修改昵称请求
async function onChangeNickname() {
  if (!value.value) return Snackbar.warning('输入框不能为空')
  const res = await updateUserInfo(value.value)
  if (res.status !== 200) return Snackbar.error(res.message)
  setTimeout(() => {
    isResultDialog.value = true
  }, 400)
}

watch(() => props.info, () => {
  value.value = props.info
})
</script>

<style scoped lang="scss">
.personal-options-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  :deep(.personal-options-right) {
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
    .personal-options-info {
      font-size: 20px;
      color: #555;
    }
  }
}
</style>
