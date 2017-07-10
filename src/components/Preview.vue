<template>
    <transition>
        <div class="preview" v-show="show" @click.stop="toggleInfo">
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
import IScroll from 'iscroll'
import {mapActions, mapGetters} from 'vuex';

let ww = window.innerWidth;
let wh = window.innerHeight;

export default {
    name: 'previewer',
    props: [
        'imageList',
        'show'
    ],
    data() {
        return {
            showInfo: true,
            curIndex: 1
        }
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
            this.showInfo = !this.showInfo;
        },
        close() {
            if (this.iscroll) {
                setTimeout(() => {
                    this.iscroll.destroy();
                    this.iscroll = null;
                }, 200);
            }
            this.$emit('click-close');
        }
    },
    updated() {
        if (!this.iscroll) {
            this.iscroll = new IScroll(this.$refs.wrapper, {
                snap: 'li',
                scrollX: true,
                scrollY: false,
                click: true,
                momentum: false
            });

            this.curIndex = 1;

            let vm = this;
            this.iscroll.on('scrollEnd', function () {
                vm.curIndex = this.currentPage.pageX + 1;
            });
        }

    },
    mounted() {

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