<template>
    <div :class="{'menu-tabs': true, opend: opend}">
        <div class="menu-tabs-wrap" :style="{width: len * tabWidth + 40 + 'px'}">
            <div class="menu-tabs-item"
                v-for="(item, i) in menuTabs"
                @click="selectItem(item)">
                <span :class="{active: item.active}">{{item.text}}</span>
            </div>
        </div>
        <div class="edit" @click="toggleEditWrapper"><span>+</span></div>
        <div class="edit-wrapper">
            <div class="edit-wrapper-inner">
                <p class="title">我的栏目<span>点击删除</span></p>
                <transition-group class="edit-menu-tabs-wrapper" @leave="leave" @enter="enter">
                    <div class="edit-menu-tabs-item selected"
                        v-for="(item, i) in menuTabs"
                        v-if="i !== 0"
                        @click="delItemToSelected(item)"
                        :key="item.value">
                        <span :class="{active: item.active}">- {{item.text}}</span>
                    </div>
                </transition-group>
                <p class="title">推荐栏目<span>点击添加</span></p>
                <transition-group class="edit-menu-tabs-wrapper" @leave="leave" @enter="enter">
                    <div class="edit-menu-tabs-item"
                        v-for="(item, i) in otherMenuTabs"
                        @click="addItemToSelected(item)"
                        :key="item.value">
                        <span>+ {{item.text}}</span>
                    </div>
                </transition-group>
            </div>
        </div>
        <div class="menu-tab-mask" @click="toggleEditWrapper"></div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import * as types from '../store/mutation-types';
export default {
    name: 'menu-tabs',

    data() {
        return {
            opend: false,
            tabWidth: 72
        };
    },

    created() {
    },

    mounted() {
        this.setMenuTabsPos();
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
            types.ADD_CATEGORY,
            types.DEL_CATEGORY
        ]),
        selectItem(item) {
            // this.$store.dispatch('selectTab', item);
            this.$router.push('/home/' + item.value);
        },
        toggleEditWrapper() {
            this.opend = !this.opend;
        },
        addItemToSelected(tabItem) {
            this[types.ADD_CATEGORY](tabItem);
        },
        delItemToSelected(tabItem) {

            if (tabItem.active) {
                this.selectItem(this.menuTabs[0]);
            }

            this[types.DEL_CATEGORY](tabItem);

        },
        setMenuTabsPos() {
            let activeIndex = 0;
            this.menuTabs.forEach((item, index) => {
                if (item.active) {
                    activeIndex = index;
                }
            });
            this.$el.scrollLeft = this.tabWidth * activeIndex - 30;
        },
        leave(el) {
            el.style.display = 'none';
        },
        enter(el) {
            el.style.opacity = 0;
            setTimeout(() => el.style.opacity = 1, 250);
        }
    }
};
</script>

<style lang="stylus" scoped>

$btn-color = #fff
$height = 40px

.menu-tabs
    background: $theme.primary
    // border-top 1px solid #5dabf0
    height $height
    overflow scroll
    transition: all ease .5s

    // 隐藏掉scrollbar
    &::-webkit-scrollbar
        width 0px
        height 0px
        background transparent

    &-wrap
        display flex
        position: relative
        z-index: 3
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
            transition: transform ease .5s
    .edit-wrapper
        position: absolute
        top: -1px
        height: 0
        width: 100%
        z-index: 2
        transition: height ease .5s
        background: $theme.primary
        margin-top: $height
        box-sizing: border-box
        color: #fff
        overflow: hidden
        font-size: 16px
        &-inner
            margin-top: 20px
            position: relative
        .title
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
            span
                display: block
                margin: 0 5px
                border: solid 1px rgba(255, 255, 255, .6)
                border-radius: 20px
    .menu-tab-mask
        position: absolute
        top: $height
        left: 0
        bottom: 0
        right: 0
        background: rgba(0, 0, 0, .5)
        z-index: 1
        display: none
    &.opend
        .edit
            span
                transform: rotate(45deg)
        .edit-wrapper
            height: 300px
        .menu-tab-mask
            display: block


.menu-tabs-item
    display inline-block
    height $height
    line-height $height
    color $btn-color
    font-size 16px
    width 60px
    text-align center
    margin 0 6px

    span
        display inline-block
        height $height
        padding 0 4px

    span.active
        border-bottom 2px solid $btn-color

</style>
