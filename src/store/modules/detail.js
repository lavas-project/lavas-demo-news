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
            commit(types.UPDATE_DETAIL, {
                error: 1,
                msg: 'fetch data error'
            });
        }
    },

    mutations: {
        [types.UPDATE_DETAIL](state, detail) {
            state.detail = detail;
        }
    }
};
