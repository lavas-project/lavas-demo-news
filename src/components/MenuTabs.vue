<template>
    <div :class="{'menu-tabs': true, opend: opend}">
        <div class="menu-tabs-wrap" :style="{width: len * 72 + 40 + 'px'}">
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
                <div class="edit-menu-tabs-wrapper">
                    <div class="edit-menu-tabs-item selected"
                        v-for="(item, i) in menuTabs"
                        @click="selectItem(item)">
                        <span :class="{active: item.active}">{{item.text}}</span>
                    </div>
                </div>
                <p class="title">推荐栏目<span>点击添加</span></p>
                <div class="edit-menu-tabs-wrapper">
                    <div class="edit-menu-tabs-item"
                        v-for="(item, i) in otherMenuTabs"
                        @click="addItemToSelected(item)">
                        <span>+ {{item.text}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex';
import * as types from '../store/mutation-types';
export default {
    name: 'menu-tabs',

    data() {
        return {
            opend: false
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
            types.ADD_CATEGORY
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

    // 隐藏掉scrollbar
    &::-webkit-scrollbar
        width 0px
        height 0px
        background transparent

    &-wrap
        display flex
        position: relative
        z-index: 2
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
        top: 0
        height: 0
        width: 100%
        z-index: 1
        transition: height ease .5s
        background: $theme.primary
        margin-top: 40px
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

    &.opend
        .edit
            span
                transform: rotate(45deg)
        .edit-wrapper
            height: 300px


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
        height 38px
        padding 0 4px

    span.active
        border-bottom 2px solid $btn-color

</style>
