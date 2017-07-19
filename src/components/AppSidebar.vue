<template>
    <sidebar v-model="sidebarStatus">
        <!-- sidebar 内容部分 -->
        <div class="app-sidebar-content">
            <!-- 头部 -->
            <div v-if="title" class="app-sidebar-title" @click.stop="close">
                <span class="app-sidebar-title-left-icon">
                    <img v-if="title.imageLeft" :src="title.imageLeft" :alt="title.altLeft" />
                    <icon v-else-if="title.svgLeft" :name="title.svgLeft"></icon>
                    <v-icon light v-else-if="title.iconLeft">{{ title.iconLeft }}</v-icon>
                </span>
                <span>{{ title.text }}</span>
                <slot name="logo" class="app-sidebar-title-right-logo">
                    <span class="app-sidebar-title-right-logo">
                        <img v-if="title.imageRight" :src="title.imageRight" :alt="title.altRight" />
                        <icon v-else-if="title.svgRight" :name="title.svgRight"></icon>
                        <v-icon v-else-if="title.iconRight">{{ title.iconRight }}</v-icon>
                    </span>
                </slot>
            </div>

            <!-- 导航列表分区块 -->
            <div v-if="blocks" class="app-sidebar-blocks">
                <ul>
                    <!-- 单个区块 -->
                    <li v-for="block in blocks" class="app-sidebar-block">
                        <div v-if="block.sublistTitle" class="sub-list-title">{{ block.sublistTitle }}</div>
                        <ul v-if="block.sublist" class="app-sidebar-block-sublist">
                            <li v-for="item in block.sublist" @click.stop="tip(item.route)" class="sub">
                                <span v-if="item.icon || item.image || item.svg " class="app-sidebar-block-left-icon">
                                    <img v-if="item.image" :src="item.image" :alt="item.alt" />
                                    <icon v-else-if="item.svg" :name="item.svg"></icon>
                                    <v-icon v-else-if="item.icon" :class="item.color + '--text'">{{ item.icon }}</v-icon>
                                </span>
                                <p v-if="item.text" class="app-sidebar-block-text">{{ item.text }}</p>
                            </li>
                        </ul>

                        <ul v-if="block.list" class="app-sidebar-block-list">
                            <v-divider light></v-divider>
                            <template v-for="item in block.list">
                                <li @click.stop="tip(item.route)">
                                    <span v-if="item.icon || item.image || item.svg " class="app-sidebar-block-left-icon">
                                        <img v-if="item.image" :src="item.image" :alt="item.alt" />
                                        <icon v-else-if="item.svg" :name="item.svg"></icon>
                                        <v-icon v-else-if="item.icon">{{ item.icon }}</v-icon>
                                    </span>
                                    <span v-if="item.text" class="app-sidebar-block-text">{{ item.text }}</span>
                                    <span v-if="item.iconRight || item.imageRight || item.svgRight " class="app-sidebar-block-right-icon">
                                        <img v-if="item.imageRight" :src="item.imageRight" :alt="item.altRight" />
                                        <icon v-else-if="item.svgRight" :name="item.svgRight"></icon>
                                        <v-icon v-else-if="item.iconRight">{{ item.iconRight }}</v-icon>
                                    </span>
                                </li>
                                <v-divider light></v-divider>
                            </template>
                        </ul>
                    </li>
                </ul>
            </div>
            <v-alert info value="true" v-if="showDemoTip" class="app-sidebar-tip">我只是个demo</v-alert>
        </div>
    </sidebar>
</template>

<script>
import {mapState} from 'vuex';
import Sidebar from './Sidebar';

export default {
    components: {
        Sidebar
    },
    computed: {
        ...mapState('appShell/appSidebar', [
            'show',
            'title',
            'user',
            'blocks'
        ]),
        sidebarStatus: {
            get() {
                return this.show;
            },
            set(val) {
                if (val) {
                    this.$emit('show-sidebar');
                }
                else {
                    this.$emit('hide-sidebar');
                }
            }
        }
    },
    data() {
        return {
            showDemoTip: false
        };
    },
    methods: {
        close() {
            this.sidebarStatus = false;
        },
        closeAndGo(route) {
            this.$router.push(route);
            this.close();
        },
        tip(route) {
            if (route) {
                this.closeAndGo(route);
                return;
            }

            this.showDemoTip = true;
            setTimeout(() => {
                this.showDemoTip = false;
            }, 3000);
        },
    }
};
</script>

<style lang="stylus" scoped>
ul,li
    padding 0
    margin 0
    list-style none
a
    text-decoration none
    color #333

.app-sidebar-content
    &.app-sidebar-content-right
        box-shadow -3px 0 8px 1px rgba(0, 0, 0, 0.4)

        &.app-sidebar-title,
        &.app-sidebar-blocks
            text-align right

    .app-sidebar-title-left-icon,
    .app-sidebar-block-left-icon,
    .app-sidebar-block-right-icon
        display inline-block
        width ($app-sidebar-left-icon-size + 10)px
        height 100%

        img
            vertical-align middle
            width ($app-sidebar-left-icon-size)px
            height ($app-sidebar-left-icon-size)px
        svg
            position relative
            left 0
            top 0
            transform none
            vertical-align middle
            height ($app-sidebar-left-icon-size)px
            width ($app-sidebar-left-icon-size)px

        .material-icons
            font-size ($app-sidebar-left-icon-size)px

    .app-sidebar-block-right-icon
        float: right

    .app-sidebar-block-text
        display inline-block
        height 100%
        vertical-align middle

    .app-sidebar-title-right-logo,
    .app-sidebar-block-right-logo
        float right

        img
            width 20px
            height 20px
            margin-right 10px

    .app-sidebar-block-sublist
        display: flex
        background: $material-theme.bg-color
        font-size: 0

        .sub
            flex: auto
            text-align: center
            padding 0!important
            border-right 1px solid #e0e0e0

            &:last-of-type
                border-right none

            &:first-of-type
                color: #f24

            .app-sidebar-block-text
                margin: 0
                font-size: 14px

    .app-sidebar-block-list
        margin-top: 20px
        background: $material-theme.bg-color

    .app-sidebar-title
        color #fff
        padding 0 10px
        font-size 16px
        font-weight bold
        height $app-sidebar-title-height
        line-height $app-sidebar-title-height
        background: $theme.primary
        text-align center

    .app-sidebar-blocks
        text-align left

        .app-sidebar-block
            // padding 10px 0
            border-bottom 1px solid #e0e0e0
            color #333

            .sub-list-title
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height
                text-indent ($app-sidebar-left-icon-size + 28)px
                font-weight bold
                color #888

            li
                padding-left 15px
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height


                &:last-child
                    border none

            &:last-child
                border-bottom none

.app-sidebar-tip
    position: absolute
    bottom: 0
    width: 100%
</style>
