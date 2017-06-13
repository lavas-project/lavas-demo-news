/**
 * @file server entry
 * @author sekiyika(pengxing@baidu.com)
 */

import Vue from 'vue';
import { createApp } from './app';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp();

        router.push(context.url);

        router.onReady(
            () => {
                const matchedComponents = router.getMatchedComponents();

                if (!matchedComponents) {
                    return reject({ code: 404 });
                }

                resolve(app);
            },
            reject
        );
    });
};
