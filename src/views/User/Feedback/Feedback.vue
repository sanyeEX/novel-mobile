<template>
  <div class="user-feedback">
    <BackBar title="意见反馈" route-link="/user" :is-route="true"></BackBar>
    <div class="feedback-form">
      <var-input placeholder="有什么意见或者建议,请通过意见反馈告诉我们" textarea v-model="value" focus-color="#ff3992" />
      <var-button type="primary" block color="#ff3992" class="user-feedback-btn">提交</var-button>
    </div>
  </div>
</template>

<script setup>
import BackBar from "@/components/Common/BackBar.vue";
import {ref} from "vue";
const value = ref()
</script>

<style scoped lang="scss">
.user-feedback {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: scroll;
  .feedback-form {
    padding: 0.8rem 20px;
  }
  .feedback-form-code {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #999;
    margin: 20px 0 40px 0;
    padding: 5px 0;
    input {
      width: 100%;
      border: none;
      outline: none;
      font-size: 20px;
    }
  }

}
.user-feedback-btn {
  margin-top: 20px;
}
</style>
