<template>
    <div class="home-wrapper">
        <menu-tabs></menu-tabs>
        <!-- 轮播banner组件 -->
<!--         <v-carousel>
            <v-carousel-item
                v-for="(item, i) in bannerList"
                :src="item.imageurls[0].url"
                :key="i">
            </v-carousel-item>
        </v-carousel>
 -->
        <!-- 列表部分list组件 -->
        <home-news-list :newsList='newsList' :lastListLen="lastListLen"></home-news-list>
        <infinite-loading :on-infinite="getMoreNews" ref="infiniteLoading">
            <span slot="no-more">
              没有更多了！
            </span>
        </infinite-loading>
        <preview :show="preview.show" :imageList="preview.images" @click-close="closePreview"></preview>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import MenuTabs from '@/components/MenuTabs.vue'
import HomeNewsList from '@/components/HomeNewsList.vue'
import Preview from '@/components/Preview.vue'

export default {
    name: 'home',
    props: {},
    components: {
        HomeNewsList,
        InfiniteLoading,
        MenuTabs,
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
            'closePreview'
        ]),
        async getMoreNews() {
            let category = this.$route.params.category || 'remen';
            await this.getNewsList({
                category,
                change: false,
                pageNum: Math.floor(this.newsList.length / 20),
                pageSize: 20
            });
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loaded);
        }
    },
    computed: {
        ...mapGetters([
            'newsList',
            'topicList',
            'bannerList',
            'category',
            'loaded',
            'lastListLen',
            'preview'
        ])
    },
    async asyncData({store, route}) {
        let category = route.params.category || 'remen';
        await store.dispatch('getNewsList', {change: true, category});
    },
    async activated() {
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
    }
};
</script>

<style lang="stylus" scoped>
// .home-wrapper
//     margin-top 92px !important;

.carousel
    height 232px
    width 100%

</style>
