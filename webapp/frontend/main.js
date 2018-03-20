import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueLocalStorage from 'vue-localstorage';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueLocalStorage);

import App from './App.vue';
import HomeComponent from './components/HomeComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import UserService from './services/UserService';

const routes = [
  {
      path: '/',
      redirect: '/home'
  },
  {
      name: 'HomeComponent',
      path: '/home',
      component: HomeComponent,
      beforeRouteEnter (to, from, next) {
        if(UserService.isAuthenticated()){
          next();
        } else{
          next('/login');
        }
      }
  },
  {
      name: 'LoginComponent',
      path: '/login',
      component: LoginComponent,
      beforeRouteUpdate (to, from, next) {
        if(UserService.isAuthenticated()){
          next('/home');
        } else{
          next();
        }
      }
  }
];

export var router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
