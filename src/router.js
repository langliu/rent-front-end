import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login-Register/Login';
import Register from './views/Login-Register/Register';
import PersonalCenter from './views/User/Personal-Center';
import ChangePassword from './views/User/Change-Password';
import PostRentalInformation from './views/House-Rent/Post-Rental-Information';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'postRentalInformation',
          name: 'postRentalInformation',
          component: PostRentalInformation,
        }
      ]
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
    // {
    //   path: '/index/postRentalInformation',
    //   name: 'postRentalInformation',
    //   component: PostRentalInformation,
    // },
  ],
});
