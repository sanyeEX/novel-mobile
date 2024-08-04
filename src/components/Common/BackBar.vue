<template>
  <var-app-bar
    :title="title"
    :color="color"
    elevation="0"
    text-color="#000"
    :title-position="titlePosition"
    class="user-back"
  >
    <template #left>
      <var-button
        color="transparent"
        text-color="#fff"
        round
        text
        @click.stop="onLink"
      >
        <var-icon name="chevron-left" :size="24" color="#000" />
      </var-button>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </var-app-bar>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    default: "标题"
  },
  routeLink: {
    type: String,
    default: '/'
  },
  color: {
    type: String,
    default: '#fff'
  },
  titlePosition: {
    type: String,
    default: 'center'
  },
  isRoute: {
    type: Boolean,
    default: false
  },
})

// 跳转路由
function onLink() {
  if (props.isRoute) {
    router.push(props.routeLink)
  } else {
    window.history.back()
  }
}

</script>

<style scoped lang="scss">
:deep(.var-app-bar__toolbar) {
  height: 0.80rem;
}
.user-back {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
