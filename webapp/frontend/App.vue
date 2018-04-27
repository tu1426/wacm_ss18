<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link class="navbar-brand" :to="{ path: '/home' }">Healthbook</router-link>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li v-if="!isAuthenticated()" v-bind:class="{ active: isActiveRoute('LoginComponent') }"><router-link :to="{ path: '/login' }">Login</router-link></li>
                        <li v-if="!isAuthenticated()" v-bind:class="{ active: isActiveRoute('RegisterComponent') }"><router-link :to="{ path: '/register' }">Register</router-link></li>
                        <li v-if="isAuthenticated()" v-bind:class="{ active: isActiveRoute('DataComponent') }"><router-link :to="{ path: '/data' }">Data</router-link></li>
                    </ul>
                    <ul v-if="isAuthenticated()" class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{getUsername()}} <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="" v-on:click="logout()">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
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

      getUsername(){
        return UserService.getUsername();
      },

      logout(){
        UserService.logout();
      },

      isActiveRoute(name) {
        return this.$route.name === name;
      }
    }
  }
</script>


<style lang="sass" scoped>
    @import './colors'

    .container
        background: $mainColor

</style>
