/**
 * @file store index
 * @author zoumiaojiang(zoumiaojiang@gmail.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import {store as appShell} from '@/app-shells';
import user from './modules/user';
import news from './modules/news';
import newsList from './modules/newsList';

export default new Vuex.Store({
    getters: {},
    modules: {
        appShell,
        user,
        news,
        newsList
    }
});
