import axios from 'axios';

export function getNewsList() {
    // return axios('/api/news/getNewsList', {
    //     params: {
    //         tabId,
    //         newsId
    //     }
    // });
    return new Promise(resolve => {
        resolve({
            "errno": 0,
            "data": {
                "news": [
                    {
                        "nid": "2678372928973431334",
                        "sourcets": "1494203283000",
                        "ts": "1494204073000",
                        "title": "北京楼市三次定向加息 90平首套房平均成本增45万",
                        "url": "http://bj.house.163.com/17/0508/08/CJTBLR8K000788HN.html",
                        "imageurls": [
                            {
                                "url": "https://t10.baidu.com/it/u=1205736504,1921644791&fm=170&s=7AF215C54662551D9335B95903004091&w=218&h=146&img.JPEG",
                                "height": 146,
                                "width": 218
                            },
                            {
                                "url": "https://t11.baidu.com/it/u=1212700219,1829066302&fm=170&s=E29016C747B1A6730C750D070300F043&w=218&h=146&img.JPEG",
                                "height": 146,
                                "width": 218
                            },
                            {
                                "url": "https://t12.baidu.com/it/u=1252244075,1864604173&fm=170&s=AC548A4E58638F1FF604503303005012&w=218&h=146&img.JPEG",
                                "height": 146,
                                "width": 218
                            }
                        ],
                        "site": "网易新闻",
                        "type": "text",
                        "abs": "若按照基准利率4.9%打8.5折，最高贷款期限25年等额本息计算，还款总额是593.14万元，...",
                        "display_type": 1,
                        "display_url": "http://bj.house.163.com/17/0508/08/CJTBLR8K000788HN.html",
                        "topic": [],
                        "long_abs": "从5月1日起，北京首套房贷款利率折扣取消，二套房贷款利率在基准利率基础上上浮20%，这是继去年930调控政策实施以来，银行机构第三次加码住房按揭利率。2017年元旦期间，首套房贷款利率折扣从原来的8.5折调至9折，2017年317房地产调控政策实施后，北京市主要银行机构再次将首套房利率折扣调整至9.5折。",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "4acd2d34"
                    },
                    {
                        "nid": "2538171553527880634",
                        "sourcets": "1494202440000",
                        "ts": "1494203812000",
                        "title": "房山将建长沟良乡等六个特色小镇 ",
                        "url": "http://www.ce.cn/culture/gd/201705/08/t20170508_22599996.shtml",
                        "imageurls": [
                            {
                                "url": "https://timg01.bdimg.com/timg?tc&size=b480_300&sec=0&quality=100&di=c13bf82dc3e7d52f03190d811ad67d57&src=http%3A%2F%2Ft11.baidu.com%2Fit%2Fu%3D3188925559%2C2404421210%26fm%3D170%26s%3D0132F8B554023AEE16155484030080C0%26w%3D500%26h%3D375%26img.JPEG%26access%3D215967317",
                                "width": 500,
                                "height": 375
                            }
                        ],
                        "site": "中国经济网",
                        "type": "text",
                        "abs": "目前房山区正打造包括长沟镇、良乡镇等在内的六个特色小镇，作为该区新型城镇化试点先行区。",
                        "display_type": 1,
                        "display_url": "http://www.ce.cn/culture/gd/201705/08/t20170508_22599996.shtml",
                        "topic": [],
                        "long_abs": "上个周末，在素有“京南水乡”之称的房山长沟，万余名长走爱好者汇聚2017春季北京国际长走大会，参与长走健身活动。北京商报记者在活动中获悉，目前房山区正打造包括长沟镇、良乡镇等在内的六个特色小镇，作为该区新型城镇化试点先行区。",
                        "has_related": [],
                        "tag": [],
                        "content": [
                            {
                                "type": "text",
                                "data": "原标题：房山将建长沟良乡等六个特色小镇"
                            },
                            {
                                "type": "text",
                                "data": "上个周末，在素有“京南水乡”之称的房山长沟，万余名长走爱好者汇聚2017春季北京国际长走大会，参与长走健身活动。北京商报记者在活动中获悉，目前房山区正打造包括长沟镇、良乡镇等在内的六个特色小镇，作为该区新型城镇化试点先行区。"
                            },
                            {
                                "type": "text",
                                "data": "房山区长沟镇自古以来就有“京南水乡”的美誉，自然环境十分优越，拥有丰富的林木、河流、湿地、农田等生态系统资源。特别是位于镇域中心区的长沟泉水国家湿地公园，占地面积达387.5公顷，有1.2万多个泉眼常年喷涌不断，年流量近2000万立方米，四季恒温14-16摄氏度，形成了6公里长的水景观旅游线。依托天然生态，春季北京国际长走大会已经连续在长沟镇举办了九届，先后有10余万人参与其中。"
                            },
                            {
                                "type": "text",
                                "data": "房山区委常委、宣传部长曹蕾在接受采访时表示：“举办长走大会活动，房山长沟具有得天独厚的优势。长沟镇在2016年获评第一批中国特色小镇，明确了打造北京基金小镇的发展定位。在国家级特色小镇政策汇集的放大效应下，随着北京基金小镇建设，长沟正在成为‘绿水青山’变成‘金山银山’的典范。”"
                            },
                            {
                                "type": "text",
                                "data": "据了解，2016年10月14日，北京市房山区长沟镇被列为第一批中国特色小镇。目前，以长沟·北京基金小镇为龙头，房山区正在打造六个特色小镇，即长沟·北京基金小镇、良乡·健康颐养小镇、青龙湖·文化旅游小镇、张坊·生态运动休闲小镇、琉璃河·燕都小镇、周口店·周口店文化小镇。六个特色小镇同时也作为房山区新型城镇化试点先行区，在创新体制机制改革，加大政策、资金、资源集成等方面进行先行先试。到2020年，房山区计划基本形成现代城市组团-特色小城镇-新型农村社区的新型城镇化建设体系。"
                            }
                        ],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "8aea0dc7"
                    },
                    {
                        "nid": "6072063830008063538",
                        "sourcets": "1494203100000",
                        "ts": "1494203805000",
                        "title": "北京进行景观布置 迎“一带一路”高峰论坛",
                        "url": "http://travel.people.com.cn/n1/2017/0508/c41570-29259783.html",
                        "imageurls": [],
                        "site": "人民网",
                        "type": "text",
                        "abs": "此次环境布置将于5月12日前完成。",
                        "display_type": 1,
                        "display_url": "http://travel.people.com.cn/n1/2017/0508/c41570-29259783.html",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [
                            "景观",
                            "装饰"
                        ],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "383aaa0d"
                    },
                    {
                        "nid": "15331067923287969553",
                        "sourcets": "1494198840000",
                        "ts": "1494203797000",
                        "title": "中超联赛第八轮 河北华夏幸福4：1大胜北京国安",
                        "url": "http://hebei.ifeng.com/a/20170508/5575821_0.shtml",
                        "imageurls": [],
                        "site": "凤凰新闻",
                        "type": "text",
                        "abs": "这也是本赛季华夏幸福首次取得联赛客场胜利。",
                        "display_type": 1,
                        "display_url": "http://hebei.ifeng.com/a/20170508/5575821_0.shtml",
                        "topic": [],
                        "long_abs": "这也是本赛季华夏幸福首次取得联赛客场胜利。本场比赛，受伤病等因素影响，华夏幸福派上了车世伟、姜文骏、李行等替补队员。上半场比赛开场不久，国安队员索里亚诺攻门，任航在禁区内倒地封堵时手球，被主裁判判罚点球，索里亚诺操刀主罚命中，华夏幸福0∶1落后。第28分钟，华夏幸福由李行一脚远射破门，将比分扳成1∶1平。",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "28779f5c"
                    },
                    {
                        "nid": "4880800098311425320",
                        "sourcets": "1494202740000",
                        "ts": "1494203781000",
                        "title": "北京男篮搭上全运会末班车",
                        "url": "http://sports.people.com.cn/n1/2017/0508/c22149-29259687.html#liuyan",
                        "imageurls": [],
                        "site": "人民网",
                        "type": "text",
                        "abs": "北京队守住了领先优势，如愿拿到了晋级全运会决赛圈的入场券。",
                        "display_type": 1,
                        "display_url": "http://sports.people.com.cn/n1/2017/0508/c22149-29259687.html#liuyan",
                        "topic": [],
                        "long_abs": "在附加赛次轮负于山东队后，北京队已失去了晋级主动权。湖北队在次节开始阶段打出6比0攻击波，迫使北京队主教练闵鹿蕾叫了暂停。最后一节，段鸿瑞和方硕手不软，连续投中三分球，北京队将领先优势扩大至10分以上。最终，北京队守住了领先优势，如愿拿到了晋级全运会决赛圈的入场券。",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "c820b249"
                    },
                    {
                        "nid": "7021605545814089228",
                        "sourcets": "1494201540000",
                        "ts": "1494203422000",
                        "title": "4月北京新房网签量下滑近一成 业内：交易量将继续萎缩",
                        "url": "http://house.people.com.cn/n1/2017/0508/c164220-29259537.html",
                        "imageurls": [],
                        "site": "人民网",
                        "type": "text",
                        "abs": "在近期一系列楼市调控政策作用下，北京新房市场降温趋势明显。",
                        "display_type": 1,
                        "display_url": "http://house.people.com.cn/n1/2017/0508/c164220-29259537.html",
                        "topic": [],
                        "long_abs": "5月7日，有中介机构公布数据显示，今年4月，北京新建商品住宅共网签2767套，相较3月环比下滑9.9%，与此同时，二手房交易也“掉头向下”。另据部分中介机构不完全统计，在4月北京新房交易中，自住型商品房网签环比上涨63.4%、别墅网签环比下降27.8%、其他商品住宅环比下降。",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "9bead90f"
                    },
                    {
                        "nid": "17959407646679663873",
                        "sourcets": "1494202920000",
                        "ts": "1494203317000",
                        "title": "京籍保健食品企业入冀仍属北京",
                        "url": "http://bdnews.xinmin.cn/baidunews-eco/content/31010960",
                        "imageurls": [],
                        "site": "新民网",
                        "type": "text",
                        "abs": "入驻企业将保留“北京身份”并由北京食药监部门负责日常监管。",
                        "display_type": 1,
                        "display_url": "http://bdnews.xinmin.cn/baidunews-eco/content/31010960",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [
                            "养生食品"
                        ],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "5f82a8e3"
                    },
                    {
                        "nid": "17498686661440003860",
                        "sourcets": "1494202965000",
                        "ts": "1494203317000",
                        "title": "告别“小阳春”： 北京楼市调控冲击“淡旺季”理论",
                        "url": "http://news.emoney.cn/hangye/5090259.shtml",
                        "imageurls": [],
                        "site": "中国操盘手",
                        "type": "text",
                        "abs": "过去几年来，北京楼市的成交高峰并不总是出现在传统旺季，而往往在四季度到来。",
                        "display_type": 1,
                        "display_url": "http://news.emoney.cn/hangye/5090259.shtml",
                        "topic": [],
                        "long_abs": "正如当前“小阳春”不见踪影，最近几年来，传统的旺季已经变得不甚明显。根据经验，严厉调控政策出台前后，市场情绪往往波动较大。过去几年来，北京楼市的成交高峰并不总是出现在传统旺季，而往往在四季度到来。虽然处于传统的＂小阳春＂阶段，但在调控政策影响下，北京房地产市场仍然出现大幅降温。",
                        "has_related": [],
                        "tag": [
                            "房产政策"
                        ],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "d91441c9"
                    },
                    {
                        "nid": "8384218330696255692",
                        "sourcets": "1494202800000",
                        "ts": "1494203204000",
                        "title": "全运会男篮附加赛:北京压轴晋级决赛圈",
                        "url": "http://sports.qianlong.com/2017/0508/1664574.shtml",
                        "imageurls": [],
                        "site": "千龙网",
                        "type": "text",
                        "abs": "北京队在附加赛中的战绩是4胜1负，他们获得了小组第一，从而获得了进入天津全运会决赛阶段的最后一...",
                        "display_type": 1,
                        "display_url": "http://sports.qianlong.com/2017/0508/1664574.shtml",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "4f379f5a"
                    },
                    {
                        "nid": "2246322686127511887",
                        "sourcets": "1494200760000",
                        "ts": "1494203777000",
                        "title": "易到官方客服电话变空号 能否获得网约车资质存疑",
                        "url": "http://finance.haiwainet.cn/n/2017/0508/c352345-30900618.html",
                        "imageurls": [],
                        "site": "海外网",
                        "type": "text",
                        "abs": "规定之后，神州专车获得了首张网约车牌照；2月8日，首汽约车也获得了网约车牌照；3月2日，滴滴也...",
                        "display_type": 1,
                        "display_url": "http://finance.haiwainet.cn/n/2017/0508/c352345-30900618.html",
                        "topic": [],
                        "long_abs": "尽管易到董事长何毅曾表示，目前易到的融资取得突破性进展，外界所关心的司机提现问题也将在5月份得到彻底解决，不过后续却有消息称公司融资受阻，让司机提现问题能否顺利解决徒增变数。规定之后，今年1月26日，神州专车获得了首张网约车牌照；2月8日，首汽约车也获得了网约车牌照；3月2日，滴滴也宣布拿到牌照。",
                        "has_related": [],
                        "tag": [
                            "易到用车",
                            "打车软件",
                            "于瑞卓"
                        ],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "3fdf9550"
                    },
                    {
                        "nid": "9068770610077389480",
                        "sourcets": "1494202140000",
                        "ts": "1494202978000",
                        "title": "北京义务教育入学平台今起采集信息 采集顺序与入学不挂钩",
                        "url": "http://m.people.cn/n4/2017/0508/c676-8905349.html",
                        "imageurls": [],
                        "site": "手机人民网",
                        "type": "text",
                        "abs": "本市将完成2017年北京市小学和初中入学信息采集工作，适龄儿童少年需要登录北京市义务教育入学服...",
                        "display_type": 1,
                        "display_url": "http://m.people.cn/n4/2017/0508/c676-8905349.html",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "0bf353d6"
                    },
                    {
                        "nid": "5693213079448619386",
                        "sourcets": "1494199932000",
                        "ts": "1494201747000",
                        "title": "董藩：不能因为购房者还贷压力大 就推断房价有泡沫",
                        "url": "http://xw.qq.com/finance/20170508004483/FIN2017050800448304",
                        "imageurls": [],
                        "site": "腾讯新闻",
                        "type": "text",
                        "abs": "实际上，房地产市场非常稳定。",
                        "display_type": 1,
                        "display_url": "http://xw.qq.com/finance/20170508004483/FIN2017050800448304",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "0599be34"
                    },
                    {
                        "nid": "319682363001572431",
                        "sourcets": "1494202140000",
                        "ts": "1494202923000",
                        "title": "北京本周气温多日将站稳30℃ 还未“一秒入夏” ",
                        "url": "http://finance.chinanews.com/sh/2017/05-08/8217888.shtml",
                        "imageurls": [],
                        "site": "中国新闻网",
                        "type": "text",
                        "abs": "昨天凌晨近3时，南郊观象台气温13℃，为昨天最低气温；到了15时12分，气温便蹿上了30.9℃...",
                        "display_type": 1,
                        "display_url": "http://finance.chinanews.com/sh/2017/05-08/8217888.shtml",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "ad674af8"
                    },
                    {
                        "nid": "7131061662079857017",
                        "sourcets": "1494200640000",
                        "ts": "1494203457000",
                        "title": "北京：“房东”为非法经营提供便利将受罚",
                        "url": "http://house.people.com.cn/n1/2017/0508/c164220-29259474.html",
                        "imageurls": [],
                        "site": "人民网",
                        "type": "text",
                        "abs": "为了防止违法经营“死灰复燃”，将引入信用监管机制，加大对为非法经营者提供便利条件的“房东”的联...",
                        "display_type": 1,
                        "display_url": "http://house.people.com.cn/n1/2017/0508/c164220-29259474.html",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "e3a48a7b"
                    },
                    {
                        "nid": "15555318906147699267",
                        "sourcets": "1494202800000",
                        "ts": "1494203393000",
                        "title": "北京一公司假借部委名义卖网络关键词 多人被骗",
                        "url": "http://cs.com.cn/xwzx/201705/t20170508_5271819.html",
                        "imageurls": [
                            {
                                "url": "https://t10.baidu.com/it/u=1205736504,1921644791&fm=170&s=7AF215C54662551D9335B95903004091&w=218&h=146&img.JPEG",
                                "height": 146,
                                "width": 218
                            },
                            {
                                "url": "https://t11.baidu.com/it/u=1212700219,1829066302&fm=170&s=E29016C747B1A6730C750D070300F043&w=218&h=146&img.JPEG",
                                "height": 146,
                                "width": 218
                            },
                            {
                                "url": "https://t12.baidu.com/it/u=1252244075,1864604173&fm=170&s=AC548A4E58638F1FF604503303005012&w=218&h=146&img.JPEG",
                                "height": 146,
                                "width": 218
                            }
                        ],
                        "site": "中证网",
                        "type": "text",
                        "abs": "在渔阳饭店举行一场“两化融合”会议上，一名“专家”正给参会企业老板讲移动互联网入口的内容。",
                        "display_type": 1,
                        "display_url": "http://cs.com.cn/xwzx/201705/t20170508_5271819.html",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "f63e7ea4"
                    },
                    {
                        "nid": "9396577776922130042",
                        "sourcets": "1494203364000",
                        "ts": "1494203884000",
                        "title": "北京网贷监管力度持续加码 未来行业洗牌将加剧",
                        "url": "http://finance.sina.com.cn/money/bank/bank_hydt/2017-05-08/doc-ifyeycfp9336890.shtml",
                        "imageurls": [],
                        "site": "新浪财经",
                        "type": "text",
                        "abs": "北京市网贷行业协会相继发布两个通告，要求平台不得对社会公众做不当宣传，并要求现金贷平台进行自查。",
                        "display_type": 1,
                        "display_url": "http://finance.sina.com.cn/money/bank/bank_hydt/2017-05-08/doc-ifyeycfp9336890.shtml",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [
                            "互联网金融",
                            "投哪网"
                        ],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "42b9e314"
                    },
                    {
                        "nid": "1666356027572372290",
                        "sourcets": "1494202440000",
                        "ts": "1494203832000",
                        "title": "大型马拉松专业赛事首次落户通州 ",
                        "url": "http://www.ce.cn/culture/gd/201705/08/t20170508_22600039.shtml",
                        "imageurls": [],
                        "site": "中国经济网",
                        "type": "text",
                        "abs": "中国马球公开赛、世界台球团体锦标赛、第十八届国际食用菌大会、全球华人羽毛球锦标赛……越来越多的...",
                        "display_type": 1,
                        "display_url": "http://www.ce.cn/culture/gd/201705/08/t20170508_22600039.shtml",
                        "topic": [],
                        "long_abs": "日前，2017北京通州半程马拉松启动报名，将于6月11日清晨在通州运河沿岸鸣枪起跑。据介绍，此前，通州区体育局与时博国际公司已正式签署了“北京通州半程马拉松赛”合作协议，双方计划每年上半年，在通州核心城区及大运河沿岸举办半程马拉松赛事。希望通过这项赛事，让更多人了解通州、认识通州，感受通州优美的自然风光和深厚的文化历史底蕴。",
                        "has_related": [],
                        "tag": [
                            "Marathon",
                            "田径",
                            "运动"
                        ],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        },
                        "token": "1d31afc3"
                    }
                ],
                "topic": [
                    {
                        "nid": "14325144040983491863",
                        "sourcets": "1494192627000",
                        "ts": "1494193338000",
                        "title": "北京医改新政实施满月 三级医院门急诊量剧降",
                        "url": "http://news.haiwainet.cn/n/2017/0508/c3541083-30900476.html",
                        "imageurls": [
                            {
                                "url": "https://timg01.bdimg.com/timg?tc&size=b480_300&sec=0&quality=100&di=c13bf82dc3e7d52f03190d811ad67d57&src=http%3A%2F%2Ft11.baidu.com%2Fit%2Fu%3D3188925559%2C2404421210%26fm%3D170%26s%3D0132F8B554023AEE16155484030080C0%26w%3D500%26h%3D375%26img.JPEG%26access%3D215967317",
                                "width": 500,
                                "height": 375
                            }
                        ],
                        "site": "海外网",
                        "type": "text",
                        "abs": "《北京市医药分开综合改革实施方案》正式实施。",
                        "display_type": 1,
                        "display_url": "http://news.haiwainet.cn/n/2017/0508/c3541083-30900476.html",
                        "topic": [],
                        "long_abs": "中新网北京5月8日、今年4月8日，《北京市医药分开综合改革实施方案》正式实施。如今，一个月过去，新政策下患者看病难、看病贵问题是否得到缓解？北京市卫计委的监测表明，四周来三级医院总门急诊量减少15.1%，二级医院总门急诊量减少7.2%，一级医院及社区服务中心门急诊量增加3.4%。",
                        "has_related": [],
                        "tag": [
                            "医改",
                            "医疗改革"
                        ],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        }
                    },
                    {
                        "nid": "1897953632979056483",
                        "sourcets": "1494191327000",
                        "ts": "1494192194000",
                        "title": "北京一大楼墙面悬挂16辆自行车 城管责令改正(图)",
                        "url": "http://china.newssc.org/system/20170508/000776423.html",
                        "imageurls": [
                            {
                                "url": "https://timg01.bdimg.com/timg?tc&size=b480_300&sec=0&quality=100&di=e78a338df3cd9e031ce382676eead7b4&src=http%3A%2F%2Ft12.baidu.com%2Fit%2Fu%3D2628176312%2C2726501580%26fm%3D170%26s%3DECCA7A2B008140FFCBB8F8C20100E091%26w%3D400%26h%3D266%26img.JPEG%26access%3D215967317",
                                "width": 400,
                                "height": 266
                            }
                        ],
                        "site": "四川新闻网",
                        "type": "text",
                        "abs": "北青报记者来到海淀区魏公村街的一座大楼，发现这栋楼共有5层，而该楼一侧的墙体上共悬挂了16辆黑...",
                        "display_type": 1,
                        "display_url": "http://china.newssc.org/system/20170508/000776423.html",
                        "topic": [],
                        "long_abs": "",
                        "has_related": [],
                        "tag": [
                            "城管"
                        ],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        }
                    },
                    {
                        "nid": "9763594890609305267",
                        "sourcets": "1494203460000",
                        "ts": "1494204183000",
                        "title": "京城百余家“鲍师傅”糕点店 仅14家原装",
                        "url": "http://finance.qianlong.com/2017/0508/1664693.shtml",
                        "imageurls": [
                            {
                                "url": "https://timg01.bdimg.com/timg?tc&size=b480_300&sec=0&quality=100&di=760dd6049a03523d8ae22767415e88a9&src=http%3A%2F%2Ft10.baidu.com%2Fit%2Fu%3D2568156414%2C4019113676%26fm%3D170%26s%3D7E90468F4ADD18CE5E2271730300505B%26w%3D400%26h%3D300%26img.JPEG%26access%3D215967317",
                                "width": 400,
                                "height": 300
                            }
                        ],
                        "site": "千龙网",
                        "type": "text",
                        "abs": "“金典鲍师傅”、“京、鲍师傅”、“至尊鲍师傅”、“鲍大师傅”、“鲍老师糕点”、“鲍家糕点”等系...",
                        "display_type": 1,
                        "display_url": "http://finance.qianlong.com/2017/0508/1664693.shtml",
                        "topic": [],
                        "long_abs": "最近，一家叫做“鲍师傅”的糕点门店突然从北京的大街小巷冒出来。北青报记者调查发现，最初的原装鲍师傅鲍才胜来自中国面包之乡——江西资溪县，目前在北京地区只有14家直营门店，而面对京城上百家形形色色的山寨“鲍师傅”，鲍才胜正在打一场看不到多少胜算的维权保卫战。",
                        "has_related": [],
                        "tag": [],
                        "content": [],
                        "content_type": {
                            "text": 1
                        },
                        "comment": {
                            "count": 0
                        }
                    }
                ]
            }
        });
    });
};
