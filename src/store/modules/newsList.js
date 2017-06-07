/**
 * @file products
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import * as types from '../mutation-custom-types';
import API from '@/api';

export default {
    state: {
        newsList: []
    },
    getters: {
        newsList: state => state.newsList
    },
    actions: {
        async getNewsList({commit}) {
            try {
                commit(types.SET_NEWS_LIST, await API.getNewsList());
            }
            catch(e) {}
        }
    },
    mutations: {
        [types.SET_NEWS_LIST] (state, {news}) {
            news.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.show = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();
            });
            state.newsList = news;
        }
    }
};
