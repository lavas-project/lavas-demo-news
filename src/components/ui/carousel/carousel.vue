<template>
    <div class="ui-carousel-wrap">
        <div
            class="ui-carousel-inner-wrap"
            v-bind:style="{
                width: wrapWidth + 'px',
                marginLeft: marginLeft + 'px'
            }"
            v-on:touchstart="onTouchstart"
            v-on:touchmove="onTouchmove"
            v-on:touchend="onTouchend"
        >
            <a
                :href="item.url"
                class="ui-carousel-item"
                v-for="(item,i) in items"
                :index="i"
                v-bind:style="{
                    backgroundImage: 'url(' + item.imageurls[0].url + ')',
                    width: windowWidth + 'px'
                }"
            >
                <p class="ui-carousel-item-text">
                    <span>{{item.title}}</span>
                </p>
            </a>
        </div>
        <div class="ui-carousel-nav">
            <span
                v-for="(item, i) in items"
                v-bind:class="{active: item.active}"
            ></span>
        </div>
    </div>
</template>

<script>

    let intervalTimer = null;
    let num = 0;
    let startPos = {};
    let curPos = {};
    let isScroll = 0;

    export default {
        name: 'carousel',
        props: ['items'],
        data() {
            return {
                windowWidth: 0,
                marginLeft: 0
            };
        },

        computed: {
            wrapWidth() {
                return this.windowWidth * this.items.length;
            }
        },

        watch: {
            items() {

                let me = this;
                let len = me.items.length;

                me.items[0].active = true;
                me.windowWidth = document.body.clientWidth;

                clearInterval(intervalTimer);
                intervalTimer = setInterval(() => {
                    let curidx = ++num % len;
                    for (let i = 0, l = me.items.length; i < l; i++) {
                        me.items[i].active = (i === curidx);
                    }
                    me.marginLeft = -(me.windowWidth * curidx);
                }, 5000);
            }
        },

        methods: {
            onTouchstart(e) {
                let touch = e.targetTouches[0];
                startPos = {
                    x: touch.pageX,
                    y: touch.pageY,
                    time: Date.now()
                };

                clearInterval(intervalTimer);
            },

            onTouchmove(e) {
                let touch = e.targetTouches[0];
                let len = this.items.length;

                curPos = {
                    x: touch.pageX - startPos.x,
                    y: touch.pageY - startPos.y,
                    time: Date.now()
                };

                isScroll = Math.abs(curPos.x) < Math.abs(curPos.y) ? 1 : 0;

                // 表示横向滑动
                if (isScroll === 0) {
                }

            },

            onTouchend() {
                let me = this;
                let len = me.items.length;

                intervalTimer = setInterval(() => {
                    let curidx = ++num % len;
                    for (let i = 0, l = me.items.length; i < l; i++) {
                        me.items[i].active = (i === curidx);
                    }
                    me.marginLeft = -(me.windowWidth * curidx);
                }, 5000);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .ui-carousel-wrap
        height 232px
        width 100%
        background-color #000
        position relative
        overflow hidden
        .ui-carousel-inner-wrap
            height 100%
            transition margin-left .5s
    .ui-carousel-nav
        position absolute
        bottom 0
        left 0
        right 0
        text-align right
        padding-right 20px
        z-index 10
        span
            display inline-block
            vertical-align middle
            width 2px
            height 2px
            border-radius 2px
            background #999
            margin-left 6px
        span.active
            width 4px
            height 4px
            border-radius 4px
            background #fff
    .ui-carousel-item
        height 100%
        display inline-block
        background-size cover
        background-position center
        transition .2s ease-out
        p.ui-carousel-item-text
            margin 0
            vertical-align bottom
            padding 0 17px
            text-align left
            font-size 16px
            height 68px
            color #fff;
            background-image linear-gradient(180deg,rgba(0,0,0,0) 0,rgba(0,0,0,.8) 100%)
            overflow hidden
            position absolute
            bottom 0
            width 100%
            box-sizing: border-box
            span
                display inline-block
                height 32px
                line-height 32px
                width 100%
                position absolute
                bottom 0;
</style>
