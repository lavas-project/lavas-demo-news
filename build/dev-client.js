/**
 * @file 开发环境客户端
 * @author huanghuiquan(huanghuiquanhhh@gmail.com)
 */

'use strict';

require('eventsource-polyfill');
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload();
    }
});
