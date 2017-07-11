<template>
    <div id="app">
        <div class="app-shell">
            <app-header
                class="app-shell-header"
                @click-back="handleClickHeaderBack">
                <template slot="logo"></template>
            </app-header>
            <div class="app-view-wrapper">
                <transition
                    :name="pageTransitionName"
                    @before-enter="handleBeforeEnter"
                    @after-enter="handleAfterEnter">
                    <keep-alive>
                        <router-view
                            v-if="!$route.meta.notKeepAlive"
                            class="app-view"
                            :class="{
                                'app-view-with-header': appHeader.show
                            }"></router-view>
                    </keep-alive>
                </transition>
                <transition
                    :name="pageTransitionName"
                    @before-enter="handleBeforeEnter"
                    @after-enter="handleAfterEnter">
                    <router-view
                        v-if="$route.meta.notKeepAlive"
                        class="app-view"
                        :class="{
                            'app-view-with-header': appHeader.show
                        }"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>

import {mapState, mapActions} from 'vuex';
import AppHeader from '@/components/AppHeader';

export default {
    name: 'app',
    components: {
        AppHeader
    },
    data() {
        return {};
    },
    computed: {
        ...mapState('appShell', [
            'appHeader',
            'pageTransitionName'
        ])
    },
    methods: {
        ...mapActions('appShell', [
            'setPageSwitching'
        ]),
        handleBeforeEnter(el) {
            this.setPageSwitching(true);
        },
        handleAfterEnter(el) {
            this.setPageSwitching(false);
        },
        handleClickHeaderBack() {
            this.$router.go(-1);
        }
    },
    mounted() {
        document.documentElement.style.backgroundColor = '#fff';
    }
};
</script>

<style lang="stylus">

@import './assets/styles/global'

html
    background #2874f0

#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    // text-align center
    color #2c3e50

</style>

<style lang="stylus" scoped>
.app-shell
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    width 100%
    height 100%
    display flex
    flex-direction column

    .app-shell-header
        position fixed
        top 0
        left 0
        right 0
        z-index: 100

    .app-view-wrapper
        flex 1
        position relative
        overflow hidden

        .app-view
            position absolute
            top 0
            right 0
            bottom 0
            left 0
            overflow-x hidden
            overflow-y auto
            transition transform 0.4s cubic-bezier(.55, 0, .1, 1)
            background: $material-theme.bg-color
            color: $material-theme.text-color
            -webkit-overflow-scrolling touch

            // 隐藏掉scrollbar
            &::-webkit-scrollbar
                width 0px
                background transparent

            &.app-view-with-header
                top $app-header-height

            &.app-view-with-footer
                bottom $app-footer-height

            &.slide-left-enter
                transform translate(100%, 0)

            &.slide-right-enter
                transform translate(-100%, 0)

            &.slide-right-leave-active
                transform translate(100%, 0)

            &.slide-left-leave-active
                transform translate(-100%, 0)
</style>
