<template>
    <div id="app">
        <header class="header">
            <router-link class="header__title" to="/">Search Library</router-link>
            <div class="header__search-bar-wrapper">
                <input class="header__search-bar" type="search" placeholder="Start typing to search through library..." v-bind:value="search" v-on:input="onInput" />
            </div>
        </header>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
    import Browser from './components/Browser.vue'
    import Book from './components/Book.vue'
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import _ from 'lodash'
    import store from './store.js';

    Vue.use(BootstrapVue);

    export default {
        name: 'app',
        data: function() {
            return {
                search: ""
            }
        },
        methods: {
            onInput: _.debounce(function(event) {
                if (this.search != event.target.value) {
                    this.search = event.target.value;
                }
            }, 200),
        },
        components: {
            Browser,
            Book
        }
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
