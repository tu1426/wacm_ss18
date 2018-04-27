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
            Vue.localStorage.set('WACM_username', response.data.email);
            router.push('/home');
          } else {
            return Promise.reject(response.data.message);
          }
        })
        .catch(e => {
          console.error(e);
          return Promise.reject(e);
        })
    } else{
      router.push('/home');
    }
  },

  async register(email, password, passwordRepeat, name, birthdate, gender) {
    if(password !== passwordRepeat) return Promise.reject('passwords_not_matching_error');
    if(password.length < 8) return Promise.reject('password_too_short_error');
    if(!gender) return Promise.reject('gender_not_set_error');
    if(!name) return Promise.reject('name_not_set_error');
    if(!email) return Promise.reject('email_not_set_error');
    if(!birthdate) return Promise.reject('birthday_not_set_error');
    if(!this.isAuthenticated()) {
      return axios.post(`http://localhost:8080/api/user/register`, {email, password, name, birthdate, gender})
        .then(response => {
          console.log(response);
          if (!!response.data.success) {
            console.log('Registration successful!');
            Vue.localStorage.set('WACM_auth_token', response.data.jwt);
            Vue.localStorage.set('WACM_username', response.data.email);
            router.push('/home');
          } else {
            return Promise.reject(response.data.message);
          }
        })
        .catch(e => {
          console.error(e);
          return Promise.reject(e);
        })
    } else{
      router.push('/home');
    }
  },

  isAuthenticated() {
    if(!!Vue.localStorage.get('WACM_auth_token')){
      return true;
    } else{
      return false;
    }
  },

  getUsername() {
    if(!!Vue.localStorage.get('WACM_username')){
      return Vue.localStorage.get('WACM_username');
    } else{
      return '';
    }
  },

  logout() {
    Vue.localStorage.set('WACM_auth_token', '');
    Vue.localStorage.set('WACM_username', '');
    router.push('/login');
  },

  getAuthHeader() {
    return Vue.localStorage.get('WACM_auth_token');
  }
}