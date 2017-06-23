/**
 * @file ssr-skeleton
 * @author mj(zoumiaojiang@gmail.com)
 */

var path = require('path');
var webpack = require('webpack');
var createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
var serverWebpackConfig = require('./webpack.server.conf');
var MFS = require('memory-fs');

module.exports = new Promise(function (resolve, reject) {
    var serverCompiler = webpack(serverWebpackConfig);
    var mfs = new MFS();
    var outputPath = path.join(serverWebpackConfig.output.path, serverWebpackConfig.output.filename);

    // 输出到mfs中
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, function (err, stats) {
        if (err) {
            reject(err);
        }
        stats = stats.toJson();

        /* eslint-disable no-console */
        stats.errors.forEach(function (err) {
            console.error(err);
        });

        stats.warnings.forEach(function (err) {
            console.warn(err);
        });

        var bundle = mfs.readFileSync(outputPath, 'utf-8');
        var renderer = createBundleRenderer(bundle);

        // 渲染skeleton
        renderer.renderToString({}, function (err, skeletonHtml) {
            if (err) {
                reject(err);
            }
            else {
                resolve({skeletonHtml: skeletonHtml});
            }
        });
    });
});
