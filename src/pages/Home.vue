<template>
    <div class="home-wrapper">
        <div class="content-wrapper" ref="contentWrapper">
            <news-list
                :newsList='newsList'
                :lastListLen="lastListLen">
            </news-list>
            <b-loading :show="!newsList.length"></b-loading>
            <infinite-loading
                spinner="spiral"
                :on-infinite="oninfinite"
                ref="infiniteLoading">
                <span slot="no-more"> 亲，已经拉到底啦 </span>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import NewsList from '@/components/NewsList.vue';
import BLoading from '@/components/BLoading.vue';

let initCategory = '推荐';
let localTabData = localStorage.getItem('activeTab');
if (localTabData) {
    initCategory = localTabData.split('|')[1];
}

export default {
    name: 'home',
    props: {},
    data() {
        return {
            scrollTops: {},
            lastListLen: 0
        };
    },
    components: {
        NewsList,
        InfiniteLoading,
        BLoading
    },
    methods: {
        async oninfinite() {
            this.lastListLen = this.data[this.category]
                && this.data[this.category].news
                && this.data[this.category].news.length;
            await this.$store.dispatch('getNewsList', this.category);
            setTimeout(() => this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded'), 1000);
        }
    },
    computed: {
        ...mapState({
            data(state) {
                return state.news.data;
            }
        }),
        ...mapGetters(['category']),
        newsList() {
            if (this.data[this.category] && this.data[this.category].news) {
                return this.data[this.category].news;
            }
            return [];
        }
    },
    watch: {
        category(val, old) {
            this.scrollTops[old] = this.$refs.contentWrapper.scrollTop;
        }
    },
    updated() {
        // if (this.listFromCache) {
        //     this.$refs.contentWrapper.scrollTop = this.scrollTops[this.category];
        // }
    },
    async asyncData({store, route}) {
        await store.dispatch('selectTab', initCategory);
    },
    activated() {
        this.$store.dispatch('appShell/appHeader/setAppHeader', {
            show: true,
            title: '百度新闻',
            showMenu: true,
            showBack: false,
            showLogo: false,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                }
            ]
        });
        this.$store.dispatch('appShell/appSidebar/enableSwipeOut');
    },
    deactivated() {
        this.$store.dispatch('appShell/appSidebar/disableSwipeOut');
        this.scrollTops[this.category] = this.$refs.contentWrapper.scrollTop;
    }
};
</script>

<style lang="stylus" scoped>

.carousel
    height 232px
    width 100%

.content-wrapper
    padding-top: 40px

</style>
