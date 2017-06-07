<template>
    <div class="home-wrapper">
        <div class="news-wrapper">
            <!-- 头部tab组件 -->
            <div class="top-tab"></div>

            <!-- 轮播banner组件 -->
            <div class="top-banner"></div>

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

export default {
    name: 'home',
    mixins: [pageLoadingMixin],
    components: {
        HomeNewsList
    },
    computed: {
        ...mapGetters([
            'newsList',
            'topicList'
        ])
    },
    props: {},
    data() {
        return {};
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'setAppHeader',
            'getNewsList'
        ])
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
    },
    async mounted() {
        await this.getNewsList();
    }
};
</script>

<style lang="stylus" scoped>

.top-tab
    width 100%
    height 40px
    background #2874f0
    position fixed
    top 50px
    left 0
.top-banner
    margin-top 40px
    height 230px
    width 100%
    background #fff url('https://timg01.bdimg.com/timg?tc&size=b771_434&sec=0&quality=100&cut_x=48&cut_y=0&cut_h=0&cut_w=771&di=dd6dba20725da483ce7b4fa08d615f59&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fnews%2Fcrop%253D0%252C52%252C868%252C434%2Fsign%3Dfce1822706338744888a753c6c3ff5cc%2F0b55b319ebc4b745496c6b61c5fc1e178b8215c8.jpg') no-repeat
    background-size 100%

</style>
