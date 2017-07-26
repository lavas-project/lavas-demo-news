/**
 * @file 获取 newsList
 * @author sfe
 */

import axios from 'axios';

let {width: screenSizeWidth, height: screenSizeHeight} = screen;
// let screenSizeHeight = screen.height;

function getParamT({category, nid}) {
    if (nid) {
        return 'recommendinfo';
    }
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
                t: getParamT(params),
                mid: '03c7a16f2e8028127e42c5f7ca9e210b',
                ts: 0,
                topic: params.category,
                type: 'info',
                token: 'info',
                ln: 20,
                an: 20,
                withtopic: 0,
                wf: 1,
                ver: 4,
                pd: 'webapp',
                nids: params.nid,
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

        let data = await this.getNewsList({category: '推荐'});

        let news = data.news || [];

        return news;
    },

    getUserInfo(userId = '2459115') {
        return new Promise(resolve => {
            resolve({
                userName: 'Baidu',
                messageCount: 10
            });
        });
    }

};
