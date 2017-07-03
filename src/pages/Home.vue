<template>
    <div class="home-wrapper">
        <div class="news-wrapper">

            <!-- 轮播banner组件 -->
            <ui-carousel :items="bannerList"></ui-carousel>
            <!-- 列表部分list组件 -->
            <home-news-list :newsList='topicList'></home-news-list>

            <home-news-list :newsList='newsList'></home-news-list>
            <infinite-loading :on-infinite="getMoreNews" ref="infiniteLoading">
                <span slot="no-more">
                  没有更多了！
                </span>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import uiCarousel from '@/components/UiCarousel';
import InfiniteLoading from 'vue-infinite-loading';
import HomeNewsList from '@/components/HomeNewsList.vue';

export default {
    name: 'home',
    props: {},
    components: {
        uiCarousel,
        HomeNewsList,
        InfiniteLoading,
        HomeNewsList
    },
    computed: {
        ...mapGetters([
            'newsList',
            'topicList',
            'bannerList',
            'category',
            'loaded'
        ])
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appMenuTabs', [
            'showMenuTabs'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav',
            'activateBottomNav'
        ]),
        ...mapActions([
            'checkTabCategory',
            'getNewsList'
        ]),

        async getMoreNews() {
            const category = this.$route.query.category || 'remen';
            await this.getNewsList({
                category: category,
                change: false,
                pageNum: Math.floor(this.newsList.length / 20),
                pageSize: 20
            });
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loaded);
        }
    },

    watch: {
        async category(newC, oldC) {
            if (!oldC) {
                return;
            }
            await this.getNewsList({
                category: this.category,
                change: true,
                pageNum: 0,
                pageSize: 20
            });
        }
    },

    async asyncData() {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 500);
        });
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: 'Lavas-news',
            showMenu: false,
            showBack: false,
            showLogo: true,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                }
            ]
        });
        this.activateBottomNav('home');
        this.hideBottomNav();
        this.showMenuTabs();

        if (this.category === 'remen') {
            this.getMoreNews();
        }
    }
};
</script>

<style lang="stylus" scoped>
.home-wrapper
    margin-top 92px !important;
</style>
