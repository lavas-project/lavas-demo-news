/**
 * @file client entry
 * @author zoumiaojiang(zoumiaojiang@gmail.com)
 */

import FastClick from 'fastclick';
import { createApp } from './app';

import 'normalize.css';
import '@/assets/styles/global.styl';

FastClick.attach(document.body);

const { app, router, store } = createApp();

// 同步服务端状态
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // we only care about none-previously-rendered components,
        // so we compare them until the two matched lists differ
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }

        // this is where we should trigger a loading indicator if there is one

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {

            // stop loading indicator

            next()
        }).catch(next)
    })
    app.$mount('#app');
});
