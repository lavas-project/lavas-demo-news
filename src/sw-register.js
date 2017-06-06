/**
 * @file 注册 service-worker.js， 并监听 service-worker.js 升级更新
 * @author zoumiaojiang(zoumiaojiang@gmail.com)
 */

/* global window */

(function (window) {

    if ('serviceWorker' in navigator) {

        navigator.serviceWorker
            .register('/service-worker.js')
            .then(function (registration) {
                // console.log('Service Worker Registered');
            });

        navigator.serviceWorker.addEventListener('message', function (e) {
            // received the update message from sw
            if (e.data === 'updateMessage') {
                handlerUpdateMessage(e);
            }
        });

        var handlerUpdateMessage = function (e) {
            // 在这里可以检测到 service worker 文件的更新，通常我们建议做页面的 reload

            location.reload();
        };
    }
})(window);
