<template>
    <div>
        <h1>New Data</h1>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
    </div>
</template>


<script>
  import DataService from '../services/DataService';
  import UserService from '../services/UserService';
  import {router} from '../main';

  export default {
    data() {
      return {
        data: {},
        error: ''
      }
    },

    beforeMount: function () {
      if(!UserService.isAuthenticated()) router.push('/login');
      if(UserService.isResearchFacility()) router.push('/home');
    },

    methods: {
      async createNew () {
        // TODO: implement
        //let response = await DataService.createNewData();
      },
      reset: () => {
        // TODO: implement
      }
    }
  }
</script>


<style lang="sass" scoped>
    @import '../colors'


</style>