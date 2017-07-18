<template>
    <div class="app-search-page">
        <header>
            <v-btn light icon class="search-btn" @click.native="clearAndGo">
                <v-icon class="search-icon">arrow_back</v-icon>
            </v-btn>
            <form @submit.prevent="search">
                <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词" autocapitalize="off" />
            </form>
            <v-btn light icon class="search-btn" @click.native="query = ''">
                <v-icon class="search-icon">close</v-icon>
            </v-btn>
        </header>
        <div v-if="loading" class="search-loading">
            <v-progress-circular indeterminate :size="40" class="primary--text"></v-progress-circular>
        </div>

        <div v-if="searchResultData && searchResultData.length" class="search-content">
            <news-item v-for="(newsItem, i) in searchResultData"
                :newsItem="newsItem"
                :key="newsItem.nid"
                :data-index="i">
            </news-item>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
import NewsItem from '../components/NewsItem.vue';

export default {
    name: 'search',
    data() {
        return {
            query: '',
            loading: false,
            data: []
        };
    },
    components: {
        NewsItem
    },
    computed: {
        ...mapGetters([
            'searchResultData'
        ]),
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions([
            'getSearchResult'
        ]),
        async search() {

            // 显示加载动画
            this.loading = true;

            // 让当前输入框失去焦点
            this.$el.querySelector('.search-input').blur();

            // 获取数据
            await this.$store.dispatch('getSearchResult', this.query);

            this.loading = false;
        },
        clearAndGo() {
            this.$router.go(-1);
            this.query = '';
        }
    },
    activated() {
        this.setAppHeader({show: false});
        this.query.length === 0 && this.$el.querySelector('.search-input').focus();
    },
    watch: {
        query(val, old) {
            if (val.length === 0) {
                this.$store.dispatch('clearSearchResult');
                this.$el.querySelector('.search-input').focus();
            }
        }
    }
};
</script>

<style lang="stylus" scoped>

header
    display flex
    align-items center
    height 52px
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)
    position: fixed
    top: 0
    background: #fff

form
    flex 1

.search-input
    width 100%
    outline none
    font-size 16px
    height 50px

.search-btn
    color #959595

.search-content
    margin-top: 52px

.search-loading
    margin-top 30%
    display flex
    justify-content center

li
    list-style-type none
</style>
