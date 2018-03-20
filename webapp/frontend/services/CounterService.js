import Vue from 'vue';
import axios from 'axios';
import {router} from '../main';
import UserService from './UserService';

export default {
  async getCounter(){
    if(UserService.isAuthenticated()){
      return axios.get(`http://localhost:8080/api/counter/`, {headers: {authorization: UserService.getAuthHeader()}});
    }
  },
  async incrementCounter(){
    if(UserService.isAuthenticated()){
      return axios.post(`http://localhost:8080/api/counter/`, {}, {headers: {authorization: UserService.getAuthHeader()}});
    }
  }
}