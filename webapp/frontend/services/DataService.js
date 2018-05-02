import Vue from 'vue';
import axios from 'axios';
import {router} from '../main';
import UserService from './UserService';

export default {
    async getData() {
    if(this.isAuthenticated()) {
        return axios.get(`https://localhost:8443/api/data/data`, {headers: {authorization: this.getAuthHeader()}})
            .then(response => {
            if (!!response.data.success) {
                console.log("data retrieval success");

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
isAuthenticated() {
    if(!!Vue.localStorage.get('WACM_auth_token')){
        return true;
    } else{
        return false;
    }
},
getAuthHeader() {
    return Vue.localStorage.get('WACM_auth_token');
},

async createNewData(title, description, imagePath, tags) {
    // TODO: implement
    //return Promise.resolve();

    if(!title) return Promise.reject('title_not_set_error');
    if(!tags) return Promise.reject('email_not_set_error');
    if(!imagePath && !description) return Promise.reject('neither_image_nor_description_set_error');

    var arr = tags.split(',');

    var headers = {
        'authorization': this.getAuthHeader()
    };

    var data = {
        'title': title,
        'description': description,
        'image' : imagePath,
        'tags' : [arr]
    };

    if(this.isAuthenticated()) {
        return axios.post(`https://localhost:8443/api/data/newData`, data, {headers: {authorization: this.getAuthHeader()}})
            .then(response => {
            if (!!response.data.success) {
            console.log('Data creation successful!');
            return Promise.resolve(response.data.message);
        } else {
            return Promise.reject(response.data.message);
        }
    })
    .then(success => {
            return Promise.resolve(success);
    })
    .catch(e => {
            console.error(e);
        return Promise.reject(e);
    })
    } else{
        return Promise.reject(new Error('Not authenticated!'));
    }
}
}