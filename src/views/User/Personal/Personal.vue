<template>
  <div class="user-personal">
    <BackBar title="个人中心" route-link="/user" :is-route="true"></BackBar>
    <PersonalOptionsItem
      :name="item.name"
      :info="`${item.info}`"
      v-for="item in personalOptionsList"
    >
    </PersonalOptionsItem>
    <PersonalNickname
      name="昵称"
      :info="userInfo.nickname"
    >
    </PersonalNickname>
    <PersonalAvatar
      name="头像"
      :img-info="userInfo.picture">
    </PersonalAvatar>
    <PersonalPassword
      name="修改密码"
    >
    </PersonalPassword>
  </div>
</template>

<script setup>
import BackBar from "@/components/Common/BackBar.vue"
import PersonalOptionsItem from "@/components/User/Personal/PersonalOptionsItem.vue";
import PersonalNickname from "@/components/User/Personal/PersonalNickname.vue";
import PersonalPassword from "@/components/User/Personal/PersonalPassword.vue";
import PersonalAvatar from "@/components/User/Personal/PersonalAvatar.vue";
import { getUserInfo } from "@/api/user";
import { Snackbar } from "@varlet/ui";
import { ref } from "vue";

const userInfo = ref({})
const personalOptionsList = ref([
  { name: "id", info: "" },
  { name: "用户名", info: "" },
  { name: "邮箱", info: "" },
])

initUserInfo()

// 初始化用户信息
async function initUserInfo() {
  const res = await getUserInfo()
  if (res.status !== 200) {
    setTimeout(() => {
      Snackbar.error('请登录!')
      location.href = '/user'
    }, 100)
    return
  }
  userInfo.value = res.data

  let index = 0
  for (let key in res.data) {
    if (!(key === 'nickname' || key === 'picture')) {
      personalOptionsList.value[index].info = res.data[key]
      index++
    }
  }
}

</script>

<style scoped lang="scss">
.user-personal {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding-top: .8rem;
}
</style>
