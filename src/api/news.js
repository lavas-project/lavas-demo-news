import axios from 'axios';

export function getHotNews() {
    // return axios('/api/news/getHotNews', {
    //     params: {
    //         userId
    //     }
    // });
    return new Promise(resolve => {
        resolve({
            errno: 0,
            data: {
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
            }
        });
    });
};

export function searchNews(query) {
    // return axios('/api/news/searchNews', {
    //     params: {
    //         userId
    //     }
    // });
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                errno: 0,
                data: {
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
                }
            });
        }, 1500);
    });
};
