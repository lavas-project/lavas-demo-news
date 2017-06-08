<template>
    <div class="home-wrapper">
        <div class="news-wrapper">
            <!-- 头部tab组件 -->
            <div class="top-tab">
                <ui-menu-tabs :entrys="entrys"></ui-menu-tabs>
            </div>
            <!-- 轮播banner组件 -->
            <div class="top-banner">
                <ui-carousel :items="items"></ui-carousel>
            </div>
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
import HomeNewsList from '@/components/homeNewsList.vue';
import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';
import uiCarousel from '@/components/ui/carousel';
import uiMenuTabs from '@/components/ui/menuTabs';
import InfiniteLoading from 'vue-infinite-loading';

export default {
    name: 'home',
    mixins: [pageLoadingMixin],
    props: {
    },
    components: {
        uiCarousel,
        uiMenuTabs,
        HomeNewsList,
        InfiniteLoading
    },
    computed: {
        ...mapGetters([
            'newsList',
            'topicList',
            'loaded'
        ])
    },

    data() {
        return {
            items: [
                {
                    src: 'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg',
                    text: '松鼠的图片'
                },
                {
                    src: 'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg',
                    text: '天空的图片'
                },
                {
                    src: 'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg',
                    text: '鸟的图片'
                },
                {
                    src: 'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg',
                    text: '星球的图片'
                }
            ],
            entrys: [
                {
                    text: '热点'
                },
                {
                    text: '军事'
                },
                {
                    text: '娱乐'
                },
                {
                    text: '汽车'
                },
                {
                    text: '搞笑'
                },
                {
                    text: '国内'
                },
                {
                    text: '国际'
                }
            ]
        };
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'setAppHeader',
            'getNewsList'
        ]),
        async getMoreNews() {
            await this.getNewsList();
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loaded);
        }
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: '百度新闻',
            showMenu: true,
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
    },
    async mounted() {
        await this.getNewsList();
    }
};
</script>

<style lang="stylus" scoped>
</style>
