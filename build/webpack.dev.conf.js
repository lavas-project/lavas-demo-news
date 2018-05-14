/**
 * @file 开发环境 webpack 配置文件
 * @author huanghuiquan(huanghuiquanhhh@gmail.com)
 */

'use strict';

const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
            .concat(SkeletonWebpackPlugin.loader({ // visit by route '/skeleton' in dev mode
                resource: resolve('src/router.js'),
                options: {
                    entry: 'skeleton',
                    routePathTemplate: '/skeleton'
                }
            }))
    },

    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].css')
        }),

        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: './src/entry-skeleton.js'
            }
        }),

        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            cache: false,
            favicon: utils.assetsPath('img/icons/favicon.ico')
        }),

        new FriendlyErrorsPlugin()
    ]
});
