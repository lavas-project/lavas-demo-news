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

export default {
    name: 'detail',
    computed: {
        ...mapGetters([
            'newsDetail'
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
            'getNewsDetail'
        ])
    },

    async asyncData({store, route}) {
        await store.dispatch('getNewsDetail', {nid: route.params.nid});
    },

    async activated() {
        this.setAppHeader({
            title: '百度新闻',
            show: true,
            showMenu: false,
            showBack: true,
            showLogo: false,
            actions: []
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

    .detail-title
        margin-bottom 20px
        padding 10px 0
        font-size 36px
        font-weight bold

</style>
