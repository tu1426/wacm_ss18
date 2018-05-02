<template>
    <div>
        <h1>{{translate('newDataLabel')}}</h1>
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
        </p>
        <div class="form-group">
            <label for="titleInput">{{translate('titleInput')}}</label>
            <input
                    id="titleInput"
                    type="text"
                    class="form-control"
                    :placeholder="translate('titleInputPH')"
                    v-model="dat.title"
                    @keyup.enter="createNew()"
            >
        </div>
        <div class="form-group">
            <label for="descInput">{{translate('descInput')}}</label>
            <input
                    id="descInput"
                    type="text"
                    class="form-control"
                    :placeholder="translate('descInputPH')"
                    v-model="dat.description"
                    @keyup.enter="createNew()"
            >
        </div>
        <div class="form-group">
            <label for="tagInput">{{translate('tagInput')}}</label>
            <input
                    id="tagInput"
                    type="text"
                    class="form-control"
                    :placeholder="translate('tagInputPH')"
                    v-model="dat.tags"
                    @keyup.enter="createNew()"
            >
        </div>
        <div class="form-group">
            <label for="file">{{translate('imgInput')}}</label>

            <input type="file" id="file" ref="myFiles" class="custom-file-input"
                   @change="previewFiles" multiple>
        </div>
        <!--//TODO add image uploading-->

        <button class="btn btn-primary" @click="createNew()">{{translate('createDataButton')}}</button>
        <button class="btn btn-danger" @click="reset()">{{translate('resetLabel')}}</button>
        <br>
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
                files: [],
                dat: {
                    title:'',
                    description:'',
                    tags: '',
                    image: ''

                },
                errors: [],
                lang: 'en'
            }
        },

        beforeMount: function () {
            if(!UserService.isAuthenticated()) router.push('/login');
            if(UserService.isResearchFacility()) router.push('/home');
        },

        methods: {
            async createNew () {
                // TODO: implement
                let d = this.dat;
                d.image = 'somepath';

                this.errors = [];
                if(d.title === '') this.errors.push("Title required");
                if(d.description === '') this.errors.push("Description required");
                if(d.tags === '')this.errors.push("At least one tag required");


                if(this.errors.length === 0) {
                    let response = await DataService.createNewData(d.title, d.description, d.image, d.tags);
                }

            },
            reset: () => {
                this.dat = {
                    title:'',
                    description:'',
                    tags: ''
                }
                // TODO: implement
            },
            previewFiles() {
                this.files = this.$refs.myFiles.files
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