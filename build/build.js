/*eslint-disable*/

require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');
const webpackSSRConfig = require('./webpack.ssr.conf');
const skeletonPromise = require('./ssr-skeleton');
const SkeletonPlugin = require('./plugins/skeleton-webpack-plugin');

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) {
        throw err;
    }
    skeletonPromise.then(ssrResult => {

        // build front end code
        let promise = new Promise((resolve, reject) => {
            webpackConfig.plugins.push(new SkeletonPlugin(ssrResult));
            webpack(webpackConfig, (err, stats) => {
                if (err) {
                    return reject(err);
                }

                process.stdout.write(stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n\n');

                resolve();
            });
        });

        // build server side code
        let ssrPromise = new Promise((resolve, reject) => {
            webpack(webpackSSRConfig, (err, stats) => {
                if (err) {
                    return reject(err);
                }

                console.log('\n Build Server Side Rendering...\n');
                process.stdout.write(stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n\n');

                resolve();
            });
        });

        Promise.all([promise, ssrPromise])
            .then(() => {
                console.log(chalk.cyan('  Build complete.\n'));
                console.log(chalk.yellow(''
                    + '  Tip: built files are meant to be served over an HTTP server.\n'
                    + '  Opening index.html over file:// won\'t work.\n'
                ));

                process.exit();
            })
            .catch(err => {
                spinner.stop();
                console.error(err);
                process.exit();
            });

    }).catch(err => {
        spinner.stop();
        console.error(err);
        process.exit();
    });
});
