/**
 * @file entry
 * @author huanghuiquan(huanghuiquanhhh@gmail.com)
 */

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueTouch from 'vue-touch';
import {createRouter} from './router';
import store from './store';
import App from './App.vue';
import Icon from 'vue-awesome/components/Icon.vue';

Vue.use(Vuetify);
Vue.component('icon', Icon);

// 基于hammer.js的手势库
Vue.use(VueTouch);
Vue.config.productionTip = false;

/* eslint-disable no-new */
export function createApp() {
    let router = createRouter();
    let app = new Vue({
        router,
        store,
        ...App
    });
    return {app, router, store};
}
