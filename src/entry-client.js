/**
 * @file client entry
 * @author huanghuiquan(huanghuiquanhhh@gmail.com)
 */

import 'babel-polyfill';
import Vue from 'vue';
import {createApp} from './app';
import ProgressBar from '@/components/ProgressBar.vue';

// 全局的进度条，在组件中可通过 $loading 访问
let loading = Vue.prototype.$loading = new Vue(ProgressBar).$mount();
let {app, router, store} = createApp();

document.body.appendChild(loading.$el);

// 是否是首屏，区别后续路由切换
let firstPaint = true;

/**
 * https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
 * 关闭浏览器存储滚动距离默认行为
 */
// if ('scrollRestoration' in window.history) {
//     window.history.scrollRestoration = 'manual';
// }

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
            if (firstPaint) {
                firstPaint = false;
                return;
            }
            let $el = vm.$el;
            // 滚动内部页面到之前保存的位置
            let scrollTop = vm.$store.state.appShell.historyPageScrollTop[to.fullPath] || 0;
            $el.classList.add('enable-scroll');
            $el.scrollTop = scrollTop;
        });
    },

    beforeRouteLeave(to, from, next) {
        let $wrapper = document.querySelector('.app-view-wrapper');
        let $el = this.$el;
        // 取得当前 body 上的滚动距离
        let scrollTop = window.scrollY || 0;
        let wrapperStyle = window.getComputedStyle($wrapper);
        let wrapperHeight = wrapperStyle.height;
        // 取得 wrapper 初始上边距
        let originalScrollTop = Number(wrapperStyle.top.replace('px', ''));
        // 移动 wrapper 到指定位置
        $wrapper.style.top = `${scrollTop + originalScrollTop}px`;
        $wrapper.style.height = wrapperHeight;
        // 滚动内部页面
        $el.classList.add('enable-scroll');
        $el.scrollTop = scrollTop;
        // 记录当前页面滚动位置
        this.$store.dispatch('appShell/saveScrollTop', {path: from.fullPath, scrollTop});
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
