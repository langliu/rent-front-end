import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

// Login and Register
import Login from './views/Login-Register/Login'
import Register from './views/Login-Register/Register'

// Rent
import PostRentalInformation from './views/House-Rent/Post-Rental-Information'
import Index from './views/House-Rent/Index'
import HouseInformation from './views/House-Rent/House-Information'

// Admin
import Admin from './views/Admin/Admin'
import UserManagement from './views/Admin/User-Management'
import LeaseManagement from './views/Admin/Lease-Management'
import AdvertAdd from './views/Admin/Advert-Add'
import Advert from './views/Admin/Advert'

// User
import User from './views/User/User'
import PersonalCenter from './views/User/Personal-Center'
import MyRelease from './views/User/My-Release'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'postRentalInformation',
          name: 'postRentalInformation',
          component: PostRentalInformation,
          beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem('token')) {
              next()
            } else {
              next('/login')
            }
          }
        },
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'detail/:id',
          component: HouseInformation
        },
        {
          path: 'user',
          component: User,
          beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem('token')) {
              next()
            } else {
              next('/login')
            }
          },
          children: [
            {
              path: 'info',
              component: PersonalCenter
            },
            {
              path: 'postRent',
              component: MyRelease
            }
          ]
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      },
      children: [
        {
          path: 'users',
          name: 'userManagement',
          component: UserManagement
        },
        {
          path: 'lease',
          name: 'leaseManagement',
          component: LeaseManagement
        },
        {
          path: 'advertAdd',
          name: 'advertAdd',
          component: AdvertAdd
        },
        {
          path: 'advert',
          name: 'advert',
          component: Advert
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
