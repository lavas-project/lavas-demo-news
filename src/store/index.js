/**
 * @file store index
 * @author zoumiaojiang(zoumiaojiang@gmail.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import {store as appShell} from '@/app-shells';

export default new Vuex.Store({
    getters: {},
    modules: {
        appShell
    }
});
