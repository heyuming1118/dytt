import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home')
  },
  {
    path: '/movieList',
    name: 'movieList',
    component: () => import(/* webpackChunkName: "about" */ '../views/MovieList'),
    children:[
      {
        path:'city',
        component:() =>import(/* webpackChunkName: "about" */ '../components/City')
      },
      {
        path:'nowPlay',
        component:() =>import(/* webpackChunkName: "about" */ '../components/NowPlay')
       
      },
      {
        path:'morrow',
        component:() =>import(/* webpackChunkName: "about" */ '../components/Morrow')
      },
      {
        path:'select',
        component:() =>import(/* webpackChunkName: "about" */ '../components/Select')
      },
      {
        path:'/movieList',
        redirect: '/movieList/nowPlay'
      },
    ]
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import(/* webpackChunkName: "about" */ '../views/Personal')
  },
    {
      path:'/ciList',
      name:'ciList',
      component:() =>import(/* webpackChunkName: "about" */ '../components/CiList'),
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
