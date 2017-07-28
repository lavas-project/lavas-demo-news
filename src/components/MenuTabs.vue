<template>
    <transition name="slide-left">
        <div :class="{'menu-tabs': true, opend: opend}" v-show="$route.path === '/'" :style="{width: clientWidth + 'px'}">
            <div class="menu-tabs-wrap" ref="menuTabsWrap">
                <div class="menu-tabs-wrap-inner" :style="{width: len * tabWidth + extraWidth + 'px'}">
                    <div class="menu-tabs-item"
                        v-for="(item, i) in menuTabs"
                        @click="selectItem(item)">
                        <span :class="{active: item.active}">{{item.text}}</span>
                    </div>
                </div>
            </div>
            <div class="edit" @click="toggleEditWrapper"><span>+</span></div>
            <div class="edit-wrapper">
                <div class="edit-wrapper-inner">
                    <p class="menu-title">我的栏目<span>点击删除</span></p>
                    <transition-group class="edit-menu-tabs-wrapper" @leave="leave" @enter="enter">
                        <div class="edit-menu-tabs-item"
                            v-for="(item, i) in menuTabs"
                            v-if="i !== 0"
                            @click="delSelectedItem(item)"
                            :key="item.text">
                            <span :class="{active: item.active}">- {{item.text}}</span>
                        </div>
                    </transition-group>
                    <p class="menu-title">推荐栏目<span>点击添加</span></p>
                    <transition-group class="edit-menu-tabs-wrapper" @leave="leave" @enter="enter">
                        <div class="edit-menu-tabs-item"
                            v-for="(item, i) in otherMenuTabs"
                            @click="addItemToSelected(item)"
                            :key="item.text">
                            <span>+ {{item.text}}</span>
                        </div>
                    </transition-group>
                </div>
            </div>
            <div class="menu-tab-mask" @click="toggleEditWrapper"></div>
        </div>
    </transition>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex';
import Iscroll from 'iscroll';
export default {
    name: 'menu-tabs',

    data() {
        return {
            opend: false,
            tabWidth: 72,
            extraWidth: 40,
            clientWidth: document.documentElement.clientWidth
        };
    },

    created() {
    },

    computed: {
        ...mapGetters([
            'menuTabs',
            'otherMenuTabs'
        ]),
        len() {
            return this.menuTabs.length;
        }
    },

    methods: {
        ...mapActions([
            'addCategory',
            'setActiveTab',
            'delCategory'
        ]),
        selectItem(item, noFold) {
            if (!noFold) {
                this.opend = false;
            }
            this.setActiveTab(item.text);
            this.$store.dispatch('selectTab', item.text);
            this.setMenuTabsPos();
            // this.$router.replace('/home/' + item.value);
            // this.$router.push('/home/' + item.value);
        },
        toggleEditWrapper() {
            this.opend = !this.opend;
        },
        addItemToSelected(tabItem) {
            this.addCategory(tabItem);
            this.refreshScroll();
        },
        delSelectedItem(tabItem) {

            if (tabItem.active) {
                this.selectItem(this.menuTabs[0], true);
            }

            this.delCategory(tabItem);
            this.refreshScroll();
        },
        setMenuTabsPos() {
            let activeIndex = 0;
            this.menuTabs.forEach((item, index) => {
                if (item.active) {
                    activeIndex = index;
                    localStorage.setItem('activeTab', `${index}|${item.text}`);
                }
            });

            let menuTabsScroll = this.menuTabsScroll;
            let scrollLeft = this.tabWidth * (activeIndex - 2);
            let maxScrollLeft = Math.abs(menuTabsScroll.maxScrollX);

            if (scrollLeft <= 0) {
                scrollLeft = 0;
            }
            if (scrollLeft > maxScrollLeft) {
                scrollLeft = maxScrollLeft;
            }
            if (scrollLeft !== Math.abs(menuTabsScroll.x)) {
                menuTabsScroll.scrollTo(-scrollLeft, 0, 300);
            }
        },
        leave(el) {
            el.style.display = 'none';
        },
        enter(el) {
            el.style.opacity = 0;
            setTimeout(() => el.style.opacity = 1, 200);
        },
        refreshScroll() {
            setTimeout(() => {
                this.menuTabsScroll.refresh();
            });

        }
    },
    async activated() {
        this.setMenuTabsPos();
    },
    mounted() {
        this.menuTabsScroll = new Iscroll(this.$refs.menuTabsWrap, {
            momentum: true,
            scrollX: true,
            scrollY: false,
            click: true,
            tap: true
        });
    }
};
</script>

<style lang="stylus" scoped>

$btn-color = #fff
$height = 40px

.menu-tabs
    // border-top 1px solid #5dabf0
    // height $height
    position: fixed
    top: $app-header-height
    z-index: 3
    transition transform .4s cubic-bezier(.55, 0, .1, 1)
    overflow: hidden
    &.slide-left-enter,
    &.slide-left-leave-to
        transform translate(-100%)

    &-wrap
        position relative
        background: $theme.primary
        z-index 1

        // 隐藏掉scrollbar
        &::-webkit-scrollbar
            width 0px
            height 0px
            background transparent

    &-wrap-inner
        display flex
        position: relative
        z-index: 3
        min-width: 100%
    .edit
        width: 40px
        height: $height
        position: absolute
        text-align: center
        line-height: $height
        right: 0
        top: 0
        font-size: 24px
        color: #fff
        background: $theme.primary
        z-index: 4
        span
            display: inline-block
            transition: transform ease .25s
    .edit-wrapper
        position: relative
        height: 0
        width: 100%
        z-index: 2
        transition: height cubic-bezier(0.18, 0.89, 0.32, 1.28) 0.4s
        background: $theme.primary
        box-sizing: border-box
        color: #fff
        overflow: hidden
        font-size: 16px
        &-inner
            margin-top: 20px
            position: relative
        .menu-title
            font-size: 16px
            padding-left: 10px
            line-height: 24px
            span
                font-size: 12px
                color: rgba(255, 255, 255, .6)
                margin-left: 5px
        .edit-menu-tabs-wrapper
            margin: 0 5px 10px 5px
            display: block
            &:after
                clear: both
        .edit-menu-tabs-item
            width: 25%
            display: inline-block
            transition: all ease .5s
            text-align: center
            line-height: 30px
            margin-bottom: 10px
            font-size: 14px
            span
                display: block
                margin: 0 5px
                border: solid 1px rgba(255, 255, 255, .6)
                border-radius: 20px
                &.active
                    box-shadow: 0 0 3px 1px rgba(255, 255, 255, .6)
    .menu-tab-mask
        position: fixed
        top: $height
        left: 0
        bottom: 0
        right: 0
        background: rgba(0, 0, 0, .5)
        display: none

    &.opend
        height: 100%
        .edit
            span
                transform: rotate(45deg)
        .edit-wrapper
            height: 380px
        .menu-tab-mask
            display: block


.menu-tabs-item
    display inline-block
    height $height
    line-height $height
    color $btn-color
    font-size 16px
    width 72px
    text-align center

    span
        display inline-block
        height $height
        padding 0 4px

    span.active
        border-bottom 2px solid $btn-color
        font-size 18px
</style>
