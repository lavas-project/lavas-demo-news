<template>
    <div class="home-wrapper">
        <ui-menu-tabs :entrys="entrys"></ui-menu-tabs>
        <ui-carousel :items="items"></ui-carousel>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';
import uiCarousel from '@/components/ui/carousel';
import uiMenuTabs from '@/components/ui/menuTabs';

export default {
    name: 'home',
    mixins: [pageLoadingMixin],
    props: {
    },
    components: {
        uiCarousel,
        uiMenuTabs
    },
    data() {
        return {
            items: [
                {
                    src: 'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg',
                    text: '松鼠的图片'
                },
                {
                    src: 'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg',
                    text: '天空的图片'
                },
                {
                    src: 'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg',
                    text: '鸟的图片'
                },
                {
                    src: 'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg',
                    text: '星球的图片'
                }
            ],
            entrys: [
                {
                    text: '热点'
                },
                {
                    text: '军事'
                },
                {
                    text: '娱乐'
                },
                {
                    text: '汽车'
                },
                {
                    text: '搞笑'
                },
                {
                    text: '国内'
                },
                {
                    text: '国际'
                }
            ]
        };
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'showBottomNav',
            'setAppHeader'
        ])
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: '百度新闻',
            showMenu: true,
            showBack: false,
            showLogo: true,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                }
            ]
        });
        this.showBottomNav();
        this.setPageLoading(false);
    }
};
</script>

<style lang="stylus" scoped>
    .carousel
        height 200px
</style>
