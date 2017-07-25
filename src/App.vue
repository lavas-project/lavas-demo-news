<template>
    <div id="app">
        <div class="app-shell">
            <app-header
                class="app-shell-header"
                @click-menu="handleClickHeaderMenu"
                @click-back="handleClickHeaderBack">
                <template slot="logo"></template>
            </app-header>

            <app-sidebar @hide-sidebar="hideSidebar" @show-sidebar="showSidebar"></app-sidebar>
            <div class="app-view-wrapper" ref="appViewWrapper"
                :class="{
                    'app-view-with-header': appHeader.show
                }">
                <transition
                    :name="pageTransitionName"
                    @before-enter="handleBeforeEnter"
                    @after-enter="handleAfterEnter"
                    @after-leave="handleAfterLeave">
                    <keep-alive>
                        <router-view
                            v-if="!$route.meta.notKeepAlive"
                            class="app-view"
                            :class="{
                                'overflow-scrolling-touch': !previewShow
                            }"></router-view>
                    </keep-alive>
                </transition>
                <transition
                    :name="pageTransitionName"
                    @before-enter="handleBeforeEnter"
                    @after-enter="handleAfterEnter"
                    @after-leave="handleAfterLeave">
                    <router-view
                        v-if="$route.meta.notKeepAlive"
                        class="app-view"
                        :class="{
                            'overflow-scrolling-touch': !previewShow
                        }"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>

import EventBus from '@/event-bus';
import {mapState, mapActions, mapGetters} from 'vuex';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';

export default {
    name: 'app',
    components: {
        AppHeader,
        AppSidebar
    },
    computed: {
        ...mapState('appShell', [
            'appHeader',
            'appSidebar',
            'pageTransitionName',
            'historyPageScrollTop'
        ]),
        ...mapGetters([
            'previewShow'
        ])
    },
    methods: {
        ...mapActions('appShell', [
            'setPageSwitching'
        ]),
        ...mapActions('appShell/appSidebar', [
            'showSidebar',
            'hideSidebar'
        ]),
        handleBeforeEnter(el) {
            this.setPageSwitching(true);
        },
        handleAfterEnter(el) {
            // 动画结束，恢复 body 上的滚动距离
            el.classList.remove('enable-scroll');
            let scrollTop = this.historyPageScrollTop[this.$route.path];
            window.scrollTo(0, scrollTop);
        },
        handleAfterLeave(el) {
            el.classList.remove('enable-scroll');
            this.setPageSwitching(false);
        },
        handleClickHeaderBack() {
            this.$router.go(-1);
        },
        handleClickHeaderMenu() {
            this.showSidebar();
        }
    },
    mounted() {
        let $appView = this.$el.querySelector('.app-view-wrapper');
        let touchStartPosX;
        let touchMoveX;
        let touchStartPosY;
        let touchMoveY;
        let minOffset = 60;

        let touchstart = e => {
            touchStartPosX = e.touches[0].pageX;
            touchStartPosY = e.touches[0].pageY;
        };

        let touchmove = e => {
            touchMoveX = e.touches[0].pageX - touchStartPosX;
            touchMoveY = e.touches[0].pageY - touchStartPosY;
        };

        let touchend = e => {

            // 首页不能继续后退
            if (touchMoveX > minOffset
                && Math.abs(touchMoveY) < minOffset
                && this.$router.currentRoute.path !== '/'
                && !this.previewShow
            ) {
                this.$router.go(-1);
            }
            touchMoveX = 0;
            touchMoveY = 0;

        };

        $appView.addEventListener('touchstart', touchstart);
        $appView.addEventListener('touchmove', touchmove);
        $appView.addEventListener('touchend', touchend);
    }
};
</script>

<style lang="stylus">

@import './assets/styles/global'

#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    height: 100%

</style>

<style lang="stylus" scoped>
.app-shell
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    height 100%
    width 100%

    .app-shell-header
        position fixed
        top 0
        left 0
        right 0
        z-index: 100

    .app-view-wrapper
        position absolute
        top 0
        left 0
        right 0
        bottom 0

        &.app-view-with-header
            top $app-header-height

        &.app-view-with-footer
            bottom $app-footer-height

        .app-view
            // transform translate(0, 0)
            transition transform 0.4s cubic-bezier(.55, 0, .1, 1)
            background: $material-theme.bg-color
            color: $material-theme.text-color

            &.overflow-scrolling-touch
                -webkit-overflow-scrolling touch

            // 隐藏掉scrollbar
            &::-webkit-scrollbar
                width 0px
                background transparent

            &.slide-left-enter
                transform translate(100%, 0)

            &.slide-right-enter
                transform translate(-100%, 0)

            &.slide-right-leave-active
                transform translate(100%, 0)

            &.slide-left-leave-active
                transform translate(-100%, 0)
                
            &.slide-left-enter-active,
            &.slide-left-leave-active,
            &.slide-right-enter-active,
            &.slide-right-leave-active
                position absolute
                top 0
                left 0
                right 0
                overflow-y auto
                bottom 0
                
            &.enable-scroll
                position absolute
                top 0
                left 0
                right 0
                overflow-y auto
                bottom 0
</style>
