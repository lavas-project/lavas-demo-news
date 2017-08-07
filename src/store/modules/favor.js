/**
 * @file favor
 * @author  qiusiqi (qiusiqi@baidu.com)
 */

import * as types from '../mutation-types';

const localStorage = window.localStorage;
const FAVORITE_KEY = 'FAVORITE_NEWS';

let localList;
try {
    localList = JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];
}
catch (e) {
    localList = [];
}

export default {

    state: {
        newsFavorList: localList
    },

    actions: {
        // 收藏
        addFavorItem({commit, state}, detail) {
            if (state.newsFavorList.filter(item => item.nid === detail.nid).length) {
                return;
            }

            commit(types.ADD_FAVOR_ITEM, {
                title: detail.title,
                nid: detail.nid,
                time: Date.now()
            });
        },
        // 取消收藏
        removeFavorItem({commit, state}, detail) {
            commit(types.DELETE_FAVOR_ITEM, detail);
        }
    },

    mutations: {
        [types.ADD_FAVOR_ITEM](state, item) {
            state.newsFavorList.push(item);
            localStorage.setItem(FAVORITE_KEY, JSON.stringify(state.newsFavorList));
        },

        [types.DELETE_FAVOR_ITEM](state, item) {
            state.newsFavorList = state.newsFavorList.filter(favor => favor.nid !== item.nid);
            localStorage.setItem(FAVORITE_KEY, JSON.stringify(state.newsFavorList));
        }
    }
};
