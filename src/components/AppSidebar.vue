<template>
    <sidebar v-model="sidebarStatus" :enableSwipeOut="enableSwipeOut">
        <!-- sidebar 内容部分 -->
        <div
            class="app-sidebar-content">
            <!-- 头部 -->
            <div class="app-sidebar-header">
                <div class="user-avatar">
                    <v-icon light class="user-avatar-icon">face</v-icon>
                 </div>
                 <div v-if="user" class="user-info">
                     <div class="user-name"><v-icon>person</v-icon>{{user.name}}</div>
                     <div class="user-location"><v-icon>room</v-icon>{{user.location}}</div>
                     <div class="user-email"><v-icon>email</v-icon>{{user.email}}</div>
                 </div>
                 <p v-else @click="login" class="user-login">登录</p>
            </div>

            <!-- 导航列表分区块 -->
            <div v-if="blocks" class="app-sidebar-blocks">
                <ul>
                    <!-- 单个区块 -->
                    <li v-for="(block, index) in blocks" :key="index" class="app-sidebar-block">
                        <div v-if="block.sublistTitle" class="sub-list-title">{{ block.sublistTitle }}</div>
                        <ul v-if="block.list">
                            <li v-for="item in block.list" :key="item.text" @click.stop="closeAndGo(item.route)" v-ripple="{class: 'grey--text'}">
                                <span v-if="item.icon || item.image || item.svg " class="app-sidebar-block-left-icon">
                                    <img v-if="item.image" :src="item.image" :alt="item.alt"></img>
                                    <icon v-else-if="item.svg" :name="item.svg"></icon>
                                    <v-icon v-else-if="item.icon" class="grey--text text--lighten-1">{{ item.icon }}</v-icon>
                                </span>
                                <span v-if="item.text" class="app-sidebar-block-text">{{ item.text }}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <transition name="toast"><p v-if="toast" class="app-sidebar-toast">Only a demo</p></transition>
        </div>
        <login :show="showLogin" @close-login="closeLogin"></login>
    </sidebar>
</template>

<script>
import {mapState} from 'vuex';
import Sidebar from './Sidebar';
import Login from './Login';

export default {
    data() {
        return {
            toast: false,
            showLogin: false
        };
    },
    components: {
        Sidebar,
        Login
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
    methods: {
        close() {
            this.sidebarStatus = false;
        },
        closeAndGo(route) {
            if (!route) {
                clearTimeout(this.timer);
                this.toast = true;
                this.timer = setTimeout(() => {
                    this.toast = false;
                }, 2500);
                return;
            }

            this.$router.push(route);
            this.close();
        },
        login() {
            this.showLogin = true;
        },
        closeLogin() {
            this.showLogin = false;
        }
    }
};
</script>

<style lang="stylus" scoped>
// 左侧触发滑动宽度
$swipe-width = 20px

ul,li
    padding 0
    margin 0
    list-style none
a
    text-decoration none
    color #333

p
    margin 0

.app-sidebar-header
    background: $theme.primary
    padding: 10px
    text-align: center
    color: #fff
    display: flex

    .user-avatar
        justify-content center
        align-items center
        margin-right: 7px

        i
            font-size: 50px
            height: 100%

    .user-login
        line-height: 50px
        font-size: 18px
        //margin-left: 60px
        text-align: left

    .user-info
        // padding 10px 0
        text-align: left
        //margin-left: 60px

        >div
            margin 5px 0

            i
                font-size 18px
                margin-right 5px


.app-sidebar-content
    &.app-sidebar-content-right
        box-shadow -3px 0 8px 1px rgba(0, 0, 0, 0.4)

        &.app-sidebar-title,
        &.app-sidebar-blocks
            text-align right

    .app-sidebar-title-left-icon,
    .app-sidebar-block-left-icon
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


    .app-sidebar-title
        color #fff
        padding 0 10px
        font-size 16px
        font-weight bold
        height $app-sidebar-title-height
        line-height $app-sidebar-title-height
        background: $theme.primary
        text-align left

    .app-sidebar-user
        padding 0 10px
        font-size 16px
        .user-avatar
            margin 30px auto 0 auto
            height 80px
            width 80px

            i
                font-size 80px
                height: 100%
                color #666
        .user-info
            padding 10px 0 20px
            text-align center
            border-bottom 1px solid #e0e0e0
            >div
                margin 5px 0
                i
                    font-size 18px
                    margin-right 5px

    .app-sidebar-blocks
        text-align left

        .app-sidebar-block
            padding 10px 0
            border-bottom 1px solid #e0e0e0
            color #333
            position: relative

            .sub-list-title
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height
                text-indent ($app-sidebar-left-icon-size)px
                font-weight bold
                color #888

            li
                padding-left 15px
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height
                position relative

                &:last-child
                    border none

            &:last-child
                border-bottom none

.app-sidebar-toast
    position: absolute
    bottom: 20px
    left: 50%
    transform: translateX(-50%)
    border-radius: 4px
    padding: 10px 30px
    background:rgba(0,0,0,0.52)
    color: #fff
    font-size: 14px

.toast-leave-active, .toast-enter-active
  transition: all .5s ease

.toast-enter, .toast-leave-to, .toast-leave-active
  transform: translateY(10px) translateX(-50%);
  opacity: 0;

</style>
