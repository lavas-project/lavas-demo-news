<template>
    <div class="home-wrapper">
        <menu-tabs></menu-tabs>
        <div class="content-wrapper" ref="contentWrapper">
            <!-- 轮播banner组件 -->
<!--             <carousel
                v-if="bannerList.length > 0"
                :interval=3500
                :list="bannerList">
            </carousel> -->
            <!-- 列表部分list组件 -->
            <home-news-list
                :newsList='newsList'
                :lastListLen="lastListLen"
                :needTransition="!listFromCache">
            </home-news-list>
            <!-- 收藏夹组件 -->
            <news-favor-list
                :list='newsFavorList' :show="newsFavorListShow"
                @hide-favorList="hideFavorList"></news-favor-list>
            <infinite-loading :on-infinite="getMoreNews" ref="infiniteLoading">
                <span slot="no-more">
                  没有更多了！
                </span>
            </infinite-loading>
        </div>
        <preview
            :show="preview.show"
            :imageList="preview.images"
            :index="preview.index"
            @click-close="closePreview">
        </preview>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import MenuTabs from '@/components/MenuTabs.vue'
import Carousel from '@/components/Carousel.vue'
import HomeNewsList from '@/components/HomeNewsList.vue'
import NewsFavorList from '@/components/NewsFavorList.vue'
import EventBus from '@/event-bus';
import Preview from '@/components/Preview.vue'

export default {
    name: 'home',
    props: {},
    data() {
        return {
            newsFavorListShow: false,
            scrollTops: {}
        }
    },
    components: {
        HomeNewsList,
        InfiniteLoading,
        MenuTabs,
        Carousel,
        NewsFavorList,
        Preview
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav',
            'activateBottomNav'
        ]),
        ...mapActions([
            'getNewsList',
            'getNewsFavorList',
            'closePreview'
        ]),
        async getMoreNews() {
            await this.getNewsList(this.category);
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loaded);
        },
        hideFavorList() {
            this.newsFavorListShow = false;
        }
    },
    computed: {
        ...mapGetters([
            'category',
            'listFromCache',
            'loaded',
            'data',
            'lastListLen',
            'menuTabs',
            'newsFavorList',
            'preview'
        ]),
        newsList() {
            if (!this.data[this.category]) {
                return [];
            }

            return this.data[this.category].news;
        }
    },
    watch: {
        category(val, old) {
            this.scrollTops[old] = this.$refs.contentWrapper.scrollTop;
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        }
    },
    updated(data) {
        if (this.listFromCache) {
            this.$refs.contentWrapper.scrollTop = this.scrollTops[this.category];
        }
    },
    async asyncData({store, route}) {
        let category = route.params.category || 'remen';
        await store.dispatch('selectTab', category);
        store.dispatch('getNewsFavorList');
    },
    async activated() {
        this.setAppHeader({
            show: true,
            title: '百度新闻',
            showFavor: true,
            showBack: false,
            showLogo: false,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                }
            ]
        });
    },
    created() {
        EventBus.$on('app-header:click-favor', () => {
            this.newsFavorListShow = true;
        });
    }
};
</script>

<style lang="stylus" scoped>
// .home-wrapper
//     margin-top 92px !important;

.carousel
    height 232px
    width 100%
.content-wrapper
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 40px
    -webkit-overflow-scrolling: touch
    overflow-x: hidden
    overflow-y: auto

</style>
