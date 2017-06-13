<template>
    <div class="home-wrapper">
        <div class="news-wrapper">

            <!-- 轮播banner组件 -->
            <ui-carousel :items="bannerList"></ui-carousel>
            <!-- 列表部分list组件 -->
            <home-news-list :newsList='topicList'></home-news-list>

            <home-news-list :newsList='newsList'></home-news-list>

        </div>
    </div>
</template>

<script>
import HomeNewsList from '@/components/homeNewsList.vue';
import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';
import uiCarousel from '@/components/ui/carousel';


export default {
    name: 'home',
    mixins: [pageLoadingMixin],
    props: {
    },
    components: {
        uiCarousel,
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

    data() {
        return {
            path: '/'
        };
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'setAppHeader',
            'getNewsList',
            'showMenuTabs',
            'checkTabCategory'
        ]),
        async getMoreNews() {
            const category = this.$route.query.category || 'remen';
            await this.getNewsList({
                category: category,
                change: false,
                pageNum: Math.floor(this.newsList.length / 20),
                pageSize: 20
            });
            // this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loaded);
        }
    },
    watch: {
        path() {
            this.getMoreNews();
        },
        async category() {
            await this.getNewsList({
                category: this.category,
                change: true,
                pageNum: 0,
                pageSize: 20
            });
            this.setPageLoading(false);
        }
    },
    mounted() {
        this.getMoreNews();
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: '',
            showMenu: false,
            showBack: false,
            showLogo: true,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                },
                {
                    icon: 'person',
                    route: '/user'
                }
            ]
        });
        this.setPageLoading(false);
        this.showMenuTabs();
        this.checkTabCategory(this.$route.query.category || 'remen');
        this.path = this.$route.path;
    }
};
</script>

<style lang="stylus" scoped>
.home-wrapper
    margin-top 40px
</style>
