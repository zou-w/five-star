import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/admin/Home.vue')
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/admin/Welcome')
const Participants = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/admin/Appraisal/Participants')
const Recording = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/admin/Appraisal/Recording')
const Users = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/admin/Users/Users')
const Report = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/admin/report/Report')
const UserHome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/user/UserHome')
const Introduction = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/user/Introduction')
const Like = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/user/like/Like')
const Push = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/user/push/Push')
const AdminLogin = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/admin/AdminLogin')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin/login',
    component: AdminLogin
  },
  {
    path: '/admin/home',
    name: 'AdminHome',
    component: Home,
    redirect: '/admin/welcome',
    children: [
      { path: '/admin/welcome', component: Welcome },
      { path: '/admin/participants', component: Participants },
      { path: '/admin/recording', component: Recording },
      { path: '/admin/users', component: Users },
      { path: '/admin/reports', component: Report }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: UserHome,
    redirect: '/introduction',
    children: [
      { path: '/introduction', component: Introduction },
      { path: '/like', component: Like },
      { path: '/push', component: Push }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
