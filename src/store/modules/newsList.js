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
        category: 'remem',
        loaded: false
    },
    getters: {
        newsList: state => state.newsList,
        newsDetail: state => state.newsDetail,
        topicList: state => state.topicList,
        bannerList: state => state.bannerList,
        category: state => state.category,
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
        async checkTabCategory({commit}, category) {
            try {
                commit(types.SET_NEWS_CATEGORY, category);
            }
            catch(e) {}
        }
    },
    mutations: {
        [types.SET_NEWS_LIST] (state, {news, topic, banner}) {
            let content = [];

            news.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.show = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();

                if (!content.length && item.content.length) {
                    content = item.content;
                }
                item.content = item.content.length ? item.content : content;
            });

            if (topic) {
                topic.map(item => {
                    let time = new Date(Number(item.ts) || Date.now());
                    item.show = time.getFullYear() + '-' + time.getMonth() + '-'
                        + time.getDay() + ' ' + time.getHours() + ':'
                        + time.getMinutes();
                    if (!content.length && item.content.length) {
                        content = item.content;
                    }
                    item.content = item.content.length ? item.content : content;
                });
            }

            banner.map(item => {
                if (!content.length && item.content.length) {
                    content = item.content;
                }
                item.content = item.content.length ? item.content : content;
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
        [types.SET_NEWS_CATEGORY] (state, category) {
            state.category = category;
            state.newsList = [];
        }
    }
};
