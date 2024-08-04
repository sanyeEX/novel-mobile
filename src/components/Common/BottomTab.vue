<template>
  <div class="bottom-tab">
    <var-bottom-navigation :active="props.active" fixed safe-area active-color="#ff3992">
      <var-bottom-navigation-item
        :name="item.name"
        :label="item.name"
        :icon="item.icon"
        v-for="(item, index) in tabList"
        :key="index"
        @click="routerJump(item.url)"/>
    </var-bottom-navigation>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const tabList = ref([
  { name: '首页', icon: 'home', url: '/' },
  { name: '文库', icon: 'notebook', url: '/library' },
  { name: '我的', icon: 'account-circle', url: '/user' }]
)

const props = defineProps({
  active: {
    type: Number,
    default: 0
  }
})

function routerJump(url) {
  window.location.href = url
}
</script>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}
.bottom-tab {
  :deep(.var-bottom-navigation-item__label) {
    font-size: 12px !important;
  }
  :deep(.var-bottom-navigation--fixed) {
    z-index: 20 !important;
  }
}
</style>
