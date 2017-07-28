/**
 * @file 获取 newsList
 * @author sfe
 */

import axios from 'axios';

const API_PATH = 'http://120.76.240.153:8090/api/mockup/realNews/news';

let {width: screenSizeWidth, height: screenSizeHeight} = screen;
// let screenSizeHeight = screen.height;

function getParamT({category, nids}) {
    // 新闻详情
    if (nids) {
        return 'recommendinfo';
    }
    // 相关新闻
    if (category === 'getbodyinfo') {
        return 'getbodyinfo';
    }
    // 推荐栏目
    if (category === '推荐') {
        return 'newchosenlist';
    }
    // 本地栏目
    if (category === '本地') {
        return 'localnewslist';
    }
    // 普通栏目
    return 'recommendlist';
}

export default {
    async getNewsData(params) {
        let data = await axios(API_PATH, {
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
                ver: params.ver || 4,
                pd: 'webapp',
                // 新闻详情需要nids
                nids: params.nids,
                // 相关新闻需要nid
                nid: params.nid,
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

        return data.data.data;
    },

    async getSearchResult(params) {

        let data = await this.getNewsData({category: '推荐'});

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
