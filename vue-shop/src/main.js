import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'


// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/api/private/v1/'
    // 在request  拦截器中 展示进度条 NProgress.start();
axios.interceptors.request.use(config => {
        // console.log(config)
        NProgress.start();
        config.headers.Authorization = window.sessionStorage.getItem('token')
            // 在最后必须 return config
        return config
    })
    // 在response 拦截器中 隐藏进度条
axios.interceptors.response.use(config => {

    NProgress.done();
    return config
})


Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
    // 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

import moment from 'moment'
Vue.filter('dateFormat', originVal => moment(originVal).format('YYYY-MM-DD,hh:mm:ss'))

Vue.component('tree-table', TreeTable)


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')