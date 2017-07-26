/**
 * @file 获取 newsList
 * @author sfe
 */

import axios from 'axios';

let {width: screenSizeWidth, height: screenSizeHeight} = screen;
// let screenSizeHeight = screen.height;

function getParamT(category) {
    if (category === '推荐') {
        return 'newchosenlist';
    }
    if (category === '本地') {
        return 'localnewslist';
    }
    return 'recommendlist';
}

export default {
    async getNewsList(params) {
        let data = await axios('http://172.18.180.87:8849/api/mockup/realNews/news', {
            params: {
                tn: 'bdapibaiyue',
                t: getParamT(params.category),
                mid: '03c7a16f2e8028127e42c5f7ca9e210b',
                ts: 0,
                topic: params.category,
                type: 'info',
                token: 'info',
                ln: 20,
                an: 20,
                withtopic: 0,
                wf: 0,
                ver: 4,
                pd: 'webapp',
                // 'nids':
                /* eslint-disable */
                remote_device_type: 1,
                os_type: 1,
                screen_size_width: screenSizeWidth,
                screen_size_height: screenSizeHeight,
                /* eslint-enable */
                action: 1
            },
            withCredentials: true
        });

        if (params.nid) {
            let news = data.data.data.news || [];
            data.data.data.news = news.filter(item => item.nid === params.nid) || news[0] || [];
        }

        return data.data.data;
    },

    async getSearchResult(params) {
        // let data = await axios('https://pwa.baidu.com/api/mockup/news/search', {
        //     params,
        //     withCredentials: true
        // });

        // return data.data.data;
        let data = await axios('https://pwa.baidu.com/api/mockup/news/shehui', {
            withCredentials: true
        });

        let news = data.data.data.news || [];
        data.data.data = news;

        return data.data.data;
    },

    getUserInfo(userId = '2459115') {
        return new Promise(resolve => {
            resolve({
                userName: 'Baidu',
                messageCount: 10
            });
        });
    },

    getHotNews() {
        return new Promise(resolve => {
            resolve({
                news: [
                    {
                        title: '习近平将访哈萨克斯坦并出席系列活动',
                        abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                        ts: '1496806231000',
                        url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                    },
                    {
                        title: '习近平将访哈萨克斯坦并出席系列活动',
                        abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                        ts: '1496806231000',
                        url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                    },
                    {
                        title: '习近平将访哈萨克斯坦并出席系列活动',
                        abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                        ts: '1496806231000',
                        url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                    }
                ]
            });
        });
    },
    searchNews(query) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    news: [
                        {
                            title: '习近平将访哈萨克斯坦并出席系列活动',
                            abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                            ts: '1496806231000',
                            url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                        },
                        {
                            title: '习近平将访哈萨克斯坦并出席系列活动',
                            abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                            ts: '1496806231000',
                            url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                        },
                        {
                            title: '习近平将访哈萨克斯坦并出席系列活动',
                            abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                            ts: '1496806231000',
                            url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                        }
                    ]
                });
            }, 1500);
        });
    }

};
