/**
 * @file products
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import * as types from '../mutation-custom-types';
import API from '@/api';

export default {
    state: {
        user: {}
    },
    getters: {
        user: state => state.user
    },
    actions: {
        async getUserInfo({commit}, userId) {
            try {
                commit(types.SET_USER, await API.getUserInfo(userId));
            }
            catch(e) {}
        }
    },
    mutations: {
        [types.SET_USER] (state, user) {
            state.user = user;
        }
    }
};
