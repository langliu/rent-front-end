import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login-Register/Login';
import Register from './views/Login-Register/Register';
import PersonalCenter from './views/User/Personal-Center';
import ChangePassword from './views/User/Change-Password';
import PostRentalInformation from './views/House-Rent/Post-Rental-Information';
import Index from './views/House-Rent/Index';
import Admin from './views/Admin/Admin';
import UserManagement from './views/Admin/User-Management';
import LeaseManagement from './views/Admin/Lease-Management';
import AdvertAdd from './views/Admin/Advert-Add';
import Advert from './views/Admin/Advert';
import HouseInformation from './views/House-Rent/House-Information';

Vue.use(Router);

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
        },
        {
          path: 'index',
          name: 'index',
          component: Index,
        },
        {
          path: 'detail/:id',
          component: HouseInformation,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/user',
      name: 'userInfo',
      component: PersonalCenter,
    },
    {
      path: '/user/changePassword',
      name: 'changePassword',
      component: ChangePassword,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'users',
          name: 'userManagement',
          component: UserManagement,
        },
        {
          path: 'lease',
          name: 'leaseManagement',
          component: LeaseManagement,
        },
        {
          path: 'advertAdd',
          name: 'advertAdd',
          component: AdvertAdd,
        },
        {
          path: 'advert',
          name: 'advert',
          component: Advert,
        },
      ],
    },
    {
      path: '/',
      redirect: '/login',
    },
  ],
});
