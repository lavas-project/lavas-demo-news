<template>
    <div class="news-detail-wrapper">
        <h3>{{detail.title}}</h3>

        <div class="title-info">
            <span>{{detail.site}}</span>
            <span>{{detail.show}}</span>
        </div>

        <div class="content">
            <div v-for="content in contents" class="news-item">
                <p v-if="content.type === 'text'">{{ content.data }}</p>
                <img v-if="content.type === 'image'" :src="content.data.original.url"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import types from '@/store/mutation-types';
import EventBus from '@/event-bus';

export default {
    name: 'detail',
    computed: {
        ...mapGetters([
            'newsDetail',
            'detailPageFavorStatus'
        ]),
        detail: function() {
            return this.newsDetail || {};
        },
        contents: function() {
            return this.newsDetail && this.newsDetail.content || [];
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
            'isFavored'
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
        }
    },

    created() {
        EventBus.$on('app-header:click-toggle', (data) => {
            this[data.handler] && this[data.handler]();
        });
    },

    async asyncData({store, route}) {
        await store.dispatch('getNewsDetail', {nid: route.params.nid});
    },

    async activated() {
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
    }
};
</script>

<style lang="stylus" scoped>

.news-detail-wrapper
    padding 10px
    font-size 16px
    line-height 30px
    // margin-top 30px
    position: relative

    h3
        font-size 16px

    .detail-title
        margin-bottom 20px
        padding 10px 0
        font-size 36px
        font-weight bold
</style>
