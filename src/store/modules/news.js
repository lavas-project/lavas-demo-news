/**
 * @file home
 * @author huanghuiquan (huanghuiquan@baidu.com)
 */

import API from '@/api';
import * as types from '../mutation-types';

const localStorage = window.localStorage;
const FAVORITE_KEY = 'FAVORITE_NEWS';

let menuTabs = [
        {
            text: '热点',
            value: 'remen'
        },
        {
            text: '娱乐',
            value: 'yule'
        },
        {
            text: '体育',
            value: 'tiyu'
        },
        {
            text: '军事',
            value: 'junshi'
        },
        {
            text: '社会',
            value: 'shehui'
        },
        {
            text: '汽车',
            value: 'qiche'
        },
        {
            text: '国内',
            value: 'guonei'
        },
        {
            text: '国际',
            value: 'guoji'
        }
    ];

export default {
    state: {
        loaded: false,
        newsList: [],
        topicList: [],
        bannerList:[],
        newsDetail: {},
        newsFavorList: [],
        detailPageFavorStatus: false,
        category: '',
        lastListLen: 0,
        menuTabs
    },
    getters: {
        loaded(state) {
            return state.loaded;
        },
        newsList(state) {
            return state.newsList;
        },
        topicList(state) {
            return state.topicList;
        },
        bannerList(state) {
            return state.bannerList;
        },
        category(state) {
            return state.category;
        },
        newsDetail(state) {
            return state.newsDetail;
        },
        lastListLen(state) {
            return state.lastListLen;
        },
        menuTabs(state) {
            return state.menuTabs;
        },
        newsFavorList(state) {
            return state.newsFavorList;
        },
        detailPageFavorStatus(state) {
            return state.detailPageFavorStatus;
        }
    },
    actions: {
        async getNewsList({commit}, params) {
            commit(types.SET_NEWS_ACTIVE_TAB, params.category);
            try {
                let {news, banner, topic} = await API.getNewsList(params);
                commit(types.SET_NEWS_LIST, {news, banner, topic, change: params.change});
            }
            catch (e) {
                console.log(e)
            }
        },
        async getNewsDetail({commit, state}, {nid}) {
            let {bannerList = [], topicList = [], newsList = []} = state;
            let list = [...bannerList, ...topicList, ...newsList];
            commit(types.SET_NEWS_DETAIL, list.find(item => item.nid === nid));
        },
        // 收藏
        addFavorItem({commit, state}, detail) {
            let favorList = state.newsFavorList;
            
            favorList.push({
                title: detail.title,
                nid: detail.nid,
                time: Date.now()
            });

            localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorList));
            commit(types.SET_NEWS_FAVOR_LIST, favorList);
        },
        // 取消收藏
        removeFavorItem({commit, state}, detail) {
            let favorList = state.newsFavorList;

            favorList = favorList.filter((news, i) => {
                if (news.nid !== detail.nid) {
                    return true;
                }
            });

            localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorList));
            commit(types.SET_NEWS_FAVOR_LIST, favorList);
        },
        // 获取收藏列表
        getNewsFavorList({commit}) {
            let favorList = [];
            try {
                let tmpList = localStorage.getItem(FAVORITE_KEY);
                if (tmpList) {
                    favorList = JSON.parse(tmpList);
                }
            }
            catch (e) {}
            commit(types.SET_NEWS_FAVOR_LIST, favorList);
        },
        // 检测是否已收藏
        isFavored({commit, state}, detail) {
            let favorList = state.newsFavorList;

            favorList = favorList.filter((news, i) => {
                if (news.nid === detail.nid) {
                    return true;
                }
            });
            commit(types.SET_NEWS_DETAIL_FAVOR_STATUS, favorList.length > 0);
        }
    },
    mutations: {
        [types.SET_NEWS_LIST](state, {news, topic, banner, change}) {
            let df = t => {
                let date = new Date(parseInt(t, 10) || Date.now());
                return date.toISOString()
                    .replace('T', ' ')
                    .substr(0, 16);
            };

            let content = [];

            let dataProcess = item => {
                item.show = df(item.ts);
                // if (!content.length && item.content.length) {
                //     content = item.content;
                // }
                // item.content = item.content.length ? item.content : content;
                return item;
            };

            news = news.filter(item => item.content.length).map(dataProcess);

            if (topic) {
                topic = topic.filter(item => item.content.length).map(dataProcess);
            }

            banner = banner.filter(item => item.content.length).map(dataProcess);
            state.lastListLen = state.newsList.length;

            if (news && news.length) {
                if (change) {
                    state.newsList = news;
                }
                else {
                    state.newsList = state.newsList.concat(news);
                }
                state.loaded = 'loaded';
            }
            else {
                state.loaded = 'complete';
            }

            state.topicList = topic;
            state.bannerList = banner;
        },
        [types.SET_NEWS_DETAIL](state, newsDetail) {
            state.newsDetail = newsDetail;
        },
        [types.SET_NEWS_ACTIVE_TAB](state, category) {
            state.menuTabs = state.menuTabs.map(item => {
                item.active = category === item.value;
                return item;
            });
        },
        [types.SET_NEWS_FAVOR_LIST](state, favorList) {
            state.newsFavorList = favorList;
        },
        [types.SET_NEWS_DETAIL_FAVOR_STATUS](state, status) {
            state.detailPageFavorStatus = status;
        }
    }
};