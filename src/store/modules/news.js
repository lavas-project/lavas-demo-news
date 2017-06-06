/**
 * @file products
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import * as types from '../mutation-custom-types';
import API from '@/api';

export default {
    state: {
        hotNews: []
    },
    getters: {
        hotNews: state => state.hotNews
    },
    actions: {
        async getHotNews({commit}) {
            try {
                commit(types.SET_HOT_NEWS, await API.getHotNews());
            }
            catch(e) {}
        }
    },
    mutations: {
        [types.SET_HOT_NEWS] (state, {news}) {
            state.hotNews = news;
        }
    }
};
