<template>
    <div>
        <h1>Home</h1>
        <h2>Welcome, you are logged in!</h2>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <h2 id="counter">Counter is: {{counter}}</h2>
        <button class="btn btn-primary" @click="getCounter()">Get</button>
        <button class="btn btn-primary" @click="incrementCounter()">Increment</button>
        <br>
        <br>
    </div>
</template>


<script>
  import UserService from '../services/UserService';
  import {router} from '../main';
  import CounterService from '../services/CounterService';

  export default {
    data() {
      return {
        error: '',
        counter: 0
      }
    },

    created() {
        this.getCounter();
    },

    beforeMount: function () {
      if(!UserService.isAuthenticated()) router.push('/login');
    },

    methods: {
        async getCounter() {
          try {
            let response = await CounterService.getCounter();
            if (!!response.data.success) {
              this.counter = response.data.count;
            } else {
              console.error('Response error message: ' + response.data.message);
              this.error = response.data.message;
            }
          } catch (e){
            console.error(e);
            this.error = e.message;
          }
        },
        async incrementCounter() {
          try {
            let response = await CounterService.incrementCounter();
            if (!!response.data.success) {
              this.counter = response.data.count;
            } else {
              console.error('Response error message: ' + response.data.message);
              this.error = response.data.message;
            }
          } catch(e){
            console.error(e);
            this.error = e.message;
          }
        }
    }
  }
</script>


<style lang="sass" scoped>
    @import '../colors'

    #counter
        background: $scondaryColor


</style>