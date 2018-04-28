import Vue from 'vue';
import axios from 'axios';
import {router} from '../main';
import UserService from './UserService';

export default {
  async getData() {
    if(UserService.isAuthenticated()) {
      return axios.get(`https://localhost:8443/api/data`, {headers: {authorization: UserService.getAuthHeader()}})
        .then(response => {
          if (!!response.data.success) {
            return Promise.resolve(response.data.data);
          } else {
            return Promise.reject(response.data.message);
          }
        })
        .then(data => {
          return Promise.resolve(data);
        })
        .catch(e => {
          console.error(e);
          return Promise.reject(e);
        })
    } else{
      return Promise.reject(new Error('Not authenticated!'));
    }
  },

  async createNewData(title, description, tags) {
    // TODO: implement
    return Promise.resolve();
  }
}