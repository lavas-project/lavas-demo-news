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
        newsDetail: {},
        tabIndex: 0,
        loaded: false
    },
    getters: {
        newsList: state => state.newsList,
        newsDetail: state => state.newsDetail,
        topicList: state => state.topicList,
        bannerList: state => state.bannerList,
        tabIndex: state => state.tabIndex,
        loaded: state => state.loaded
    },
    actions: {
        async getNewsList({commit}, params) {
            try {
                commit(types.SET_NEWS_LIST, await API.getNewsList(params));
            }
            catch(e) {}
        },
        async getNewsDetail({commit}, params) {
            try {
                commit(types.SET_NEWS_DETAIL, await API.getNewsList(params));
            }
            catch(e) {}
        },
        async checkTabIndex({commit}, index) {
            try {
                commit(types.SET_NEWS_TABINDEX, index);
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

        },
        [types.SET_NEWS_DETAIL] (state, {news}) {
            news.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.show = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();
            });

            if (news && news.length) {
                state.newsDetail = news[0];
                state.loaded = 'loaded';
            }
            else {
                state.loaded = 'complete';
            }

        },
        [types.SET_NEWS_TABINDEX] (state, index) {
            state.tabIndex = index;
            state.newsList = [];
        }
    }
};
