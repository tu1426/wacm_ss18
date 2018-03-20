import Vue from 'vue';
import axios from 'axios';
import {router} from '../main';

export default {
  async login(username, password) {
    if(!this.isAuthenticated()) {
      return axios.post(`http://localhost:8080/api/user/login`, {username: username, password: password})
        .then(response => {
          if (!!response.data.success) {
            console.log('Authentication successful!');
            Vue.localStorage.set('WACM_auth_token', response.data.jwt);
            router.push('/home');
          } else {
            console.error('Response error message: ' + response.data.message);
            return Promise.reject(response.data.message);
          }
        })
        .catch(e => {
          console.error(e);
          return Promise.reject('Authentication failed!');
        })
    } else{
      router.push('/home');
    }
  },

  isAuthenticated() {
    if(!!Vue.localStorage.get('WACM_auth_token')){
      return true;
    } else{
      router.push('/login');
    }
  },

  logout() {
    Vue.localStorage.set('WACM_auth_token', '');
    router.push('/login');
  },

  getAuthHeader() {
    return Vue.localStorage.get('WACM_auth_token');
  }
}