/**
 * @file 获取 newsList
 * @author sfe
 */

import axios from 'axios';

export async function getNewsList(params) {

    console.log(params);

    let data = await axios('https://pwa.baidu.com/api/mockup/news/' + params.category, {
        params,
        withCredentials: true
    });


    // mock过滤
    let news = data.data.news || [];
    if (params.nid) {
        data.news = news.filter(item => item.nid === params.nid) || news[0] || [];
    }

    return new Promise(resolve => {
        resolve(data);
    });
}
