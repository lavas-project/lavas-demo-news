<template>
    <div class="news-wrapper">
        <!-- 列表部分list组件，后面提出来 -->
        <div class="news-list">
            <transition-group
                name="item"
                @before-enter="beforeEnter"
                @enter="enter"
                @leave="leave"
                tag="div" appear>
                <news-item v-for="(newsItem, i) in newsList"
                    v-ripple="{class: 'grey--text'}"
                    :newsItem="newsItem"
                    :key="newsItem.nid"
                    :data-index="i">
                </news-item>
            </transition-group>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import NewsItem from './NewsItem.vue';

export default {
    name: 'home',
    props: ['newsList', 'lastListLen'],
    components: {
        NewsItem
    },
    data() {
        return {}
    },
    computed: {

    },
    methods: {
        ...mapActions([
            'getNewsDetail'
        ]),
        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = 'translate(-0px, 50px)';
        },
        enter(el) {
            let delay = 100 * (el.dataset.index - this.lastListLen);
            setTimeout(() => el.style.transform = 'translate(0, 0)', delay)
            setTimeout(() => el.style.opacity = 1, delay / 4)
        },
        leave(el) {
            let index = el.dataset.index;
            let delay = 100 * index;
            delay = delay > 500 ? 500 : delay;
            el.style.top = 132 * index + 'px';
            setTimeout(() => el.style.transform = 'translate(600px, 100px)', delay);
            setTimeout(() => el.style.opacity = 0, delay);
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