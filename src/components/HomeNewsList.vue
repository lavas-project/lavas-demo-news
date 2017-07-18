<template>
    <div class="news-wrapper">
        <!-- 列表部分list组件，后面提出来 -->
        <div class="news-list">
            <template v-if="needTransition">
                <transition-group
                    appear
                    name="item"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    tag="div">
                    <news-item v-for="(newsItem, i) in newsList"
                        :newsItem="newsItem"
                        :key="newsItem.nid"
                        :data-index="i">
                    </news-item>
                </transition-group>
            </template>
            <template v-else>
                <news-item v-for="(newsItem, i) in newsList"
                    :newsItem="newsItem"
                    :key="newsItem.nid"
                    :data-index="i">
                </news-item>
            </template>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import NewsItem from './NewsItem.vue';

export default {
    name: 'home',
    props: ['newsList', 'lastListLen', 'needTransition'],
    components: {
        NewsItem
    },
    data() {
        return {}
    },
    computed: {

    },
    methods: {
        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = 'translate(-0px, 50px)';
        },
        enter(el, done) {
            let delay = 100 * (el.dataset.index - this.lastListLen);
            setTimeout(() => el.style.transform = 'translate(0, 0)', delay);
            setTimeout(() => el.style.opacity = 1, delay / 4);
        }
    }
};
</script>

<style lang="stylus">
a
    text-decoration none

.news-wrapper
    // min-height 200px
    .news-list
        padding 10px

</style>