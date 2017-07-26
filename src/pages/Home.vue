<template>
    <div class="home-wrapper">
        <menu-tabs class="menu-tabs"></menu-tabs>
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
            <news-list
                :newsList='newsList'
                :lastListLen="lastListLen"
                :needTransition="!listFromCache">
            </news-list>
            <b-loading :show="showLoading"></b-loading>
            <infinite-loading v-if="!showLoading"
                spinner="spiral"
                :on-infinite="getMoreNews"
                ref="infiniteLoading">
                <span slot="no-more">
                  亲，已经拉到底啦
                </span>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import MenuTabs from '@/components/MenuTabs.vue';
import Carousel from '@/components/Carousel.vue';
import NewsList from '@/components/NewsList.vue';
import BLoading from '@/components/BLoading.vue';

export default {
    name: 'home',
    props: {},
    data() {
        return {
            newsFavorListShow: false,
            scrollTops: {},
            showLoading: true
        };
    },
    components: {
        NewsList,
        InfiniteLoading,
        MenuTabs,
        Carousel,
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
            'getNewsList'
        ]),
        async getMoreNews() {
            await this.getNewsList(this.category);
            setTimeout(() => this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loaded), 100);
        }
    },
    computed: {
        ...mapGetters([
            'category',
            'listFromCache',
            'loaded',
            'data',
            'lastListLen',
            'menuTabs'
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
    }
};
</script>

<style lang="stylus" scoped>

.app-view
    &.slide-right-enter-active
    &.slide-left-leave-active
        .menu-tabs
            top 0

.menu-tabs
    position fixed !important
    top $app-header-height
    left 0
    right 0

.carousel
    height 232px
    width 100%

.content-wrapper
    padding-top: 40px

// .loading-spiral
//     border-color: $theme.primary !important

</style>
