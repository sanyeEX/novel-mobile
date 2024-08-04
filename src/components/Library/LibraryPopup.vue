<template>
  <div class="library-popup">
    <var-popup position="left" v-model:show="isPopup">
      <div class="library-popup-block">
        <div class="library-popup-item" v-for="(item, index) in optionsList">
          <h4>{{ item.name }}</h4>
          <div class="library-popup-list">
            <p
              v-for="className in item.list"
              :class="{'options-active': optionsIndex[index].options === className}"
              @click="onChange(className, index)"
            >{{ className }}</p>
          </div>
        </div>
      </div>
      <div class="library-btn">
        <button @click="reset">重置</button>
      </div>
    </var-popup>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import emitter from "@/utils/emitter";

const route = useRoute()
const router = useRouter()

const isPopup = ref(false)
const optionsList = ref([
  {
    name: '作品文库',
    list: ['全部', '电击文库', '富士见文库', '角川文库', 'MF文库J', 'Fami通文库','GA文库','HJ文库','一迅社','集英社',
      '小学馆', '讲谈社', '少女文库', '其他文库', '游戏剧本']
  },
  {
    name: '写作进度',
    list: ['全部', '连载中', '已完结']
  },
  {
    name: '已动画化',
    list: ['全部','已动画化', '未动画化']
  },
  {
    name: 'Tags云集',
    list: ['全部','校园', '青春', '恋爱','治愈','群像','竞技','音乐','美食','旅行','欢乐向','经营','职场','斗智', '脑洞',
      '宅文化', '穿越', '奇幻', '魔法', '异能', '战斗', '科幻', '机战', '战争', '冒险', '龙傲天', '悬疑', '犯罪', '复仇',
      '黑暗', '猎奇', '惊悚', '间谍', '末日', '游戏', '大逃杀', '青梅竹马', '妹妹', '女儿', 'JK', 'JC', '大小姐', '性转',
      '伪娘', '人外', '后宫', '百合', '耽美', 'NTR', '女性视角']
  }
])

const optionsIndex = ref([
  {name: 'className', options: '全部'},
  {name: 'isSerial', options: '全部'},
  {name: 'isAnimation', options: '全部'},
  {name: 'classTags', options: '全部'},
])

const query = ref({})

// 接收libraryHeader的筛选按钮事件
emitter.on('popupShow', (show) => {
  isPopup.value = show
})

onMounted(() => {
  const queryInfo = route.query
  // popup状态选项保存
  for (let key in queryInfo) {
    optionsIndex.value.forEach((item, index) => {
      if (key === item.name) {
        if (key === 'isSerial') {
          optionsIndex.value[index].options = parseInt(queryInfo[key]) === 1 ? '连载中' : '已完结'
        } else if (key === 'isAnimation') {
          optionsIndex.value[index].options = parseInt(queryInfo[key]) === 1 ? '已动画化' : '未动画化'
        } else {
          optionsIndex.value[index].options = queryInfo[key]
        }
      }
    })
    query.value[key] = queryInfo[key] // 初始化导航栏上面的默认筛选参数
  }
})

function onChange(name, index) {
  let newName = name
  // 把连载中 或 已完结 改为 0 和 1
  if (newName === '连载中' || newName === '已动画化') {
    newName = 1
  } else if (newName === '已完结' || newName === '未动画化') {
    newName = 0
  }

  // 追加关键词给query
  query.value[optionsIndex.value[index].name] = newName
  if (newName === '全部') {
    for (let key in query.value) {
      delete query.value[optionsIndex.value[index].name]
    }
  }

  router.push({
    path: '/library',
    query: query.value
  })
  optionsIndex.value[index].options = name // 改变选项
  isPopup.value = false
}
// 重置
function reset() {
  optionsIndex.value.forEach(item => {
    item.options = '全部'
  })
  router.push({
    path: '/library',
  })
  query.value = {}
  isPopup.value = false
}
</script>

<style scoped lang="scss">
.library-popup-block {
  padding: 15px 15px 50px 15px;
  width: 450px;
  .library-popup-item {
    >h4 {
      font-weight: 400;
      font-size: 22px;
    }
    .library-popup-list {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 0;
      p {
        padding: 10px 20px;
        margin: 2px 0;
        font-size: 20px;
        color: #333;
        border-radius: 4px;
      }
    }
  }
}
.library-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 450px;
  button {
    width: 100%;
    height: 50px;
    font-size: 20px;
    background-color: #ff3992;
    color: #fff;
    border: none;
  }
}
.options-active {
  background-color: #ff3992;
  color: #fff !important;
}
</style>
