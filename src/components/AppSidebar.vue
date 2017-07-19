<template>
    <sidebar v-model="sidebarStatus" :enableSwipeOut="enableSwipeOut">
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
                        <v-container fluid grid-list-sm>
                          <v-layout row wrap>
                            <v-flex xs6 v-for="item in block.sublist" :key="item.text" class="app-block-sublist-item"
                              @click.stop="tip(item.route)">
                              <span class="app-sidebar-block-left-icon">
                                <v-icon :class="item.color + '--text'">{{ item.icon }}</v-icon>
                              </span>
                              <span v-if="item.text" class="app-sidebar-block-text">{{ item.text }}</span>
                            </v-flex>
                          </v-layout>
                        </v-container>

                        <v-list>
                          <template v-for="(item, i) in block.list">
                              <v-list-tile ripple class="app-block-list-item">
                                <v-list-tile-content @click.stop="tip(item.route)">
                                  <v-list-tile-title v-html="item.text"></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-icon>{{ item.iconRight }}</v-icon>
                                </v-list-tile-action>
                              </v-list-tile>
                              <v-divider light v-if="i !== block.list.length - 1"></v-divider>
                          </template>
                        </v-list>
                    </li>
                </ul>
            </div>
            <v-alert info value="true" v-if="showDemoTip" class="app-sidebar-tip">Only a demo</v-alert>
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
            'blocks',
            'enableSwipeOut'
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
            }, 2500);
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
    text-decoration: none
    color: #333
p
    margin: 0

.app-sidebar-content
    &.app-sidebar-content-right
        box-shadow -3px 0 8px 1px rgba(0, 0, 0, 0.4)

        &.app-sidebar-title,
        &.app-sidebar-blocks
            text-align right

    .app-sidebar-title-left-icon,
    .app-sidebar-block-left-icon
        display inline-block
        width ($app-sidebar-left-icon-size + 4)px
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

    .app-sidebar-block-text
        display inline-block
        height 100%
        vertical-align middle
        line-height: 24px
        position: relative
        top: 2px

    .app-sidebar-title
        color #fff
        padding: 0 10px 0 36px
        font-size 16px
        font-weight bold
        height $app-sidebar-title-height
        line-height $app-sidebar-title-height
        background: $theme.primary
        text-align left

    .app-sidebar-blocks
        text-align left

        .app-sidebar-block
            // padding 10px 0
            border-bottom 1px solid #e0e0e0
            color #333

            li
                // padding-left 15px
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height


                &:last-child
                    border none

            &:last-child
                border-bottom none

    .app-block-sublist-item
        border-right: 1px solid #e0e0e0
        text-align: center

        &:last-of-type
            border-right: none

.list__tile
    color: #333!important

.app-sidebar-tip
    position: absolute
    bottom: 0
    width: 100%
</style>
