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
import pageLoadingMixin from '@/mixins/pageLoadingMixin';

export default {
    name: 'detail',
    mixins: [pageLoadingMixin],
    computed: {
        ...mapGetters([
            'newsList'
        ])
    },
    props: {},
    data() {
        return {
            detail: {},
            contents: []
        }
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'getNewsList'
        ])
    },
    async mounted() {
        debugger
        let nid = this.$route.query.nid;
        await this.getNewsList(0, 10, nid);
        this.detail = this.newsList[0];
        this.contents = this.newsList[0].content;
        this.setPageLoading(false);
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$store.commit(types.SET_APP_HEADER, {
                title: 'Detail Page',
                show: true,
                showMenu: false,
                showBack: true,
                showLogo: false,
                actions: [
                    {
                        icon: 'home',
                        route: {
                            name: 'home'
                        }
                    }
                ]
            });

            // 隐藏底部导航栏
            vm.$store.commit(types.SET_APP_BOTTOM_NAV, {
                show: false
            });
        });
    }
};
</script>

<style lang="stylus" scoped>

.news-detail-wrapper
    padding 20px
    min-height 200px
    h3
        font-size 24px
        line-height 36px
        font-weight bold
        marigin-bottom 20px

    .title-info
        margin-bottom 20px
        font-size 13px
        color #999
        span
            margin-right 10px

    .content
        line-height 27px
        font-size 18px
        p
            margin-top 10px
            text-indent 32px
        img
            width 100%
            height 100%


</style>
