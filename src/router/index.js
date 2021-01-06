import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Category from "../views/Category";
import Theme from "../views/Theme";
import Register from "../views/Register";
import Profile from "../views/Profile";
import Post from "../views/Post";
import NewPost from "../views/NewPost";
import Dashboard from "../views/Dashboard";
import EditPost from "../views/EditPost";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/users/:user_id',
        name: 'Profile',
        component: Profile,
        props:true,
        meta:{
            auth: true
        }
    },
    {
        path: '/categories/:id',
        name: 'Categories',
        component: Category,
        props: true,
    },
    {
        path: '/categories/:category_id/themes/:theme_id',
        name: 'Themes',
        component: Theme,
        props: true,
    },
    {
        path: '/categories/:category_id/themes/:theme_id/posts/:post_id',
        name: 'Posts',
        component: Post,
        props: true,
    },
    {
        path: '/posts/new',
        name: 'NewPost',
        meta:{
            auth: true
        },
        component: NewPost,
        props: true,
    },
    {
        path: '/posts/:post_id/edit',
        name: 'EditPost',
        meta:{
            auth: true
        },
        component: EditPost,
        props: true,
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDash',
        meta:{
            auth: true,
            isAdmin: true,
        },
        component: Dashboard,
        props: true,
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.APP_URL,
  routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')

    if (to.matched.some(record => record.meta.auth) && !loggedIn) {
        next('/login')
        return
    }

    next()
})

export default router
