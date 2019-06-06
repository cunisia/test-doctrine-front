<template>
    <div class="browser">
        <h1>Search Library</h1>
        <div class="search-bar">
            <input type="search" v-bind:value="search" v-on:input="onInput" />
        </div>
        <div class="result">
            <p class="result__placeholder" v-if="search.length != 0 && result.length == 0">No book match your search</p>
            <p class="result__placeholder" v-if="search.length == 0 && result.length == 0">Type some keywords on the search bar to search through the Library :)</p>
            <div class="result-bar" v-if="result.length > 0">
                <div class="result-bar__el result-bar__el--nb-result">{{result.length}} results</div>
                <div class="result-bar__el result-bar__el--sortby">
                    <label for="sort-by">Sort by: </label>
                    <b-form-select v-model="sortBy" :options="sortByOptions" id="sort-by" size="sm" class="result-bar__select"></b-form-select>
                </div>
            </div>
            <ul class="result__list" v-if="result.length > 0">
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
    import axios from 'axios/dist/axios.js'
    import _ from 'lodash'

    export default {
        name: 'Browser',
        data: function() {
            return {
                search: "",
                sortBy: "score",
                sortByOptions: [
                    { value: 'score', text: 'Accuracy' },
                    { value: 'author', text: 'Author' },
                    { value: 'title', text: 'Title' },
                    { value: 'language', text: 'Language' },
                ],
                result: [],
                loadingError: false

             }
        },
        watch: {
            sortBy: function(){this.sortResults();}
        },
        methods: {
            onInput: _.debounce(function(event) {
                if (this.search != event.target.value) {
                    this.search = event.target.value;
                    this.searchLibrary();
                }
            }, 200),
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
            },
            sortResults() {
                this.result.sort((r1, r2) => {
                    switch (this.sortBy) {
                        case 'score':
                            return  r2.score - r1.score;
                        case 'author':
                        case 'title':
                        case 'language':
                            if (typeof (r1.item[this.sortBy]) === 'undefined') {
                                return 1;
                            }
                            if (typeof (r2.item[this.sortBy]) === 'undefined') {
                                return -1;
                            }
                            return r1.item[this.sortBy].localeCompare(r2.item[this.sortBy]);
                        default:
                            return 0;
                    }
                })
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    .result {
        max-width: 700px;
        margin: auto;
        margin-top: 32px;
    }

    .result-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .result-bar__el {
        display: inline-block;
    }

    .result-bar__el--nb-result {
        font-weight: 600;
    }

    .result-bar__el:not(:first-child) {
        margin-left: 16px;
    }

    .result-bar__select {
        margin-left: 8px;
        width: auto;
    }

    .result-bar__select:focus {
        box-shadow: none;
    }

    .result__list {
        list-style-type: none;
        margin: auto;
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
</style>

<style>
    .book__match em {
        font-weight: bold;
    }
</style>
