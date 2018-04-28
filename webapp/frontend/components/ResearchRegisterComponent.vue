<template>
    <div>
        <h1>{{translate('registerRFLabel')}}</h1>
        <div class="alert alert-danger" v-if="error">
            <p>{{ translate(error) }}</p>
        </div>
        <div class="alert alert-success" v-if="success">
            <p>{{ translate(success) }}</p>
        </div>
        <div class="form-group">
            <label for="emailInput">{{translate('emailInput')}}</label>
            <input
                    id="emailInput"
                    type="text"
                    class="form-control"
                    :placeholder="translate('emailInputPH')"
                    v-model="user.email"
                    @keyup.enter="register()"
            >
        </div>
        <div class="form-group">
            <label for="passwordInput">{{translate('passwordInput')}}</label>
            <input
                    id="passwordInput"
                    type="password"
                    class="form-control"
                    :placeholder="translate('passwordInputPH')"
                    v-model="user.password"
                    @keyup.enter="register()"
                    :min="8"
            >
        </div>
        <div class="form-group">
            <label for="passwordRepeatInput">{{translate('passwordRepeatInput')}}</label>
            <input
                    id="passwordRepeatInput"
                    type="password"
                    class="form-control"
                    :placeholder="translate('passwordRepeatInputPH')"
                    v-model="user.passwordRepeat"
                    @keyup.enter="register()"
            >
        </div>
        <button class="btn btn-primary" @click="register()">{{translate('registerLabel')}}</button>
        <button class="btn btn-danger" @click="reset()">{{translate('resetLabel')}}</button>
        <br>
        <br>
    </div>
</template>

<script>
  import UserService from '../services/UserService';
  import TranslationService from '../services/TranslationService';
  import {router} from '../main';

  export default {
    data (){
      return {
        user: {
          email: '',
          password: '',
          passwordRepeat: ''
        },

        lang: 'en',

        error: '',
        success: ''
      }
    },

    beforeMount: function () {
      if(UserService.isAuthenticated()) router.push('/home');
    },

    methods: {
      async register() {
        try {
          let u = this.user;
          this.success = await UserService.registerResearch(u.email, u.password, u.passwordRepeat);
        } catch(e){
          this.error = e;
        }
      },

      reset: () => {
        this.user = {
          email: '',
          password: '',
          passwordRepeat: ''
        }
      },

      translate: (key) => {
        let userLang = navigator.language || navigator.userLanguage;
        return TranslationService.translate(
          userLang.startsWith('de') ? 'de' : 'en',
          key);
      }
    }
  }
</script>

<style lang="sass" scoped>
    @import '../colors'
</style>