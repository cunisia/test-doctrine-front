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

    .header {
        margin: 0;
        height: 56px;
        padding: 0 16px 0 24px;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        width: 100%;
        top: 0;
        box-sizing: border-box;
        border-bottom: 1px rgb(216, 216, 225) solid;
        background: white;
    }

    .header__title {
        position: absolute;
        left:0;
        margin-bottom: 0;
        line-height: 56px;
        padding-left: 20px;
        color: #333;
        font-size: 30px;
    }

    .header__title:focus, .header__title:visited, .header__title:hover {
        text-decoration: none;
        color: #333;
    }

    .header__search-bar-wrapper {
        width: 100%;
        text-align: center;
        background: white;
        max-width: 700px;
        margin: auto;
        border-radius: 50px;
        border: 1px #999 solid;
        padding: 0 20px;
    }

    .header__search-bar {
        width: 100%;
        border: none;
        box-shadow: none;
    }

    .header__search-bar:focus {
        outline: none;
        box-shadow: none;
    }

    main {
        padding-top: 24px;
    }
</style>
