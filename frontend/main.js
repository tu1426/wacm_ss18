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
import DataComponent from './components/DataComponent.vue';
import NewDataComponent from './components/NewDataComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';
import ResearchRegisterComponent from './components/ResearchRegisterComponent.vue';
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
    beforeRouteUpdate (to, from, next) {
      if(!UserService.isAuthenticated()){
        next('/login');
      } else{
        next();
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
  },
  {
    name: 'RegisterComponent',
    path: '/register',
    component: RegisterComponent,
    beforeRouteUpdate (to, from, next) {
      if(UserService.isAuthenticated()){
        next('/home');
      } else{
        next();
      }
    }
  },
  {
    name: 'ResearchRegisterComponent',
    path: '/registerResearch',
    component: ResearchRegisterComponent,
    beforeRouteUpdate (to, from, next) {
      if(UserService.isAuthenticated()){
        next('/home');
      } else{
        next();
      }
    }
  },
  {
    name: 'DataComponent',
    path: '/data',
    component: DataComponent,
    beforeRouteUpdate (to, from, next) {
      if(!UserService.isAuthenticated()){
        next('/login');
      } else{
        next();
      }
    }
  },
  {
    name: 'NewDataComponent',
    path: '/newData',
    component: NewDataComponent,
    beforeRouteUpdate (to, from, next) {
      if(!UserService.isAuthenticated()){
        next('/login');
      } else{
        next();
      }
    }
  }
];

export var router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
