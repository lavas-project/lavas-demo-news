/**
 * @file app shell store
 * @author huanghuiquan(huanghuiquanhhh@gmail.com)
 */

import * as types from '../mutation-types';

let state = {

    /**
     * 是否需要页面切换动画
     *
     * @type {boolean}
     */
    needPageTransition: true,

    /**
     * 多个页面是否处于切换中
     *
     * @type {boolean}
     */
    isPageSwitching: false,

    /**
     * 多个页面切换效果名称
     *
     * @type {string}
     */
    pageTransitionName: '',

    /**
     * 是否要禁止滚动容器的overflow-scrolling-touch属性
     *
     * @type {boolean}
     */
    overflowScrollingTouch: false,

    /**
     * 侧滑返回开关
     *
     * @type {boolean}
     */
    enableSwipeBack: false,

    /**
     * 上个页面 scroll 的信息
     *
     * @type {Object}
     */
    historyPageScrollTop: {}
};

let actions = {

    /**
     * 开启页面切换动画
     *
     * @param {Function} commit commit
     */
    enablePageTransition({commit}) {
        commit(types.ENABLE_PAGE_TRANSITION, true);
    },

    /**
     * 关闭页面切换动画
     *
     * @param {Function} commit commit
     */
    disablePageTransition({commit}) {
        commit(types.DISABLE_PAGE_TRANSITION, false);
    },

    /**
     * 设置页面是否处于切换中
     *
     * @param {Function} commit commit
     * @param {boolean} isPageSwitching isPageSwitching
     */
    setPageSwitching({commit}, isPageSwitching) {
        commit(types.SET_PAGE_SWITCHING, isPageSwitching);
    },

    /**
     * 保存页面 scroll 高度
     *
     * @param {[type]} options.commit [description]
     * @param {string} options.path path
     * @param {number} options.scrollTop scrollTop
     */
    saveScrollTop({commit}, {path, scrollTop}) {
        commit(types.SAVE_SCROLLTOP, {path, scrollTop});
    },

    /**
     * 设置overflow-scroll为默认状态
     *
     * @param {Function} options.commit commit
     */
    disableOverflowScrollingTouch({commit}) {
        commit(types.UPDATE_OVERFLOW_SCROLLING_TOUCH, false);
    },

    /**
     * 设置overflow-scroll为touch
     *
     * @param {Function} options.commit commit
     */
    enableOverflowScrollingTouch({commit}) {
        commit(types.UPDATE_OVERFLOW_SCROLLING_TOUCH, true);
    },

    /**
     * 开启侧滑返回
     *
     * @param {Function} options.commit committer
     */
    enableSwipeBack({commit}) {
        commit(types.UPDATE_SWIPE_BACK, true);
    },

    /**
     * 关闭侧滑返回
     *
     * @param {Function} options.commit committer
     */
    disableSwipeBack({commit}) {
        commit(types.UPDATE_SWIPE_BACK, false);
    }

};

let mutations = {
    [types.SET_PAGE_SWITCHING](state, isPageSwitching) {
        state.isPageSwitching = isPageSwitching;
    },
    [types.SET_PAGE_TRANSITION_NAME](state, {pageTransitionName}) {
        state.pageTransitionName = pageTransitionName;
    },
    [types.SAVE_SCROLLTOP](state, {path, scrollTop}) {
        state.historyPageScrollTop[path] = scrollTop;
    },
    [types.UPDATE_OVERFLOW_SCROLLING_TOUCH](state, flag) {
        state.overflowScrollingTouch = flag;
    },
    [types.UPDATE_SWIPE_BACK](state, flag) {
        state.enableSwipeBack = flag;
    }
};

export default {
    namespaced: true,
    /* eslint-disable */
    actions,
    mutations,
    state,
    /* eslint-enable */
    modules: {

        /**
         * 顶部导航栏的数据
         *
         * @type {Object}
         */
        appHeader: {
            namespaced: true,
            state: {

                /**
                 * 是否展示顶部导航栏
                 *
                 * @type {boolean}
                 */
                show: true,

                /**
                 * 标题内容
                 *
                 * @type {string}
                 */
                title: 'Lavas',

                /**
                 * logo图标名称
                 *
                 * @type {string}
                 */
                logoIcon: '',

                /**
                 * 是否展示左侧菜单图标
                 *
                 * @type {boolean}
                 */
                showMenu: false,

                /**
                 * 是否展示左侧收藏夹图标
                 *
                 * @type {boolean}
                 */
                showFavor: false,

                /**
                 * 是否展示左侧返回图标
                 *
                 * @type {boolean}
                 */
                showBack: false,

                /**
                 * 是否展示左侧logo
                 *
                 * @type {boolean}
                 */
                showLogo: true,

                /**
                 * 右侧操作按钮数组
                 *
                 * @type {Array}
                 */
                actions: []
            },
            actions: {

                /**
                 * 设置顶部导航条
                 *
                 * @param {Function} commit commit
                 * @param {Object} appHeader appHeader
                 */
                setAppHeader({commit}, appHeader) {
                    commit(types.SET_APP_HEADER, appHeader);
                }
            },
            mutations: {
                [types.SET_APP_HEADER](state, appHeader) {
                    state.appHeader = Object.assign(state, appHeader);
                }
            }
        },

        /**
         * 左侧侧边栏的数据
         *
         * @type {Object}
         */
        appSidebar: {
            namespaced: true,
            state: {
                show: false, // 是否显示sidebar
                slideFrom: 'left', // 划出的方向

                // 头部条的相关配置
                title: {
                    imageLeft: '',
                    altLeft: '',
                    svgLeft: '',
                    iconLeft: 'home',
                    text: '个人中心',
                    imageRight: '',
                    altRight: '',
                    svgRight: '',
                    iconRight: ''
                },

                // 最大宽度，可以是百分比，也可以以px为单位
                width: 0.75,

                // 滑动距离展示阈值
                showWidthThreshold: 0.25,

                // 侧滑
                enableSwipeOut: false,

                user: null,
                // 分块组
                blocks: [
                    {
                        list: [
                            {
                                text: '收藏',
                                icon: 'star',
                                route: '/favor'
                            }
                        ]
                    },
                    {
                        list: [
                            {
                                text: '消息通知',
                                icon: 'message'
                            },
                            {
                                text: '用户反馈',
                                icon: 'feedback'
                            },
                            {
                                text: '系统设置',
                                icon: 'settings'
                            }
                        ]
                    }
                ]
            },
            actions: {

                /**
                 * 展示侧边栏
                 *
                 * @param {Function} commit commit
                 */
                showSidebar({commit}) {
                    commit(types.SET_SIDEBAR_VISIBILITY, true);
                },

                /**
                 * 隐藏侧边栏
                 *
                 * @param {Function} commit commit
                 */
                hideSidebar({commit}) {
                    commit(types.SET_SIDEBAR_VISIBILITY, false);
                },

                enableSwipeOut({commit}) {
                    commit(types.SET_SWIPE_OUT, true);
                },
                disableSwipeOut({commit}) {
                    commit(types.SET_SWIPE_OUT, false);
                },
                login({commit}, userInfo) {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            commit(types.SET_USER_INFO, {
                                name: userInfo.name,
                                location: '中国北京',
                                email: 'example@baidu.com'
                            });
                            resolve();
                        }, 1000);
                    })
                }
            },
            mutations: {
                [types.SET_SIDEBAR_VISIBILITY](state, sidebarVisibility) {
                    state.show = sidebarVisibility;
                },
                [types.SET_SWIPE_OUT](state, enable) {
                    state.enableSwipeOut = enable;
                },
                [types.SET_USER_INFO](state, userInfo) {
                    state.user = userInfo;
                }
            }
        },

        /**
         * app shell 底部导航栏的数据
         *
         * @type {Object}
         */
        appBottomNavigator: {
            namespaced: true,
            state: {

                /**
                 * 是否展示底部导航栏
                 *
                 * @type {boolean}
                 */
                show: true,

                /**
                 * 导航按钮列表
                 *
                 * @type {Array.<Object>}
                 */
                navs: [
                    {
                        // 按钮的名字
                        name: 'home',

                        // 显示的 icon
                        icon: 'home',

                        // 显示的文字
                        text: '主页',

                        // 是否是当前激活的
                        active: true,

                        // 路由
                        route: {
                            name: 'home',
                            path: '/'
                        }
                    },
                    {
                        // 按钮的名字
                        name: 'user',

                        // 显示的 icon
                        icon: 'person',

                        // 显示的文字
                        text: '个人中心',

                        // 路由信息
                        route: '/user'
                    }
                ]
            },
            actions: {

                /**
                 * 隐藏底部导航
                 *
                 * @param {Function} commit commit
                 */
                hideBottomNav({commit}) {
                    commit(types.SET_APP_BOTTOM_NAV, {show: false});
                },

                /**
                 * 显示底部导航
                 *
                 * @param {Function} commit commit
                 */
                showBottomNav({commit}) {
                    commit(types.SET_APP_BOTTOM_NAV, {show: true});
                },

                /**
                 * 激活底部导航
                 *
                 * @param {Function} commit commit
                 * @param {string} name name
                 */
                activateBottomNav({commit}, name) {
                    commit(types.ACTIVATE_APP_BOTTOM_NAV, name);
                }
            },
            mutations: {
                [types.ACTIVATE_APP_BOTTOM_NAV](state, name) {
                    state.navs = state.navs.map(nav => {
                        nav.active = nav.name === name;
                        return nav;
                    });
                },
                [types.SET_APP_BOTTOM_NAV](state, appBottomNavigator) {
                    state = Object.assign(state, appBottomNavigator);
                }
            }
        }
    }
};
