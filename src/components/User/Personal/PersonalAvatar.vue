<template>
  <div class="personal-avatar-item">
    <div class="personal-avatar-content" v-ripple="{ color: '#aaa' }" @click.stop="show = true">
      <div class="personal-avatar-left">
        <span class="user-picture">{{ name }}</span>
      </div>
      <div class="personal-avatar-right">
        <img :src="imgInfo" alt="">
        <right theme="outline" size="0.4rem" fill="#555" strokeLinejoin="bevel" strokeLinecap="square"/>
      </div>
    </div>
    <var-dialog
      title="昵称修改"
      v-model:show="show"
      confirm-button-text-color="#ff3992"
      cancel-button-text-color="#ff3992"
      @confirm="onChangeAvatar"
      :close-on-click-overlay="false"
    >
      <div class="personal-dialog">
        <var-uploader
          v-model="files"
          :maxlength="1"
          :maxsize="1024 * 1024 * 2"
          @oversize="uploadInfo"
        />
        <var-image :src="imgInfo" />
      </div>
    </var-dialog>
    <ResultDialog :show="isResultDialog" description="您的头像已经修改成功了!!"></ResultDialog>
  </div>
</template>

<script setup>
import { Right } from "@icon-park/vue-next";
import { updateAvatar } from "@/api/user";
import ResultDialog from "@/components/Common/ResultDialog.vue";
import {computed, ref} from "vue";
import {Snackbar} from "@varlet/ui";
import {useStore} from "vuex";

const props = defineProps({
  name: {
    type: String,
    default: ""
  },
  imgInfo: {
    type: String,
    default: "picture.jpg"
  },
})

const show = ref(false)
const files = ref([])
const isResultDialog = ref(false)

// 确认修改头像
async function onChangeAvatar() {
  if (files.value.length === 0) return Snackbar.error('上传图片不能为空')

  const typeAry = ['.jpg', '.png', '.bmp', '.JPG', '.PNG', '.BMP', '.gif', '.GIF', '.jpeg', '.JPEG', '.webp', '.WEBP'];
  const type = files.value[0].name.substring(files.value[0].name.lastIndexOf('.'));
  const isImage = typeAry.indexOf(type) > -1;
  // 判断是否上传的是图片
  if (!isImage) {
    files.value = []
    return Snackbar.error('上传文件必须为图片')
  }
  // 拿到上传的文件
  const data = new FormData
  // 创建一个表单数据
  data.append("file", files.value[0].file)

  // 发起修改请求
  const res = await updateAvatar(data)
  if (res.status !== 200) return Snackbar.error(res.message)
  setTimeout(() => {
    isResultDialog.value = true
  }, 400)
}

// 上传大小限制
function uploadInfo() {
  Snackbar.warning('请选择图片上传(大小为180 * 180像素，支持JPG、PNG等格式，图片需小于2M)')
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
      object-fit: cover;
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
