/**
 * @file 注册 service-worker.js， 并监听 service-worker.js 升级更新
 * @author zoumiaojiang(zoumiaojiang@gmail.com)
 */


if ('serviceWorker' in navigator) {

    /**
     * 处理 service worker 更新
     *
     * @param  {Object} e event source
     */
    const handlerUpdateMessage = e => {

        // 在这里可以检测到 service worker 文件的更新，通常我们建议做页面的 reload

        const metas = document.getElementsByTagName('meta');

        for (let i = 0, len = metas.length; i < len; i++) {
            let meta = metas[i];
            if (meta.name === 'theme-color') {
                meta.content = '#000';
            }
        }

        const refreshHtml = `
            <div class="app-refresh" id="app-refresh">
                <div class="app-refresh-wrap">
                    <span>已更新最新版本</span>
                    <button onclick="location.reload()">点击刷新</button>
                </div>
            </div>
        `;

        const dom = document.createElement('div');
        dom.innerHTML = refreshHtml;
        document.body.appendChild(dom);
        setTimeout(() => document.getElementById('app-refresh').className += ' app-refresh-show', 16);
    };


    navigator.serviceWorker.register('/service-worker.js');

    navigator.serviceWorker.addEventListener('message', e => {
        // received the update message from sw
        if (e.data === 'updateMessage') {
            handlerUpdateMessage(e);
        }
    });

    // handlerUpdateMessage();

}

