<template>
  <div class="result-dialog">
    <var-popup :default-style="false" :show="show">
      <var-result class="result" :type="type" :title="title" :description="description">
        <template #footer>
          <var-button type="success" @click="onReload">知道了</var-button>
        </template>
      </var-result>
    </var-popup>
  </div>
</template>

<script>
export default {
  name: "ResultDialog",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "success",
    },
    title: {
      type: String,
      default: "成功",
    },
    description: {
      type: String,
      default: "提示",
    }
  },
  methods: {
    onReload() {
      location.reload()
    }
  }
}
</script>

<style scoped lang="scss">
:deep(.var-result__description) {
  padding: 0 40px;
}
</style>
