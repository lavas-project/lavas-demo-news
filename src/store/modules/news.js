/**
 * @file home
 * @author huanghuiquan (huanghuiquan@baidu.com)
 */

import API from '@/api';
import * as types from '../mutation-types';
import filters from '@/util/filters';

function dataProcess(item) {
    item.show = filters.dateFormat(+item.ts, 'yyyy-MM-dd hh:mm:ss');
    return item;
}

export default {
    state: {
        data: {}
    },
    actions: {
        async getNewsList({commit, state}, category) {
            try {
                let data = await API.getNewsData({category});
                commit(types.SET_NEWS_DATA, {category, data});
            }
            catch (e) {
                // console.log(e);
            }
        },

        // 切换tab
        async selectTab({commit, state}, category) {

            if (state.data[category]) {
                return;
            }

            try {
                let data = await API.getNewsData({category});
                commit(types.SET_NEWS_DATA, {category, change: true, data});
            }
            catch (e) {
                // console.log(e);
            }
        }
    },
    mutations: {
        [types.SET_NEWS_DATA](state, {data, category, change}) {
            data.news = data.news.filter(item => item.sourcets).map(dataProcess);

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
        }
    }
};
