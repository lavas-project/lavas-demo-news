/**
 * @file router-loader
 * @author mj(zoumiaojiang@gmail.com)
 */


var SKELETON_ROUTE_HOLDER = '// <!-- INJECT_SKELETON_ROUTE -->';
var SKELETON_ROUTE = ''
    + '{'
    +     'path: \'/skeleton\','
    +     'name: \'skeleton\','
    +     'component: Skeleton'
    + '},';

var SKELETON_IMPORT_HOLDER = '// <!-- INJECT_SKELETON_IMPORT -->';
var SKELETON_IMPORT = 'import Skeleton from \'@/pages/Skeleton.vue\';';

module.exports = function (source) {
    // skeleton路由规则只在开发环境中添加
    return process.env.NODE_ENV === 'production'
        ? source
        : source
            .replace(SKELETON_ROUTE_HOLDER, SKELETON_ROUTE)
            .replace(SKELETON_IMPORT_HOLDER, SKELETON_IMPORT);
};
