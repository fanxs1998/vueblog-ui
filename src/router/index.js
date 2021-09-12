import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/Login.vue')
const Blogs = () => import('@/views/blog/Blogs.vue')
const BlogDetail = () => import('@/views/blog/BlogDetail.vue')
const BlogEdit = () => import('@/views/blog/BlogEdit.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Blogs' }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
		meta: {
    	requireAuth: true
		}
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
		meta: {
			requireAuth: true
		}
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
