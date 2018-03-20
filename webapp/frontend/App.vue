<template>
    <div class="container">
        <div>
            <button v-if="isAuthenticated()" @click="logout()">Logout</button>
        </div>
        <router-view></router-view>
    </div>
</template>


<script>
  import UserService from './services/UserService';

  export default {
    methods: {
      isAuthenticated(){
        return UserService.isAuthenticated();
      },
      logout(){
        UserService.logout();
      }
    }
  }
</script>


<style lang="sass" scoped>
    @import './colors'

    .container
        background: $mainColor

</style>
