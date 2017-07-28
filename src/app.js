/**
 * @file entry
 * @author huanghuiquan(huanghuiquanhhh@gmail.com)
 */

import Vue from 'vue';
import Vuetify from 'vuetify';
import {createRouter} from './router';
import store from './store';
import App from './App.vue';
import Icon from 'vue-awesome/components/Icon.vue';
import filters from './util/filters';
import {sync} from 'vuex-router-sync';

Vue.use(Vuetify);
Vue.component('icon', Icon);

Vue.config.productionTip = false;

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
export function createApp() {
    let router = createRouter();
    let app = new Vue({
        router,
        store,
        filters,
        ...App
    });
    sync(store, router);
    return {app, router, store};
}
