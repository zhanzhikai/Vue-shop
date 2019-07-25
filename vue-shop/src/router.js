import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/login.vue'
import Home from './views/home/Home.vue'
import Welcome from './components/Welcome.vue'
// import Users from './components/user/Users.vue'
import User from './components/user'
import Rights from './components/power/Rights'
import Roles from './components/power/Roles'
import Goods from './components/goods/Cate.vue'
import Params from './components/params/index.vue'
import List from './components/goods/List.vue'
import Add from './components/goods/Add.vue'
import Report from './components/report/Report.vue'
Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                // { path: '/users', component: Users },
                { path: '/users', component: User },
                { path: '/rights', component: Rights },
                { path: '/roles', component: Roles },
                { path: '/categories', component: Goods },
                { path: '/params', component: Params },
                { path: '/goods', component: List },
                { path: '/goods/add', component: Add },
                { path: '/reports', component: Report },

            ]
        }
    ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转

    if (to.path === '/login') return next()
        // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router