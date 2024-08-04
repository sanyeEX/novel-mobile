import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

// rem适配
import "@/utils/rem"

// normalize.css
import "normalize.css/normalize.css"
import "@/assets/css/base.scss"

// varlet
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

// vant
import { List, Empty, Lazyload, Form, Field, CellGroup } from "vant";
import 'vant/lib/index.css';

// 监听 localStorage
import tool from './utils/tool.js'

app.use(store)
  .use(router)
  .use(Varlet)
  .use(List)
  .use(Empty)
  .use(Lazyload)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(tool)

app.mount('#app')
