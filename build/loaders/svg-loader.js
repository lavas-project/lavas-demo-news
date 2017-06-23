/**
 * @file svg-loader
 * @author mj(zoumiaojiang@gmail.com)
 */

/* eslint-disable */

var fs = require('fs');
var path = require('path');
var icon = require('../../config').icon;
var svgDir = icon.svgDir;
var icons = icon.icons;
var prefix = icon.prefix;

module.exports = function (source) {

    // 从vue-awesome中导入
    icons.forEach(function (iconName) {
        source += 'import \'vue-awesome/icons/' + iconName + '\';';
    });

    // 从svg文件夹中取
    fs.readdirSync(svgDir).forEach(function (file) {
        var svg = fs.readFileSync(path.resolve(svgDir, file), 'utf8');
        var sizeMatch = svg.match(/ viewBox="0 0 (\d+) (\d+)"/);
        var dMatch = svg.match(/ d="([^"]+)"/);
        if (!sizeMatch || !dMatch) {
            return;
        }
        var svgName = prefix + file.replace(/\.svg$/, '');


        // 注册
        source += `Icon.register(
            {
                '${svgName}': {
                    width: ${parseInt(sizeMatch[1], 10)},
                    height: ${parseInt(sizeMatch[2], 10)},
                    d: '${dMatch[1]}'
                }
            });`;
    });

    return source;
};
