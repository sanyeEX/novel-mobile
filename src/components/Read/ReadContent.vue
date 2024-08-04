<template>
  <div class="read-content" v-if="isLoading">
    <h5>{{ chapterTitle }}</h5>
    <div class="read-content-list" :style="{ fontSize: `${fontSize}px` }">
      <p v-for="item in chapterContent.content">{{ item }}</p>
    </div>
    <div class="read-content-pic">
      <van-image
        width="100%"
        height="100%"
        lazy-load
        :src="picUrl(item)"
        v-for="item in chapterContent.pic_content"
        show-error
        alt="加载失败"
      >
        <template v-slot:error>图片加载失败</template>
      </van-image>
    </div>
  </div>
  <!--加载-->
  <div class="read-loading" v-else >
    <var-loading type="wave" color="#ff3992" />
  </div>
</template>

<script setup>
import emitter from "@/utils/emitter";
import {computed, ref} from "vue";
import {useStore} from "vuex";

const fontSize = ref(16)// 字体大小

const props = defineProps({
  chapterContent: {
    type: Object,
    default: {}
  },
  novelId: {
    type: Number,
    default: 0
  },
  chapterTitle: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const storageFontSize = localStorage.getItem('fontSize')
if (storageFontSize) {
  fontSize.value = storageFontSize
}

// 接收SlideBar组件发送过来的字体修改请求
emitter.on('onChangeFontSize', flag => {
  if (flag) {
    if (fontSize.value >= 28) return
    fontSize.value ++
    localStorage.setItem('fontSize', fontSize.value )
  } else {
    if (fontSize.value  <= 12) return
    fontSize.value --
    localStorage.setItem('fontSize', fontSize.value )
  }
})

const store = useStore()
const plateUrl = computed(() => store.state.plateUrl)

// 处理图片Url
function picUrl(url) {
  return `${plateUrl.value}${props.novelId}/${url}`
}

</script>

<style scoped lang="scss">
.read-content {
  h5 {
    font-size: 30px;
    letter-spacing: 4px;
    width: 100%;
    text-align: center;
    padding: 30px 18px;
    color: #000;
    font-weight: bold;
  }
  p {
    line-height: 45px;
    padding: 4px 18px;
    letter-spacing: 4px;
    word-break: break-all;
  }
}
.read-loading {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
:deep(.van-image__error) {
  padding: 20px 0;
  position: unset;
}
</style>
