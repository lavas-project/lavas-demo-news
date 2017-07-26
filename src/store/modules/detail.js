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
            // todo
            // commit(types.UPDATE_DETAIL, );
        }
    },

    mutations: {
        [types.UPDATE_DETAIL](state, detail) {
            state.detail = detail;
        }
    }
};
