/**
 * @file store index
 * @author huanghuiquan(huanghuiquanhhh@gmail.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import appShell from './modules/app-shell';
import news from './modules/news';
import search from './modules/search';
import favor from './modules/favor';
import detail from './modules/detail';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        appShell,
        news,
        search,
        favor,
        detail
    }
});
