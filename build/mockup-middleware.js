/**
 * @file mockup处理
 * @author zhangzhiqiang(zhiqiangzhang37@163.com)
 */

const path = require('path');

function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

module.exports = function mockupMiddleware(req, res, next) {

    let reqPath = req.path;
    let idx = reqPath.indexOf('/mockup/');

    if (idx !== -1) {
        let content;
        let filePath = path.resolve(reqPath.slice(idx + 1));
        delete require.cache[require.resolve(filePath)];
        const mockupHandler = require(filePath);

        if (getType(mockupHandler) === 'Function') {
            content = mockupHandler(req.query);
        }
        else {
            content = mockupHandler;
        }

        res.end(JSON.stringify(content));
    }
    else {
        next();
    }

};
