/**
 * @file webpack server side render config
 * @author sekiyika(pengxing@baidu.com)
 */

const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.conf');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');

module.exports = merge(baseConfig, {
    entry: './src/entry-server.js',
    target: 'node',
    devtool: false,
    output: {
        libraryTarget: 'commonjs2'
    },
    // externals: nodeExternals({
    //     whitelist: /\.css$/
    // }),
    plugins: [
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        new VueSSRServerPlugin()
    ]
});
