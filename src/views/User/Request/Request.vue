<template>
  <div class="user-request">
    <BackBar title="求书" route-link="/user" :is-route="true"></BackBar>
    <div class="user-request-content">
      <p>申请提交后,请您耐心等待,我们找到并添加后,会将结果通知给您!</p>
      <div class="user-request-form">
        <div class="user-request-input">
          <span>书名:</span>
          <input type="text" placeholder="请输入请小说名称">
        </div>
        <var-button type="primary" color="#ff3992">提交找书</var-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BackBar from "@/components/Common/BackBar.vue";
</script>

<style scoped>
.user-request-content {
  display: flex;
  flex-direction: column;
  padding: 2rem 20px 0 20px;
  >p {
    text-align: center;
    font-size: 18px;
    padding: 20px 0;
    color: #666;
  }
  .user-request-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    .user-request-input {
      padding: 15px;
      background-color: #f1f1f1;
      border-radius: 50px;
      margin-bottom: 20px;
      font-size: 18px;
      input {
        background-color: transparent;
        outline: none;
        border: none;
        padding-left: 10px;
      }
    }
  }
}
</style>
