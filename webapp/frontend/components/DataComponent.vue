<template>
    <div>
        <h1>Data</h1>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <button class="btn btn-primary" @click="createNew()"><span class="glyphicon glyphicon-plus"></span></button>
    </div>
</template>


<script>
  import DataService from '../services/DataService';
  import UserService from '../services/UserService';
  import {router} from '../main';

  export default {
    data() {
      return {
        data: [],
        error: ''
      }
    },

    created() {
      this.getData();
    },

    // TODO: mounted...

    beforeMount: function () {
      if(!UserService.isAuthenticated()) router.push('/login');
    },

    methods: {
      async getData() {
        try {
          let response = await DataService.getAllData();
          // TODO: enable after implemented
          /*if (!!response.data.success) {
            this.data = response.data.data;
          } else {
            console.error('Response error message: ' + response.data.message);
            this.error = response.data.message;
          }*/
        } catch (e){
          console.error(e);
          this.error = e.message;
        }
      },
      createNew() {
        router.push('/newData');
      }
    }
  }
</script>


<style lang="sass" scoped>
    @import '../colors'

</style>