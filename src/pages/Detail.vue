<template>
    <div class="news-detail-wrapper">
        <b-loading :show="showLoading"></b-loading>
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

        <preview :show="previewShow" :imageList="imageList" @click-close="closePreview" :index="imgIndex"></preview>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
// import types from '@/store/mutation-types';
import Preview from '@/components/Preview';
import EventBus from '@/event-bus';
import BLoading from '@/components/BLoading.vue';

export default {
    name: 'detail',
    components: {
        Preview,
        BLoading
    },
    data() {
        return {
            imgIndex: 0,
            scrollTop: 0,
            showLoading: true
        };
    },
    computed: {
        ...mapGetters([
            'newsDetail',
            'detailPageFavorStatus',
            'previewShow'
        ]),
        detail() {
            return this.newsDetail || {};
        },
        contents() {
            return this.newsDetail && this.newsDetail.content || [];
        },
        imageList() {
            return this.contents
            .filter(item => item.type === 'image')
            .map(item => {
                return {src: item.data.original.url};
            });
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
            'getNewsDetail',
            'addFavorItem',
            'removeFavorItem',
            'getNewsFavorList',
            'isFavored',
            'changePreviewShow'
        ]),
        // 收藏
        addFavoriteItem() {
            this.addFavorItem(this.newsDetail);
            this.updateFavoriteAction(true);
            this.favored = true;
        },
        // 取消收藏
        removeFavoriteItem() {
            this.removeFavorItem(this.newsDetail);
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
            this.changePreviewShow(false);
        },
        preview(event) {
            this.imgIndex = this.$refs.img.indexOf(event.target);
            this.changePreviewShow(true);
        }
    },

    created() {
        EventBus.$on('app-header:click-toggle', data => {
            this[data.handler] && this[data.handler]();
        });
    },

    async asyncData({store, route}) {
        await store.dispatch('getNewsDetail', {nid: route.params.nid});
    },

    async activated() {
        this.showLoading = true;
        this.isFavored({nid: this.$route.params.nid});
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
        await this.$store.dispatch('getNewsDetail', {nid: this.$route.params.nid});
        this.showLoading = false;
        // document.body.scrollTop = this.scrollTop;
    },
    deactivated() {
        // this.scrollTop = document.body.scrollTop;
    },
    beforeRouteLeave(to, from, next) {
        next();
        setTimeout(() => {
            this.changePreviewShow(false);
        }, 500);
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
</style>
