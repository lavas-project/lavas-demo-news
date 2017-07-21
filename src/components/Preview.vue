<template>
    <transition>
        <div class="preview" v-show="show" @click.stop="toggleInfo" :style="touchTransiStyle">
            <div class="preview-wrapper" ref="wrapper" :style="wrapperStyle">
                <ul :style="ulStyle">
                    <li v-for="item in imageList" :style="itemStyle">
                        <div class="preview-image">
                            <img :src="item.src" alt="">
                        </div>
                    </li>
                </ul>
            </div>
            <transition>
                <div class="preview-icons" v-show="showInfo">
                    <v-icon light class="" @click.stop="close">close</v-icon>
                </div>
            </transition>
            <transition>
                <div v-show="showInfo" class="preview-footer">
                    <p>
                        <span class="cur-index">{{curIndex}}</span>
                        /
                        <span class="total">{{imageList.length}}</span>
                    </p>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import IScroll from 'iscroll';

let {innerWidth: ww, innerHeight: wh} = window;

export default {
    name: 'previewer',
    props: {
        imageList: Array,
        show: Boolean,
        index: {
            'type': Number,
            'default': 0
        }
    },
    data() {
        return {
            showInfo: true,
            curIndex: 1,
            touchTransiStyle: {}
        };
    },
    computed: {
        itemStyle() {
            return {
                width: ww + 'px',
                height: wh + 'px'
            };
        },
        wrapperStyle() {
            return {
                width: ww + 'px',
                height: wh + 'px'
            };
        },
        ulStyle() {
            return {
                width: this.imageList.length * ww + 'px',
                height: wh + 'px'
            };
        }
    },
    methods: {
        toggleInfo() {
            // this.showInfo = !this.showInfo;
            this.close();
        },
        close() {
            let iscroll = this.iscroll;
            if (iscroll) {
                setTimeout(() => {
                    iscroll.destroy();
                }, 200);
            }

            this.$emit('click-close');
            this.iscroll = null;
        }
    },
    watch: {
        show(val) {
            if (val) {
                this.showInfo = true;
            }
        }
    },
    updated() {
        if (!this.iscroll && this.show) {

            this.iscroll = new IScroll(this.$refs.wrapper, {
                snap: 'li',
                scrollX: true,
                scrollY: false,
                startX: -ww * this.index,
                click: true,
                momentum: true
            });

            this.curIndex = this.index + 1;

            let vm = this;
            this.iscroll.on('scrollEnd', function () {
                vm.curIndex = this.currentPage.pageX + 1;
            });
        }
    },
    mounted() {
        let startPoint;
        let dx;
        let dy;
        let toClose;
        let checked;
        let maxLen = 30;

        let touchstart = e => {
            startPoint = {
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY
            };
            checked = false;
            toClose = true;
            this.touchTransiStyle = {};
        };

        let touchmove = e => {
            if (!toClose) {
                return;
            }

            let touch = e.touches[0];
            dx = touch.clientX - startPoint.clientX;
            dy = touch.clientY - startPoint.clientY;

            if (!checked) {
                // toClose = Math.abs(dy) > Math.abs(dx);
                toClose = dy > Math.abs(dx);
                checked = true;
            }

            if (!toClose) {
                return;
            }

            if (Math.abs(dy) > maxLen) {
                this.close();
                return;
            }

            this.touchTransiStyle = {
                opacity: 1 - Math.abs(dy) / maxLen * .6,
                transform: 'translateY(' + dy + 'px)'
            };

        };

        let touchend = e => {
            this.touchTransiStyle = {};
        };

        this.$el.addEventListener('touchstart', touchstart);
        this.$el.addEventListener('touchmove', touchmove);
        this.$el.addEventListener('touchend', touchend);
        this.$el.addEventListener('touchcancel', touchend);
    }
};
</script>

<style lang="stylus" scoped>
.preview
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #000
    z-index 9999
    color #fff
    height 100%
    transition ease-out 0.2s all

    &.v-enter,
    &.v-leave-active
        transform translateY(100%)

    &-wrapper
        position relative

    ul
        padding 0
        margin 0

    li
        list-style none
        position relative
        float left

    .preview-image
        width 100%
        height 100%

        img
            position absolute
            top 50%
            transform translateY(-50%)
            width 100%

    .preview-icons
        position absolute
        top 0
        right 0
        font-weight light
        padding 5px
        transition .2s ease-in-out all
        opacity 1

        &.v-enter,
        &.v-leave-active
            opacity 0
            transform translateY(-100%)

    .preview-footer
        position absolute
        height 60px
        width 100%
        bottom 0
        text-align center
        transition .2s ease-in-out all

        .cur-index
            font-size 16px

        &.v-enter,
        &.v-leave-active
            opacity 0
            transform translateY(100%)

</style>