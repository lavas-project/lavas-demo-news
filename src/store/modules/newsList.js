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
        bannerList: [],
        loaded: false
    },
    getters: {
        newsList: state => state.newsList,
        topicList: state => state.topicList,
        bannerList: state => state.bannerList,
        loaded: state => state.loaded
    },
    actions: {
        async getNewsList({commit}, pageNum, pageSize, newsId) {
            try {
                commit(types.SET_NEWS_LIST, await API.getNewsList(pageNum, pageSize, newsId));
            }
            catch(e) {}
        }
    },
    mutations: {
        [types.SET_NEWS_LIST] (state, {news, topic, banner}) {
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
            state.bannerList = banner;

        }
    }
};
