/**
 * @file 生产环境 webpack 配置文件
 * @author huanghuiquan(huanghuiquanhhh@gmail.com)
 */

'use strict';

/* eslint-disable fecs-no-require */

const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const SwRegisterWebpackPlugin = require('sw-register-webpack-plugin');
const MultiPathWebpackPlugin = require('multi-path-webpack-plugin');

let env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : config.build.env;

let webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [

        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),

        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),

        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),

        new SkeletonWebpackPlugin({
            webpackConfig: require('./webpack.skeleton.conf')
        }),

        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true

                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            favicon: utils.assetsPath('img/icons/favicon.ico'),
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),

        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource
                    && /\.js$/.test(module.resource)
                    && module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                );
            }
        }),

        // split vue, vue-router, vue-meta and vuex into vue chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vue',
            minChunks(module, count) {
                // On Windows, context will be seperated by '\',
                // then paths like '\node_modules\vue\' cannot be matched because of '\v'.
                // Transforming into '::node_modules::vue::' can solve this.
                let context = module.context;
                let matchContext = context ? context.split(path.sep).join('::') : '';
                let targets = ['vue', 'vue-router', 'vuex'];
                // /^(vue|vue-router)$/i
                let npmRegExp = new RegExp(targets.join('|'), 'i');
                // /^(_vue@2.4.2@vue|_vue-router@1.2.3@vue-router)$/i
                let cnpmRegExp = new RegExp(targets.map(t => `_${t}@\\d\\.\\d\\.\\d@${t}`).join('|'), 'i');

                return context
                    && matchContext.indexOf('node_modules') !== -1
                    && (npmRegExp.test(matchContext) || cnpmRegExp.test(matchContext));
            }
        }),

        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vue']
        }),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*'],
                transform(context, p) {
                    if (/manifest\.json$/.test(p)) {
                        try {
                            /* eslint-disable fecs-camelcase */
                            let data = JSON.parse(context);
                            data.start_url = config.build.assetsPublicPath;
                            /* eslint-enable fecs-camelcase */
                            context = JSON.stringify(data);
                        }
                        catch (e) {}
                    }
                    return context;
                }
            }
        ]),

        // service worker caching
        new SWPrecacheWebpackPlugin(config.swPrecache.build),
        new SwRegisterWebpackPlugin({
            filePath: path.resolve(__dirname, '../src/sw-register.js')
        }),
        new MultiPathWebpackPlugin({})
    ]
});

if (config.build.productionGzip) {
    let CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(''
                + '\\.('
                + config.build.productionGzipExtensions.join('|')
                + ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
