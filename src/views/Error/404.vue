<template>
  <div id="error">
    <div class="error-title">
      <p>404</p>
    </div>
    <div class="error-tips">
      <p>还有{{ time }}秒自动返回主页</p>
    </div>
    <div class="error-btn">
      <var-button @click="onBack">返回主页</var-button>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const time = ref(10)

onMounted(() => {
  setInterval(() => {
    if (time.value !== 0) {
      time.value--
    } else {
      window.location.href = '/home'
    }
  }, 1000)
})

function onBack() {
  window.location.href = '/home'
}
</script>

<style scoped lang="scss">
#error {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    padding: 20px 0;
  }
  .error-title p {
    font-size: 200px;
  }
  .error-tips p {
    font-size: 24px;
    color: #888888;
  }
}
</style>
