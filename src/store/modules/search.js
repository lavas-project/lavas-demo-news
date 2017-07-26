/**
 * @file search
 * @author  huanghuiquan (huanghuiquan@baidu.com)
 */

import API from '@/api';
import * as types from '../mutation-types';

export default {

    state: {
        result: []
    },

    actions: {
        // search query
        async query({commit}, query) {
            commit(types.UPDATE_RESULT, []);
            let data = await API.getSearchResult({query});
            commit(types.UPDATE_RESULT, data);
        }
    },

    mutations: {
        [types.UPDATE_RESULT](state, data) {
            state.result = data;
        }
    }
};
