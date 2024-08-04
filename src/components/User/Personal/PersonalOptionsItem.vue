<template>
  <div class="personal-options-item" v-ripple="{ color: '#aaa' }">
    <div class="personal-options-left">
      <span class="user-picture">{{ name }}</span>
    </div>
    <div class="personal-options-right">
      <span class="personal-options-info">{{ info }}</span>
    </div>
  </div>
</template>

<script setup>
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
</script>

<style scoped lang="scss">
.personal-options-item {
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
