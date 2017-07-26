<template>
    <div class="news-detail-wrapper">
        <div v-show="!detail.error" class="content">
            <h3>{{detail.title}}</h3>

            <div class="title-info">
                <span>{{detail.site}}</span>
                <span>{{detail.show}}</span>
            </div>

            <div class="content">
                <div v-for="content in contents" class="news-item">
                    <p v-if="content.type === 'text'">{{ content.data }}</p>
                    <img v-if="content.type === 'image'" :src="content.data.original.url" @click="preview" ref="img"/>
                </div>
            </div>
        </div>

        <error v-show="detail.error" :message="detail.msg || '加载失败'"> </error>
        <b-loading :show="showLoading"></b-loading>
        <preview :show="previewShow" :imageList="imageList" @click-close="closePreview" :index="previewIndex"></preview>
        <div class="related-news">
            <div class="block-title">相关新闻</div>
            <news-item v-for="(newsItem, i) in relatedNews"
                :newsItem="newsItem"
                :key="newsItem.nid"
                :data-index="i">
            </news-item>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex';
import Preview from '@/components/Preview';
import Error from '@/components/Error';
import EventBus from '@/event-bus';
import BLoading from '@/components/BLoading.vue';
import NewsItem from '@/components/NewsItem.vue';
import API from '@/api';

export default {
    name: 'detail',

    components: {
        Preview,
        BLoading,
        NewsItem,
        Error,
    },

    data() {
        return {
            imgIndex: 0,
            scrollTop: 0,
            showLoading: true,
            relatedNews: [],
            previewShow: false,
            previewIndex: 0
        };
    },

    computed: {
        ...mapState({
            detail(state) {
                return state.detail.detail;
            }
        }),
        ...mapGetters([
            'detailPageFavorStatus'
        ]),
        contents() {
            return this.detail && this.detail.content || [];
        },
        imageList() {
            return this.contents
                .filter(item => item.type === 'image')
                .map(item => ({src: item.data.original.url}));
        }
    },

    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav'
        ]),
        ...mapActions([
            'addFavorItem',
            'removeFavorItem',
            'getNewsFavorList',
            'isFavored'
        ]),
        // 收藏
        addFavoriteItem() {
            this.addFavorItem(this.detail);
            this.updateFavoriteAction(true);
            this.favored = true;
        },
        // 取消收藏
        removeFavoriteItem() {
            this.removeFavorItem(this.detail);
            this.updateFavoriteAction(false);
            this.favored = false;
        },
        // 更新收藏状态
        updateFavoriteAction(toggleStatus) {
            this.toggleAction = {
                toggle: true,
                toggleStatus: toggleStatus
            };

            if (toggleStatus) {
                Object.assign(this.toggleAction, {
                    toggleHandler: 'removeFavoriteItem',
                    toggleIcon: 'favorite'
                });
            }
            else {
                Object.assign(this.toggleAction, {
                    toggleHandler: 'addFavoriteItem',
                    toggleIcon: 'favorite_border'
                });
            }

            this.setAppHeader({actions: [this.toggleAction]});
        },

        closePreview() {
            this.previewShow = false;
            this.$store.dispatch('appShell/enableOverflowScrollingTouch');
            // enable swipe back
            this.$store.dispatch('appShell/enableSwipeBack');
        },

        // 打开预览
        preview(event) {
            this.previewIndex = this.$refs.img.indexOf(event.target);
            this.previewShow = true;
            this.$store.dispatch('appShell/disableOverflowScrollingTouch');
            // disable swipe back
            this.$store.dispatch('appShell/disableSwipeBack');
        }
    },

    created() {
        EventBus.$on('app-header:click-toggle', data => {
            this[data.handler] && this[data.handler]();
        });
    },

    // async asyncData({store, route}) {
    //     await store.dispatch('getDetail', {nid: route.params.nid});
    // },

    async activated() {
        let nid = this.$route.params.nid;
        this.showLoading = true;
        this.relatedNews = [];
        this.isFavored({nid});
        this.updateFavoriteAction(this.detailPageFavorStatus);
        this.setAppHeader({
            title: '百度新闻',
            show: true,
            showMenu: false,
            showFavor: false,
            showBack: true,
            showLogo: false,
            actions: [this.toggleAction]
        });
        await this.$store.dispatch('getDetail', {nid});
        // await this.$store.dispatch('getNewsDetail', {nid: this.$route.params.nid});
        this.showLoading = false;
        let relatedNewsData = await API.getNewsList({
            nid,
            category: 'getbodyinfo',
            ver: 5
        });
        this.relatedNews = relatedNewsData.related_news.filter(item => item.sourcets);
        // document.body.scrollTop = this.scrollTop;
    },
    deactivated() {
    },

    beforeRouteLeave(to, from, next) {
        next();
        setTimeout(() => this.closePreview(), 500);
    }
};
</script>

<style lang="stylus" scoped>

.news-detail-wrapper
    padding 10px
    font-size 16px
    line-height 30px
    position: relative

    h3
        font-size 20px
        line-height 28px
        margin-bottom 8px
        font-weight bold

    .title-info
        font-size 14px
        color #666

    .news-item

        img
            width 100%

    .detail-title
        margin-bottom 20px
        padding 10px 0
        font-size 36px
        font-weight bold
    .related-news
        margin-top 80px
        min-height 80px
        .block-title
            font-size 18px
            line-height 44px
            color #999
            border-bottom: solid 1px #f5f5f5
    .news-item
        &:last-child
            border-bottom: none
</style>
