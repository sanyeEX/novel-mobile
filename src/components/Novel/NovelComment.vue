<template>
  <div class="novel-comment">
    <div class="novel-comment-box">
      <div class="novel-comment-title">
        <span>热门评论</span>
        <span>共 {{ count }} 条评论</span>
      </div>
      <div class="novel-comment-content" @click="showPopup(true)" >
        <comment theme="outline" size="0.32rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square"/>
        <span>一起来评论吧 ~~</span>
      </div>
    </div>
    <div class="novel-comment-list">
      <NovelCommentItem
        :comment_id="item.id"
        :user-id="item.user_id"
        :content="item.comment_content"
        :time="item.createdAt"
        :praise="item.comment_praise"
        :reply-count="item.reply_count"
        :nickname="item.nickname"
        :pic-url="item.picture"
        v-for="item in commentList"
        @onShowReply="onShowReply"
      >
      </NovelCommentItem>
      <van-empty description="暂无评论" v-if="isNull" />
    </div>
    <var-popup position="bottom" v-model:show="isPopup">
      <div class="novel-comment-from">
        <div class="novel-comment-input">
          <textarea
            type="text"
            :placeholder="iptConfig.placeholder"
            v-model="commentValue"
            @input="changeValue"
            :style="{ height: `${inputHeight}px` }"
          >
          </textarea>
        </div>
        <div class="novel-comment-from-btn" @click="sendComment">
          <send theme="outline" size="0.35rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square"/>
          <span>{{ iptConfig.btnText }}</span>
        </div>
      </div>
    </var-popup>
    <var-popup position="right" v-model:show="isReply">
      <div class="novel-reply-box">
        <div class="novel-reply-title">
          <var-app-bar
            :title="`共有 ${ replyCount } 条评论`"
            color="#fff"
            elevation="0"
            text-color="#000"
            title-position="center"
            class="user-back"
          >
            <template #left>
              <var-button
                color="transparent"
                text-color="#fff"
                @click="isReply = false"
                round
                text
              >
                <close-small theme="outline" size=".35rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square"/>
              </var-button>
            </template>
          </var-app-bar>
        </div>
        <van-empty description="暂无回复" v-if="replyCount === 0" />
        <div class="novel-reply-list" ref="novelReplyList" v-else>
          <NovelCommentItem
            :user-id="item.user_id"
            :content="item.comment_content"
            :time="item.createdAt"
            :praise="item.comment_praise"
            :is-comment-count="false"
            :is-comment-reply="false"
            :nickname="item.nickname"
            :pic-url="item.picture"
            v-for="item in replyList"
          >
          </NovelCommentItem>
        </div>
        <div class="novel-comment-content" @click="showPopup(false)">
          <div class="novel-comment-reply">
            <comment theme="outline" size="0.32rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square"/>
            <span>评论回复</span>
          </div>
        </div>
      </div>
    </var-popup>
  </div>
</template>

<script setup>
import { Comment, Send, CloseSmall } from "@icon-park/vue-next";
import NovelCommentItem from "@/components/Novel/NovelCommentItem.vue";
import { addComment, getComment, getReplyComment, replyComment } from "@/api/novel";
import { onMounted, ref } from "vue";
import { Snackbar } from "@varlet/ui"

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
})

const iptConfig = ref({
  placeholder: '一起来评论吧 ~~',
  btnText: '发表评论'
})
const isPopup = ref(false)// 显示评论输入框
const isReply = ref(false) // 显示回复评论
const commentValue = ref('')// 评论内容
const inputHeight = ref(100)// 评论框高度
const isNull = ref(false)// 是否存在评论
const commentList = ref([])// 评论数据
const replyList = ref([])// 回复数据
const count = ref(0)// 一个有几条评论
const replyCount = ref(0)// 回复评论数量
const mainCommentId = ref(0)// 主评论id,
const flag = ref(true)

onMounted(() => {
  // 默认清除之前的数据
  commentList.value = []
  count.value = 0
  inputHeight.value = 100
  commentValue.value = ""
  // 获取数据
  initComment()
})

// textarea自适应高度
function changeValue(e) {
  const height = 500
  // 判断是否超出屏幕
  if (e.target.scrollHeight < window.innerHeight - height) {
    inputHeight.value = e.target.scrollHeight
  } else {
    inputHeight.value = window.innerHeight - height
  }

  // 判断是否存在评论内容
  if (commentValue.value.length === 0) {
    inputHeight.value = 100 // 重置评论框高度
  }
}

// 发表评论
async function sendComment() {
  // 进行回复评论和发表评论
  const res = flag.value ? await addComment(props.id, commentValue.value) : await replyComment(mainCommentId.value, commentValue.value)
  // 判断用户是否登录
  if (res.status === 401) {
    Snackbar.warning('请登录')
    setTimeout(() => {
      window.location.href = '/user'
    }, 500)
    return
  }
  if (res.status !== 200) return
  Snackbar.success(res.message)
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

// 初始化评论
async function initComment() {
  const res = await getComment(props.id)
  if (res.status !== 200) return Snackbar.warning("请登录")
  if (res.data.list.length === 0) return isNull.value = true
  isNull.value = false

  commentList.value = res.data.list
  count.value = res.data.count
}

// 显示popup
function showPopup(show) {
  if (show) {
    iptConfig.value = {
      placeholder: '一起来评论吧 ~~',
      btnText: '发表评论'
    }
  } else {
    iptConfig.value= {
      placeholder: '评论回复',
      btnText: '回复评论'
    }
  }

  isPopup.value = true
  flag.value = show
}

// 接收来自子组件NovelCommentItem 显示回复评论区的请求
async function onShowReply(id, count) {
  const res = await getReplyComment(id)
  if (res.status !== 200 && res.status !== 204) return Snackbar.error(res.message)
  replyList.value = res.data

  replyCount.value = count
  isReply.value = true
  mainCommentId.value = id
}
</script>

<style scoped lang="scss">
.novel-comment {
  .novel-comment-box {
    padding: 20px 25px;
    border-bottom: 1px solid #eee;
    .novel-comment-title {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }
    .novel-comment-content {
      display: flex;
      align-items: center;
      border-radius: 50px;
      border: 1px solid #eee;
      margin-top: 10px;
      padding: 10px 0;
      :deep(.i-icon) {
        padding: 0 10px 0 15px;
      }
      span {
        font-size: 18px;
        padding-right: 15px;
      }
    }
  }
}
.novel-comment-from {
  width: 100%;
  height: 100%;
  .novel-comment-input {
    background-color: #fff;
    padding: 10px 0;
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      padding: 10px 5px;
      resize: none;
    }
  }
  .novel-comment-from-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    :deep(.i-icon) {
      padding-right: 2px;
    }
    span {
      font-size: 22px;
    }
  }
}
.novel-reply-box {
  background-color: #ffffff;
  //overflow: scroll;
  width: 100vw;
  //height: 100vh;
  .novel-reply-title {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
  }
  .novel-reply-list {
    padding-top: .8rem;
  }
  .novel-comment-content {
    padding: 10px 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .novel-comment-reply {
    display: flex;
    align-items: center;
    border-radius: 50px;
    border: 1px solid #eee;
    padding: 10px 0;
    :deep(.i-icon) {
      padding: 0 10px 0 15px;
    }
    span {
      font-size: 18px;
      padding-right: 15px;
    }
  }
}
.novel-comment-list {
  padding-bottom: 20px;
}
:deep(.var-app-bar__toolbar) {
  height: 0.80rem;
}
:deep(.i-icon) {
  display: flex;
  align-items: center;
}

</style>
