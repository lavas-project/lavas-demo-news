/**
 * @file products
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import * as types from '../mutation-custom-types';
import API from '@/api';

export default {
    state: {
        newsList: [],
        topicList: [],
        loaded: false
    },
    getters: {
        newsList: state => state.newsList,
        topicList: state => state.topicList,
        loaded: state => state.loaded
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
        [types.SET_NEWS_LIST] (state, {news, topic}) {
            news.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.show = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();
            });
            topic.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.show = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();
            });

            if (news && news.length) {
                state.newsList = state.newsList.concat(news);
                state.loaded = 'loaded';
            }
            else {
                state.loaded = 'complete';
            }

            state.topicList = topic;

        }
    }
};
