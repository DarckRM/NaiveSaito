import { createApp } from 'vue'
import router from './router'
import 'vfonts/Lato.css'
import store from './store/store'
import App from './App.vue'
import axios from './utils/request'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import naive from 'naive-ui';
// highlightjs 核心代码
import hljs from 'highlight.js/lib/core';
// 按需引入语言包
import md from 'highlight.js/lib/languages/markdown';

hljs.registerLanguage('markdown', md);

VMdPreview.use(githubTheme, {
  Hljs: hljs
});
const app = createApp(App)
app.use(store)
app.use(router)
app.use(naive)
app.use(VMdPreview)
app.mount('#app')
app.config.globalProperties.$axios = axios