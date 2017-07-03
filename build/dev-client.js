/**
 * @file 开发环境客户端
 * @author zoumiaojiang(zoumiaojiang@gmail.com)
 */

'use strict';

require('eventsource-polyfill');
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload();
    }
});
