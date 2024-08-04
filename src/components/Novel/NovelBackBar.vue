<template>
  <div class="novel-back">
    <var-app-bar :color="isTabColor ? '#fff' : 'transparent'" elevation="0">
      <template #left>
        <var-button
          color="transparent"
          text-color="#fff"
          round
          text
          @click="onBack"
        >
          <arrow-left theme="outline" size="0.35rem" :fill="isTabColor ? '#000' : '#fff'" strokeLinejoin="bevel" strokeLinecap="square"/>
        </var-button>
      </template>
      <template #right>
        <var-button
          color="transparent"
          text-color="#fff"
          round
          text
          @click="onLink"
        >
          <home theme="outline" size="0.35rem" :fill="isTabColor ? '#000' : '#fff'" strokeLinejoin="bevel" strokeLinecap="square"/>
        </var-button>
      </template>
    </var-app-bar>
  </div>
</template>

<script setup>
import { ArrowLeft, Home } from "@icon-park/vue-next";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const isTabColor = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop

    isTabColor.value = scrollTop >= 54;
  })
})

function onLink() {
  window.location.href = '/'
}


function onBack() {
  router.back()
}
</script>

<style scoped lang="scss">
.novel-back {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
}
:deep(.var-app-bar__toolbar) {
  height: 0.80rem;
}
</style>
