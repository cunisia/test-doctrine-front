<template>
    <div class="browser">
        <h1>Search Library</h1>
        <div class="search-bar">
            <input type="search" v-model="search" v-on:input="searchLibrary()" />
        </div>
        <div class="result">
            <p class="result__placeholder" v-if="search.length != 0 && result.length == 0">No book match your search</p>
            <p class="result__placeholder" v-if="search.length == 0 && result.length == 0">Type some keywords on the search bar to search through the Library :)</p>
            <ul class="result__list">
                <li v-for="r in result" class="book" :set="firstMatchingExtract = getFirstMatchingExtract(r.matches)">
                    <span class="book__title">{{r.item.title}}</span>
                    <ul class="book__metas">
                        <li v-if="r.item.author" class="book__meta book__author">{{r.item.author}}</li>
                        <li v-if="r.item.language" class="book__meta book__language">{{r.item.language}}</li>
                    </ul>
                    <div class="book__match" v-if="firstMatchingExtract" v-html="firstMatchingExtract.higlights + '...'"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from '../../node_modules/axios/dist/axios.js'

    export default {
        name: 'Browser',
        data: function() {
            return {
                search: "",
                result: [],
                loadingError: false
             }
        },
        methods: {
            searchLibrary() {
                //TODO: add throttling
                console.log(this.search);
                axios.get('https://ljsv039eze.execute-api.eu-central-1.amazonaws.com/prod/books?q=' + this.search, {
                    'headers': {
                        'x-api-key': 'yoHkF55Zjo1dQR7ichIhL92MV1kyA76O2pBMeukx'
                    }
                }).then(
                    response => {
                        this.result = response.data;
                        this.loadingError = false;
                    },
                    () => {
                        this.loadingError = true
                    }
                );
            },
            getFirstMatchingExtract(matches) {
                const matchingExtracts = matches.filter(m => m.key === 'extract');
                return matchingExtracts.length > 0 ? matchingExtracts[0]:null;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    .result__list {
        list-style-type: none;
        max-width: 700px;
        margin: auto;
        margin-top: 32px;
        text-align: left;
        padding: 0;
    }

    .book {
        margin: 24px 0;
    }

    .book__title {
        font-size: 18px;
        display: block;
        font-weight: bold;
        color: #36b;
    }

    .book__metas {
        list-style-type: none;
        padding:0;
    }

    .book__meta {
        font-size: 15px;
        display: inline-block;
    }

    .book__meta:not(:first-child):before {
        content: '-';
        display: inline-block;
        margin: 0 5px;
    }

    .book__match {
        margin-top: 8px;
        font-size: 14px;
        color: #4c4c4c;
    }

    .book__match em {
        font-weight: bold;
    }


</style>
