/**
 * @file detail
 * @author  huanghuiquan (huanghuiquan@baidu.com)
 */

import API from '@/api';
import * as types from '../mutation-types';

export default {

    state: {
        detail: {}
    },

    actions: {
        // get detail
        async getDetail({commit}, query) {
            commit(types.UPDATE_DETAIL, {});
            let data = await API.getNewsList({nids: query.nid});
            commit(types.UPDATE_DETAIL, data.news[0]);
        }
    },

    mutations: {
        [types.UPDATE_DETAIL](state, detail) {
            state.detail = detail;
        }
    }
};
