<template>
    <div class="home-wrapper">
        <!-- <div class="menu-tabs-wrapper" :style="{top: menuTabsTop + 'px'}"> -->
            <!-- <menu-tabs class="menu-tabs"></menu-tabs> -->
        <!-- </div> -->
        <div
            class="content-wrapper"
            ref="contentWrapper">
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
            <b-loading :show="showLoading"></b-loading>
            <!-- 收藏夹组件 -->
            <infinite-loading v-if="!showLoading"
                spinner="spiral"
                :on-infinite="getMoreNews"
                ref="infiniteLoading">
                <span slot="no-more">
                  亲，已经拉到底啦
                </span>
            </infinite-loading>
        </div>
        <news-favor-list
            :list='newsFavorList' :show="newsFavorListShow"
            @hide-favorList="hideFavorList">
        </news-favor-list>
        <preview
            :show="preview.show"
            :imageList="preview.images"
            :index="preview.index"
            @click-close="closePreview">
        </preview>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import MenuTabs from '@/components/MenuTabs.vue';
import Carousel from '@/components/Carousel.vue';
import HomeNewsList from '@/components/HomeNewsList.vue';
import NewsFavorList from '@/components/NewsFavorList.vue';
import EventBus from '@/event-bus';
import Preview from '@/components/Preview.vue';
import BLoading from '@/components/BLoading.vue';

const APP_HEADER_HEIGHT = 52;

export default {
    name: 'home',
    props: {},
    data() {
        return {
            newsFavorListShow: false,
            scrollTops: {},
            showLoading: true,
            menuTabsTop: APP_HEADER_HEIGHT
        };
    },
    components: {
        HomeNewsList,
        InfiniteLoading,
        MenuTabs,
        Carousel,
        NewsFavorList,
        Preview,
        BLoading
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav',
            'activateBottomNav'
        ]),
        ...mapActions('appShell/appSidebar', [
            'disableSwipeOut',
            'enableSwipeOut'
        ]),
        ...mapActions([
            'getNewsList',
            'getNewsFavorList',
            'closePreview'
        ]),
        async getMoreNews() {
            await this.getNewsList(this.category);
            setTimeout(() => this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loaded), 100);
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
        ...mapState('appShell', [
            'historyPageScrollTop'
        ]),
        newsList() {
            if (!this.data[this.category]) {
                this.showLoading = true;
                return [];
            }

            this.showLoading = false;
            return this.data[this.category].news;
        }
    },
    watch: {
        category(val, old) {
            this.scrollTops[old] = this.$refs.contentWrapper.scrollTop;
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
    activated() {
        this.setAppHeader({
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

        this.enableSwipeOut();
        this.$refs.contentWrapper.scrollTop = this.scrollTops[this.category];
    },
    deactivated() {
        this.disableSwipeOut();
        this.scrollTops[this.category] = this.$refs.contentWrapper.scrollTop;
    },
    created() {
        EventBus.$on('app-header:click-favor', () => {
            this.newsFavorListShow = true;
        });
        /**
         * 即将离开当前页面，切换动画开始前，设置 menu-tabs 定位
         * 动画时 fixed 定位会表现出 absolute
         */
        // EventBus.$on('transition:before-leave', () => {
        //     console.log('transition leave....');
        //     this.menuTabsTop = this.historyPageScrollTop[this.$route.fullPath];
        // });
    }
};
</script>

<style lang="stylus" scoped>

// .app-view
//     &.slide-right-enter-active
//     &.slide-left-leave-active
//         .menu-tabs
//             top 0

.menu-tabs
    position fixed !important
    top $app-header-height
    left 0
    right 0
    z-index 3

.carousel
    height 232px
    width 100%

.content-wrapper
    // padding-top: 40px

// .loading-spiral
//     border-color: $theme.primary !important

</style>
