<template>
    <div>
        <h1>Please log in!</h1>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div class="form-group">
            <label for="usernameInput">Email</label>
            <input
                    id="usernameInput"
                    type="text"
                    class="form-control"
                    placeholder="Enter your email"
                    v-model="credentials.username"
                    @keyup.enter="login()"
            >
        </div>
        <div class="form-group">
            <label for="passwordInput">Password</label>
            <input
                    id="passwordInput"
                    type="password"
                    class="form-control"
                    placeholder="Enter your password"
                    v-model="credentials.password"
                    @keyup.enter="login()"
            >
        </div>
        <button class="btn btn-primary" @click="login()">Login</button>
        <br>
        <br>
    </div>
</template>


<script>
  import UserService from '../services/UserService';
  import {router} from '../main';

  export default {

    data() {
      return {
        credentials: {
          username: '',
          password: ''
        },

        error: ''
      }
    },

    beforeMount: function () {
      if(UserService.isAuthenticated()) router.push('/home');
    },

    methods: {
        async login() {
          try {
            let response = await UserService.login(this.credentials.username, this.credentials.password);
          } catch(e){
            this.error = e;
          }
        }
    }
  }
</script>


<style lang="sass" scoped>
    @import '../colors'
</style>
