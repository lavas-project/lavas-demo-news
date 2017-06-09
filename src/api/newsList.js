import axios from 'axios';

export async function getNewsList(params) {
    let data = await axios('http://cq02-testing-mb03.cq02.baidu.com:8188/mock/data/bpwa/newsList.json', {
        params: params
    });


    // mock过滤
    let news = data.data.news || [];
    console.log(params)
    if (params.nid) {
        data.news = news.filter(item => item.nid === params.nid) || news[0] || [];
    }

    return new Promise(resolve => {
        resolve(data);
    });

    // return new Promise(resolve => {
    //     resolve({
    //         "errno": 0,
    //         "data": {
    //             "tabIndex": 2,
    //             "news": news,
    //             "topic": [
    //                 {
    //                     "nid": "14325144040983491863",
    //                     "sourcets": "1494192627000",
    //                     "ts": "1494193338000",
    //                     "title": "北京医改新政实施满月 三级医院门急诊量剧降",
    //                     "url": "http://news.haiwainet.cn/n/2017/0508/c3541083-30900476.html",
    //                     "imageurls": [
    //                         {
    //                             "url": "https://timg01.bdimg.com/timg?tc&size=b480_300&sec=0&quality=100&di=c13bf82dc3e7d52f03190d811ad67d57&src=http%3A%2F%2Ft11.baidu.com%2Fit%2Fu%3D3188925559%2C2404421210%26fm%3D170%26s%3D0132F8B554023AEE16155484030080C0%26w%3D500%26h%3D375%26img.JPEG%26access%3D215967317",
    //                             "width": 500,
    //                             "height": 375
    //                         }
    //                     ],
    //                     "site": "海外网",
    //                     "type": "text",
    //                     "abs": "《北京市医药分开综合改革实施方案》正式实施。",
    //                     "display_type": 1,
    //                     "display_url": "http://news.haiwainet.cn/n/2017/0508/c3541083-30900476.html",
    //                     "topic": [],
    //                     "long_abs": "中新网北京5月8日、今年4月8日，《北京市医药分开综合改革实施方案》正式实施。如今，一个月过去，新政策下患者看病难、看病贵问题是否得到缓解？北京市卫计委的监测表明，四周来三级医院总门急诊量减少15.1%，二级医院总门急诊量减少7.2%，一级医院及社区服务中心门急诊量增加3.4%。",
    //                     "has_related": [],
    //                     "tag": [
    //                         "医改",
    //                         "医疗改革"
    //                     ],
    //                     "content": [],
    //                     "content_type": {
    //                         "text": 1
    //                     },
    //                     "comment": {
    //                         "count": 0
    //                     }
    //                 },
    //                 {
    //                     "nid": "1897953632979056483",
    //                     "sourcets": "1494191327000",
    //                     "ts": "1494192194000",
    //                     "title": "北京一大楼墙面悬挂16辆自行车 城管责令改正(图)",
    //                     "url": "http://china.newssc.org/system/20170508/000776423.html",
    //                     "imageurls": [
    //                         {
    //                             "url": "https://timg01.bdimg.com/timg?tc&size=b480_300&sec=0&quality=100&di=e78a338df3cd9e031ce382676eead7b4&src=http%3A%2F%2Ft12.baidu.com%2Fit%2Fu%3D2628176312%2C2726501580%26fm%3D170%26s%3DECCA7A2B008140FFCBB8F8C20100E091%26w%3D400%26h%3D266%26img.JPEG%26access%3D215967317",
    //                             "width": 400,
    //                             "height": 266
    //                         }
    //                     ],
    //                     "site": "四川新闻网",
    //                     "type": "text",
    //                     "abs": "北青报记者来到海淀区魏公村街的一座大楼，发现这栋楼共有5层，而该楼一侧的墙体上共悬挂了16辆黑...",
    //                     "display_type": 1,
    //                     "display_url": "http://china.newssc.org/system/20170508/000776423.html",
    //                     "topic": [],
    //                     "long_abs": "",
    //                     "has_related": [],
    //                     "tag": [
    //                         "城管"
    //                     ],
    //                     "content": [],
    //                     "content_type": {
    //                         "text": 1
    //                     },
    //                     "comment": {
    //                         "count": 0
    //                     }
    //                 },
    //                 {
    //                     "nid": "9763594890609305267",
    //                     "sourcets": "1494203460000",
    //                     "ts": "1494204183000",
    //                     "title": "京城百余家“鲍师傅”糕点店 仅14家原装",
    //                     "url": "http://finance.qianlong.com/2017/0508/1664693.shtml",
    //                     "imageurls": [
    //                         {
    //                             "url": "https://timg01.bdimg.com/timg?tc&size=b480_300&sec=0&quality=100&di=760dd6049a03523d8ae22767415e88a9&src=http%3A%2F%2Ft10.baidu.com%2Fit%2Fu%3D2568156414%2C4019113676%26fm%3D170%26s%3D7E90468F4ADD18CE5E2271730300505B%26w%3D400%26h%3D300%26img.JPEG%26access%3D215967317",
    //                             "width": 400,
    //                             "height": 300
    //                         }
    //                     ],
    //                     "site": "千龙网",
    //                     "type": "text",
    //                     "abs": "“金典鲍师傅”、“京、鲍师傅”、“至尊鲍师傅”、“鲍大师傅”、“鲍老师糕点”、“鲍家糕点”等系...",
    //                     "display_type": 1,
    //                     "display_url": "http://finance.qianlong.com/2017/0508/1664693.shtml",
    //                     "topic": [],
    //                     "long_abs": "最近，一家叫做“鲍师傅”的糕点门店突然从北京的大街小巷冒出来。北青报记者调查发现，最初的原装鲍师傅鲍才胜来自中国面包之乡——江西资溪县，目前在北京地区只有14家直营门店，而面对京城上百家形形色色的山寨“鲍师傅”，鲍才胜正在打一场看不到多少胜算的维权保卫战。",
    //                     "has_related": [],
    //                     "tag": [],
    //                     "content": [],
    //                     "content_type": {
    //                         "text": 1
    //                     },
    //                     "comment": {
    //                         "count": 0
    //                     }
    //                 }
    //             ],
    //             "banner": [
    //                 {
    //                     "nid": "12314169550711365783",
    //                     "sourcets": "1496004503000",
    //                     "ts": "1496004503000",
    //                     "title": "砧板大改造 秒变iPad支架",
    //                     "url": "http://www.toutiao.com/item/6424870151186809345/",
    //                     "imageurls": [
    //                         {
    //                             "url": "https://timg01.bdimg.com/timg?tc&size=b560_315&sec=0&quality=100&cut_x=35&cut_y=0&cut_h=0&cut_w=560&di=002fceccb2693402fc680fc0e7afee4a&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fnews%2Fcrop%253D0%252C82%252C631%252C315%2Fsign%3D0a5fb6e68826cffc7d65e5f2843166a8%2Fd0c8a786c9177f3eda133c727acf3bc79f3d56ae.jpg",
    //                             "height": 270,
    //                             "width": 480
    //                         }
    //                     ],
    //                     "site": "全网资讯",
    //                     "abs": "一天她发现了一块破旧的砧板，于是她萌发了一个念头，要把这个砧板改造成支架。",
    //                     "display_type": 1,
    //                     "display_url": "http://www.toutiao.com/item/6424870151186809345/",
    //                     "topic": [],
    //                     "long_abs": "国外的一个家庭主妇平日在家中无事的时候总是喜欢把废弃的东西改造成有用的东西。一天她发现了一块破旧的砧板，于是她萌发了一个念头，要把这个砧板改造成支架。为了让这个支架显得更加美观，她买了一些白色的油漆，在砧板上刷了一层。现在主妇天天拿着这个支架用来支撑ipad等电子设备，特别是在烹饪的时候可以方便看食谱。",
    //                     "has_related": [],
    //                     "tag": [
    //                         "iPad",
    //                         "烹饪技巧",
    //                         "家居"
    //                     ],
    //                     "content": [],
    //                     "content_type": {
    //                         "image": 1
    //                     },
    //                     "type": "image",
    //                     "total_images": "5",
    //                     "count": {
    //                         "up": 8,
    //                         "down": 0,
    //                         "comment": 1
    //                     }
    //                 },
    //                 {
    //                     "nid": "11252684405169648321",
    //                     "sourcets": "1495901589000",
    //                     "ts": "1495901589000",
    //                     "title": "10个让人心动不已的车载好物",
    //                     "url": "http://www.toutiao.com/a6424309001625829634/",
    //                     "imageurls": [
    //                         {
    //                             "url": "https://timg01.bdimg.com/timg?tc&size=b487_274&sec=0&quality=100&cut_x=30&cut_y=0&cut_h=0&cut_w=487&di=e7453ce709496013a6dfb17debccd69e&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fnews%2Fcrop%253D0%252C63%252C548%252C274%2Fsign%3D8ec29892db00baa1ae631dfb7a209524%2Fa2cc7cd98d1001e928fe4171b20e7bec55e79789.jpg",
    //                             "height": 270,
    //                             "width": 480
    //                         }
    //                     ],
    //                     "site": "全网资讯",
    //                     "abs": "觉得很伤脑筋的话建议大家备一个干湿两用的吸尘器，吸力强劲，配合不用的接口不放过任何一个角落。",
    //                     "display_type": 1,
    //                     "display_url": "http://www.toutiao.com/a6424309001625829634/",
    //                     "topic": [],
    //                     "long_abs": "随着社会的发展和进步，越来越多的人选择买车来方便自己的生活，随之而来的是汽车用品也越来越好用，多样化的汽车用品到底有哪些才是我们真正想拥有的呢？长途驾驶，开夜车大家准备一个充气床是很有用的，不仅是坐在后排的人可以很好休息，到了服务区没地方住的时候也很方便我们在车里就能躺着睡觉。",
    //                     "has_related": [],
    //                     "tag": [],
    //                     "content": [],
    //                     "content_type": {
    //                         "image": 1
    //                     },
    //                     "type": "image",
    //                     "total_images": "11",
    //                     "count": {
    //                         "up": 18,
    //                         "down": 0,
    //                         "comment": 1
    //                     }
    //                 },
    //                 {
    //                     "nid": "9038270543655205558",
    //                     "sourcets": "1495786440000",
    //                     "ts": "1495786440000",
    //                     "title": "16件最热门高科技产品",
    //                     "url": "http://tech.huanqiu.com/photo/2017-05/2872610.html?t=1495802893435",
    //                     "imageurls": [
    //                         {
    //                             "url": "https://timg01.bdimg.com/timg?tc&size=b636_358&sec=0&quality=100&cut_x=39&cut_y=0&cut_h=0&cut_w=636&di=1dde78e42f3f71056c9b8b6e4e4aaa02&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fnews%2Fcrop%253D0%252C0%252C716%252C358%2Fsign%3Dbd72fe0ef1f2b211f061df0ef7b04908%2F11385343fbf2b2113e591d33c08065380cd78e5c.jpg",
    //                             "height": 270,
    //                             "width": 480
    //                         }
    //                     ],
    //                     "site": "环球网",
    //                     "abs": "Snapchat的最新技术可让您拍摄十秒钟的视频，您可以通过Snapchat应用程序访问和发送。",
    //                     "display_type": 1,
    //                     "display_url": "http://tech.huanqiu.com/photo/2017-05/2872610.html?t=1495802893435",
    //                     "topic": [],
    //                     "long_abs": "如果你能买的到的话，Snapchat的眼镜是您可以获得的最热门的小工具之一。Snapchat的最新技术可让您拍摄十秒钟的视频，您可以通过Snapchat应用程序访问和发送。Sphero的BB-8玩具是去年收藏家特别想要的一个小玩具，但是现在你可以获得一个带有战斗喷漆的更酷的版本，而且还能让你只用手势就可以操控机器人。",
    //                     "has_related": [],
    //                     "tag": [
    //                         "数码",
    //                         "电脑",
    //                         "机器人"
    //                     ],
    //                     "content": [],
    //                     "content_type": {
    //                         "image": 1
    //                     },
    //                     "type": "image",
    //                     "total_images": "16",
    //                     "count": {
    //                         "up": 7,
    //                         "down": 0,
    //                         "comment": 2
    //                     }
    //                 }
    //             ]
    //         }
    //     });
    // });
};





