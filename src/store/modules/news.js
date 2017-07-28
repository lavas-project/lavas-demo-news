/**
 * @file home
 * @author huanghuiquan (huanghuiquan@baidu.com)
 */

import API from '@/api';
import * as types from '../mutation-types';

function df(t) {
    let date = new Date(parseInt(t, 10) || Date.now());
    return date.toISOString()
        .replace('T', ' ')
        .substr(0, 16);
}

function dataProcess(item) {
    item.show = df(item.ts);
    return item;
}

export default {
    state: {
        loaded: false,
        listFromCache: false,
        data: {},
        detailPageFavorStatus: false,
        lastListLen: 0
    },
    getters: {
        loaded(state) {
            return state.loaded;
        },
        listFromCache(state) {
            return state.listFromCache;
        },
        data(state) {
            return state.data;
        },
        lastListLen(state) {
            return state.lastListLen;
        },
        detailPageFavorStatus(state) {
            return state.detailPageFavorStatus;
        }
    },
    actions: {
        async getNewsList({commit, state}, category) {
            try {
                let data = await API.getNewsData({category});
                commit(types.SET_LIST_FROM_CACHE, false);
                commit(types.SET_NEWS_DATA, {category, data});
            }
            catch (e) {
                // console.log(e);
            }
        },

        // 切换tab
        async selectTab({commit, state}, category) {

            if (state.data[category]) {
                commit(types.SET_LIST_FROM_CACHE, true);
                return;
            }

            try {
                let data = await API.getNewsData({category});
                commit(types.SET_NEWS_DATA, {category, change: true, data});
            }
            catch (e) {
                // console.log(e);
            }
            commit(types.SET_LIST_FROM_CACHE, false);
        }
    },
    mutations: {
        [types.SET_NEWS_DATA](state, {data, category, change}) {
            data.news = data.news.map(dataProcess);

            if (data.banner) {
                data.banner = data.banner.map(dataProcess);
            }

            if (data.news && data.news.length) {
                if (change) {
                    state.data[category] = data;
                    state.lastListLen = 0;
                }
                else {
                    // 加载更多
                    state.lastListLen = state.data[category].news.length;
                    state.data[category].news = [...state.data[category].news, ...data.news];
                    state.loaded = 'loaded';
                }
                state.data = Object.assign({}, state.data);
            }
            else {
                state.loaded = 'complete';
            }
        },
        [types.SET_LIST_FROM_CACHE](state, fromCache) {
            state.listFromCache = fromCache;
        },
        [types.SET_SEARCH_RESULT](state, data) {
            data = data.map(dataProcess);

            state.searchResultData = data;
        }
    }
};
