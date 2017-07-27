/**
 * @file category.js
 * @author zhangzhiqiang (zhangzhiqiang04@baidu.com)
 */

import * as types from '../mutation-types';

const menuTabsLocalDataKey = 'menuTabsLocalDataKey';
const otherMenuTabsLocalDataKey = 'otherMenuTabsLocalDataKey';
const defaultCategory = '推荐';

function handleMenuTabsOriginData(menuData) {
    return menuData.split('|').map(item => {
        return {text: item};
    });
}

function setLocalMenuTabsData(menuTabsKey = menuTabsLocalDataKey, menuTabsData) {
    localStorage.setItem(menuTabsKey, JSON.stringify(menuTabsData));
}

function getLocalMenuTabsData(menuTabsKey = menuTabsLocalDataKey) {

    try {
        let res = JSON.parse(localStorage.getItem(menuTabsKey));
        res.forEach(item => {
            delete item.active;
        });

    }
    catch (err) {

    }
}

let menuTabs = `${defaultCategory}|本地|娱乐|社会|军事|女人|互联网|科技|生活|国际|国内|体育|汽车`;
menuTabs = getLocalMenuTabsData(menuTabsLocalDataKey) || handleMenuTabsOriginData(menuTabs);
menuTabs[0].active = true;

let otherMenuTabs = '房产|财经|时尚|教育|游戏|旅游|人文|创意';
otherMenuTabs = getLocalMenuTabsData(otherMenuTabsLocalDataKey) || handleMenuTabsOriginData(otherMenuTabs);

export default {

    state: {
        menuTabs,
        otherMenuTabs,
        category: 'abcd'
    },

    getters: {
        menuTabs(state) {
            return state.menuTabs;
        },
        otherMenuTabs(state) {
            return state.otherMenuTabs;
        },
        category(state) {
            let activeTab = state.menuTabs.find(tab => tab.active);
            return activeTab ? activeTab.text : defaultCategory;
        }
    },

    actions: {
        setActiveTab({commit}, category) {
            commit(types.SET_NEWS_ACTIVE_TAB, category);
        },
        addCategory({commit}, {text: category}) {
            commit(types.ADD_CATEGORY, category);
        },
        delCategory({commit}, tabItem) {
            commit(types.DEL_CATEGORY, tabItem.text);
        }
    },

    mutations: {
        [types.SET_NEWS_ACTIVE_TAB](state, category) {
            state.menuTabs = state.menuTabs.map(item => {
                item.active = category === item.text;
                return item;
            });
        },
        [types.DEL_CATEGORY](state, category) {
            state.menuTabs.forEach((item, index) => {
                if (category === item.text) {
                    let deletedCategoryObj = state.menuTabs.splice(index, 1)[0];
                    state.otherMenuTabs.unshift(deletedCategoryObj);
                    setLocalMenuTabsData(otherMenuTabsLocalDataKey, state.otherMenuTabs);
                }
            });
            setLocalMenuTabsData(menuTabsLocalDataKey, state.menuTabs);
        },
        [types.ADD_CATEGORY](state, category) {
            state.otherMenuTabs.forEach((item, index) => {
                if (category === item.text) {
                    let deletedCategoryObj = state.otherMenuTabs.splice(index, 1)[0];
                    state.menuTabs.push(deletedCategoryObj);
                    setLocalMenuTabsData(menuTabsLocalDataKey, state.menuTabs);
                }
            });
            setLocalMenuTabsData(otherMenuTabsLocalDataKey, state.otherMenuTabs);
        }
    }
};
