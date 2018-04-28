import Vue from 'vue';
import axios from 'axios';
import {router} from '../main';
import UserService from './UserService';

export default {
  async getCounter(){
    if(UserService.isAuthenticated()){
      return axios.get(`https://localhost:8443/api/counter/`, {headers: {authorization: UserService.getAuthHeader()}});
    } else{
      return Promise.reject(new Error('Not authenticated!'));
    }
  },
  async incrementCounter(){
    if(UserService.isAuthenticated()){
      return axios.post(`https://localhost:8443/api/counter/`, {}, {headers: {authorization: UserService.getAuthHeader()}});
    } else{
      return Promise.reject(new Error('Not authenticated!'));
    }
  }
}