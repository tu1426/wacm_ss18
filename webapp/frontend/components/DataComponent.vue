<template>
    <div>
        <h1>Data</h1>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <button class="btn btn-primary" @click="createNew()"><span class="glyphicon glyphicon-plus"></span></button>
        <br>
        <br>
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

    beforeMount: function () {
      if(!UserService.isAuthenticated()) router.push('/login');
      if(UserService.isResearchFacility()) router.push('/home');
    },

    methods: {
      async getData() {
        try {
          this.data = await DataService.getData();
        } catch (e){
          console.error(e);
          this.error = e;
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