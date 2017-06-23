/**
 * @file 获取 newsList
 * @author sfe
 */

import axios from 'axios';

export async function getNewsList(params) {

    console.log(params);
    // let p = new Promise();

    let data = await axios('https://pwa.baidu.com/api/mockup/news/' + params.category, {
        params,
        withCredentials: true
    });
    // data = data.data;
    debugger

    // mock过滤
    let news = data.data.news || [];
    if (params.nid) {
        data.data.news = news.filter(item => item.nid === params.nid) || news[0] || [];
    }

    console.log(news);
    return p.resolve(data.data);

    return new Promise((resolve) => {
        resolve(data.data.data);
    });
}
