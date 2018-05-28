<template>
    <div>
        <h1>{{translate('registerLabel')}}</h1>
        <div class="alert alert-danger" v-if="error">
            <p>{{ translate(error) }}</p>
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
        <div class="form-group">
            <label for="nameInput">{{translate('nameInput')}}</label>
            <input
                    id="nameInput"
                    type="text"
                    class="form-control"
                    :placeholder="translate('nameInputPH')"
                    v-model="user.name"
                    @keyup.enter="register()"
            >
        </div>
        <div class="form-group">
            <label for="birthdateInput">{{translate('birthdayInput')}}</label>
            <input
                    id="birthdateInput"
                    type="date"
                    class="form-control"
                    v-model="tempDate"
                    required
            >
        </div>
        <div class="form-group">
            <label for="genderInput">{{translate('genderInput')}}</label>
            <select
                    id="genderInput"
                    class="form-control"
                    v-model="user.gender">



                <option v-for="g in genders">{{ translate(g) }}</option>
            </select>
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
        genders: ['male', 'female'],

        tempDate: new Date(),

        user: {
          email: '',
          password: '',
          passwordRepeat: '',
          name: '',
          birthdate: null,
          gender: '',
          // more for forschungseinrichtung??
        },

        lang: 'en',

        error: ''
      }
    },

    beforeMount: function () {
      if(UserService.isAuthenticated()) router.push('/home');
    },

    methods: {
      async register() {
        try {
          let u = this.user;
          u.birthdate = new Date(`${this.tempDate.toString()}T02:00:00`);
          let response = await UserService.register(u.email, u.password, u.passwordRepeat, u.name, u.birthdate, u.gender);
        } catch(e){
          this.error = e;
        }
      },

      reset: () => {
        this.user = {
          email: '',
          password: '',
          passwordRepeat: '',
          name: '',
          birthdate: new Date(),
          gender: ''
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