/**
 * @file 向html中插入cdn
 * @author panyuqi
 */

var CDN_JS_HOLDER = '<!-- CDN_JS -->';
var CDN_CSS_HOLDER = '<!-- CDN_CSS -->';

/**
 * CdnPlugin constructor
 *
 * @param {Object} options 参数
 * @constructor
 */
function CdnPlugin(options) {
    this.options = Object.assign({}, options || {});
}

CdnPlugin.prototype.apply = function (compiler) {

    compiler.plugin('compilation', function (compilation) {
        // 在html插件处理前修改模版
        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {

            var cdnJsHtml = '';
            var cdnCssHtml = '';
            var js = this.options.js;
            var css = this.options.css;

            if (js) {
                Object.keys(js).forEach(function (jsDepName) {
                    cdnJsHtml += '<script type="text/javascript" src="' + js[jsDepName] + '"></script>';
                });
            }
            if (css) {
                Object.keys(css).forEach(function (cdnPath) {
                    cdnCssHtml += '<link rel="stylesheet" href="' + cdnPath + '">';
                });
            }
            htmlPluginData.html = htmlPluginData.html.replace(CDN_JS_HOLDER, cdnJsHtml);
            htmlPluginData.html = htmlPluginData.html.replace(CDN_CSS_HOLDER, cdnCssHtml);

            callback(null, htmlPluginData);
        });
    });
};

module.exports = CdnPlugin;
