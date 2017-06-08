<template>
    <div class="ui-menu-tabs">
        <div class="ui-menu-tabs-single" v-show="open">
            <div class="ui-menu-tabs-con">
                <div
                    class="ui-menu-tabs-wrap"
                    :style="{width: this.entrys.length * 72 + 'px'}"
                >
                    <div
                        class="ui-menu-tabs-item"
                        v-for="(item,i) in entrys"
                        v-on:click="selectItem(i)"
                    >
                        <span v-bind:class="{active: item.active}">{{item.text}}</span>
                    </div>
                </div>
            </div>
            <div
                class="ui-menu-tabs-toggle"
                v-on:click="toggleOpen"
            >
                <v-icon class="ui-menu-tabs-icon">keyboard_arrow_down</v-icon>
            </div>
        </div>
        <div class="ui-menu-tabs-all" v-show="!open">
            <div class="ui-menu-tabs-con">
                <label>切换频道</label>
            </div>
            <div
                class="ui-menu-tabs-toggle"
                v-on:click="toggleOpen"
            >
                <v-icon class="ui-menu-tabs-icon">keyboard_arrow_up</v-icon>
            </div>
            <div class="ui-menu-tabs-list">
                <div
                    class="ui-menu-tabs-item"
                    v-for="(item,i) in entrys"
                    v-on:click="selectItem(i)"
                >
                    <span v-bind:class="{active: item.active}">{{item.text}}</span>
                </div>
            </div>
            <div class="ui-menu-tabs-mask" v-on:click="toggleOpen"></div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            entrys: {
                type: Array
            }
        },

        data() {
            return {
                open: true
            }
        },

        created() {
            this.entrys[0].active = true;
        },

        methods: {
            toggleOpen() {
                this.open = !this.open;
            },

            selectItem(index) {
                let me = this;
                me.entrys.forEach((item, i) => {
                    Vue.set(me.entrys[i], 'active', i === index);
                });

                // todo: 请求列表页数据了
            }
        }
    };

</script>


<style lang="stylus" scoped>
    .ui-menu-tabs-all
        background #3e98f0
        border-top 1px solid #5dabf0
        height 40px
        display flex
        position relative
        .ui-menu-tabs-item
            width: 12.6667%;
            margin 0 2%
        .ui-menu-tabs-mask
            position fixed
            left 0
            right 0
            top 100px
            bottom 0
            background rgba(0, 0, 0, .3)
    .ui-menu-tabs-single
        background #3e98f0
        border-top 1px solid #5dabf0
        height 40px
        display flex
    .ui-menu-tabs-item
        display inline-block
        height 40px
        line-height 40px
        color #fff
        font-size 15px
        width 40px
        text-align center
        margin 0 16px
        span
            display inline-block
            height 38px
            padding 0 4px
        span.active
            border-bottom 2px solid #fff
    .ui-menu-tabs-con
        flex 1
        overflow hidden
        overflow-x auto
        color #fff
        height 100px
        label
            height 40px
            line-height 40px
            padding 0 18px
    .ui-menu-tabs-toggle
        display inline-block
        height 40px
        width 40px
        line-height 40px
        text-align center
        .ui-menu-tabs-icon
            color #fff
    .ui-menu-tabs-list
        position absolute
        border-top 1px solid #5dabf0
        left 0
        right 0
        top 38px
        background #3e98f0
        z-index 200
        padding 10px 0 20px 0
</style>
