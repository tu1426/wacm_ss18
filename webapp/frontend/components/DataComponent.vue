<template>
    <div>
        <h1>{{translate('data')}}</h1>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>

        <button class="btn btn-primary" @click="createNew()"><span class="glyphicon glyphicon-plus"></span></button>

        <br>
        <br>
        <div id="datas">
            <div v-for="d in data">
                <div v-if="d.title" class="dataElem">
                    <h3><b>{{translate('titleInput')}}:</b> {{ d.title }}</h3>
                    <p><b>{{translate('descInput')}}:</b> {{d.description}}</p>
                    <b>{{translate('tagInput')}}:</b> <ul id="tags">
                    <li v-for="t in d.tags">
                        {{t}}
                    </li>
                </ul>
                </div>
                <br/>
            </div>

        </div>
        <br>
    </div>
</template>


<script>
    import DataService from '../services/DataService';
    import UserService from '../services/UserService';
    import TranslationService from '../services/TranslationService';

    import {router} from '../main';

    export default {
        data() {
            return {
                el: '#tags',
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
<style>
    .dataElem {
        background: WhiteSmoke;
        padding: 1%;
        margin: 1%;
        border-radius: 5px;
    }
</style>