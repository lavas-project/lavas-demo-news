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
                <img v-if="content.type === 'image'" :src="content.data.original.url" @click="preview"/>
            </div>
        </div>

        <preview :show="previewShow" :imageList="imageList" @click-close="closePreview"></preview>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import types from '@/store/mutation-types';
import Preview from '@/components/Preview';

export default {
    name: 'detail',
    components: {
        Preview
    },
    data() {
        return {
            previewShow: false
        };
    },
    computed: {
        ...mapGetters([
            'newsDetail'
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
            'getNewsDetail'
        ]),
        closePreview() {
            this.previewShow = false;
        },
        preview() {
            this.previewShow = true;
        }
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


</style>
