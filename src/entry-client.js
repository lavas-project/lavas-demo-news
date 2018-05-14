/**
 * @file client entry
 * @author huanghuiquan(huanghuiquanhhh@gmail.com)
 */

import 'babel-polyfill';
import Vue from 'vue';
import {createApp} from './app';
import ProgressBar from '@/components/ProgressBar.vue';
import './assets/styles/global.styl';

// 全局的进度条，在组件中可通过 $loading 访问
let loading = Vue.prototype.$loading = new Vue(ProgressBar).$mount();
let {app, router, store} = createApp();

document.body.appendChild(loading.$el);

// 是否是首屏，区别后续路由切换
let firstPaint = true;
// 顶部导航条高度
const APP_HEADER_HEIGHT = 52;

/**
 * https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
 * 关闭浏览器存储滚动距离默认行为
 */
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

Vue.mixin({

    // 当复用的路由组件参数发生变化时，例如/detail/1 => /detail/2
    beforeRouteUpdate(to, from, next) {

        // asyncData方法中包含异步数据请求
        let asyncData = this.$options.asyncData;

        if (asyncData) {
            loading.start();
            asyncData.call(this, {
                store: this.$store,
                route: to
            }).then(() => {
                loading.finish();
                next();
            }).catch(next);
        }
        else {
            next();
        }
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 首屏就不用滚动了
            if (firstPaint) {
                firstPaint = false;
                return;
            }

            let $el = vm.$el;
            // 滚动内部页面到之前保存的位置
            let scrollTop = vm.$store.state.appShell.historyPageScrollTop[to.path] || 0;
            $el.classList.add('enable-scroll');
            $el.scrollTop = scrollTop;

            vm.$store.dispatch('appShell/' + (to.meta.swipeBack ? 'enable' : 'disable') + 'SwipeBack');
        });
    },

    beforeRouteLeave(to, from, next) {
        let $el = this.$el;
        let currentWindowHeight = window.innerHeight;
        let scrollTop = window.pageYOffset || 0;

        // wrapper 高度有可能发生变化，例如手机浏览器地址栏隐藏时，需要重新设置
        this.$root.$refs.appView.$el.style.height = `${currentWindowHeight - APP_HEADER_HEIGHT}px`;

        // 滚动内部页面
        $el.classList.add('enable-scroll');
        $el.scrollTop = scrollTop;

        // 记录当前页面滚动位置
        this.$store.dispatch('appShell/saveScrollTop', {path: from.path, scrollTop});
        next();
    }
});

// 此时异步组件已经加载完成
router.beforeResolve((to, from, next) => {
    let matched = router.getMatchedComponents(to);
    let prevMatched = router.getMatchedComponents(from);

    // [a, b]
    // [a, b, c, d]
    // => [c, d]
    let diffed = false;
    let activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)));

    if (!activated.length) {
        return next();
    }

    loading.start();
    Promise.all(activated.map(c => {

        /**
         * 两种情况下执行asyncData:
         * 1. 非keep-alive组件每次都需要执行
         * 2. keep-alive组件首次执行，执行后添加标志
         */
        if (c.asyncData && (!c.asyncDataFetched || to.meta.notKeepAlive)) {
            return c.asyncData({
                store,
                route: to
            }).then(() => {
                c.asyncDataFetched = true;
            });
        }
    })).then(() => {
        loading.finish();
        next();
    }).catch(next);
});

router.onReady(() => app.$mount('#app'));
