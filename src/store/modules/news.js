/**
 * @file home
 * @author huanghuiquan (huanghuiquan@baidu.com)
 */

import API from '@/api';
import * as types from '../mutation-types';

const localStorage = window.localStorage;
const FAVORITE_KEY = 'FAVORITE_NEWS';
const menuTabsLocalDataKey = 'menuTabsLocalDataKey';
const otherMenuTabsLocalDataKey = 'otherMenuTabsLocalDataKey';
const defaultCategory = 'remen';

let menuTabs = [
    {
        text: '热点',
        value: defaultCategory
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
    },
    {
        text: '美女',
        value: 'meinv'
    }
];

let otherMenuTabs = [
    {
        text: '视频',
        value: 'shipin'
    },
    {
        text: '科技',
        value: 'keji'
    },
    {
        text: '财经',
        value: 'caijing'
    },
    {
        text: '动漫',
        value: 'dongman'
    }
];

function setLocalMenuTabsData(menuTabsKey = menuTabsLocalDataKey, menuTabsData) {
    localStorage.setItem(menuTabsKey, JSON.stringify(menuTabsData));
}

function getLocalMenuTabsData(menuTabsKey = menuTabsLocalDataKey) {
    let localData = localStorage.getItem(menuTabsKey);
    let res;

    try {
        res = JSON.parse(localData);
    }
    catch (err) {
        return;
    }
    return res;
}

menuTabs = getLocalMenuTabsData(menuTabsLocalDataKey) || menuTabs;
otherMenuTabs = getLocalMenuTabsData(otherMenuTabsLocalDataKey) || otherMenuTabs;

export default {
    state: {
        loaded: false,
        listFromCache: false,
        data: {},
        newsDetail: {},
        newsFavorList: [],
        detailPageFavorStatus: false,
        lastListLen: 0,
        menuTabs,
        preview: {
            show: false,
            images: [],
            index: 0
        },
        otherMenuTabs
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
        category(state) {
            let activeTab = state.menuTabs.find(tab => tab.active);
            return activeTab.value;
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
        },
        preview(state) {
            return state.preview;
        },
        otherMenuTabs(state) {
            return state.otherMenuTabs;
        }
    },
    actions: {
        async getNewsList({commit, state}, category) {
            try {
                let data = await API.getNewsList({category});
                commit(types.SET_LIST_FROM_CACHE, false);
                commit(types.SET_NEWS_DATA, {category, data});
            }
            catch (e) {
                console.log(e);
            }
        },

        /**
         * 切换tab
         *
         * @param  {Commit} options.commit vuex commit
         * @param  {State} options.state  vuex state
         * @param  {string} category       category
         * @return {boolean}               from cache
         */
        async selectTab({commit, state}, category) {
            commit(types.SET_NEWS_ACTIVE_TAB, category);

            if (state.data[category]) {
                commit(types.SET_LIST_FROM_CACHE, true);
                return;
            }

            try {
                let data = await API.getNewsList({category});
                commit(types.SET_NEWS_DATA, {category, change: true, data});
            }
            catch (e) {
                console.log(e);
            }
            commit(types.SET_LIST_FROM_CACHE, false);
        },

        async getNewsDetail({commit, state}, params) {
            let list = Object.keys(state.data).reduce((list, cat) => {
                list = list.concat(state.data[cat].news);
                return list;
            }, []);

            if (!list.length) {
                let {news, banner, topic} = await API.getNewsList({category: 'remen'});
                list = [...news, ...banner, ...topic];
            }
            commit(types.SET_NEWS_DETAIL, list.find(item => item.nid === params.nid) || list[0]);
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
        },
        showPreview({commit, state}, item) {
            let images = item.imageurls.map(image => ({src: image.url}));
            commit(types.SET_PREVIEW_DATA, {show: true, images: images, index: item.index});
        },
        closePreview({commit, state}) {
            commit(types.SET_PREVIEW_DATA, {show: false});
        },
        [types.ADD_CATEGORY]({commit}, {value: category}) {
            commit(types.ADD_CATEGORY, category);
        },
        [types.DEL_CATEGORY]({commit}, tabItem) {
            commit(types.DEL_CATEGORY, tabItem.value);
        }
    },
    mutations: {
        [types.SET_NEWS_DATA](state, {data, category, change}) {
            let df = t => {
                let date = new Date(parseInt(t, 10) || Date.now());
                return date.toISOString()
                    .replace('T', ' ')
                    .substr(0, 16);
            };

            let dataProcess = item => {
                item.show = df(item.ts);
                return item;
            };

            data.news = data.news.filter(item => item.content.length).map(dataProcess);
            data.banner = data.banner.filter(item => item.content.length).map(dataProcess);

            if (data.news && data.news.length) {
                if (change) {
                    state.data[category] = data;
                    state.lastListLen = 0;
                }
                else {
                    // 加载更多
                    state.lastListLen = state.data[category].news.length
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
        },
        [types.SET_PREVIEW_DATA](state, data) {
            state.preview = Object.assign(state.preview, data);
        },
        [types.DEL_CATEGORY](state, category) {
            state.menuTabs.forEach((item, index) => {
                if (category === item.value) {
                    let deletedCategoryObj = state.menuTabs.splice(index, 1)[0];
                    state.otherMenuTabs.unshift(deletedCategoryObj);
                    setLocalMenuTabsData(otherMenuTabsLocalDataKey, state.otherMenuTabs);
                }
            });
            setLocalMenuTabsData(menuTabsLocalDataKey, state.menuTabs);
        },
        [types.ADD_CATEGORY](state, category) {
            state.otherMenuTabs.forEach((item, index) => {
                if (category === item.value) {
                    let deletedCategoryObj = state.otherMenuTabs.splice(index, 1)[0];
                    state.menuTabs.push(deletedCategoryObj);
                    setLocalMenuTabsData(menuTabsLocalDataKey, state.menuTabs);
                }
            });
            setLocalMenuTabsData(otherMenuTabsLocalDataKey, state.otherMenuTabs);
        }
    }
};
