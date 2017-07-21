<template>
    <div class="favor-list-wrapper">
        <div class="favor-list-container">
            <div class="favor-list-header">
                <v-btn class="white--text" ripple icon @click.native="$router.go(-1)">
                    <v-icon class="app-header-icon">arrow_back</v-icon>
                </v-btn>
                <span>收藏夹</span>
                <v-icon class="delete white--text" @click="toggleDelete" :class="{shaking:showDelete}">delete_forever</v-icon>
            </div>
            <div v-if="newsFavorList.length <= 0" class="favor-list-null">
                <span>这里空空的</span>
            </div>

            <transition-group name="favor-item-fold" v-else tag="ul" class="favor-list-content">
                <li
                    v-for="item in newsFavorList" :key="item.nid"
                    v-ripple="{class: 'grey--text'}"
                    class="favor-list-item"
                    @click.stop="closeAndGo(item.nid, $event)">
                    <v-icon v-if="showDelete" class="news-delete">highlight_off</v-icon>
                    <div>
                        <p class="news-title">{{ item.title }}</p>
                        <p class="news-date">收藏时间：{{ item.time | dateFormat('yyyy年M月d日 h时m分') }}</p>
                    </div>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'Favor',
    data() {
        return {
            showDelete: false
        };
    },
    computed: {
        ...mapGetters([
            'newsFavorList'
        ])
    },
    methods: {
        ...mapActions([
            'removeFavorItem'
        ]),
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        closeAndGo(nid, evt) {
            if (this.showDelete) {
                if (evt.target.className.indexOf('news-delete') !== -1) {
                    this.removeItem(nid);
                }
                return;
            }
            this.$router.push('/detail/' + nid);
        },
        removeItem(nid) {
            this.removeFavorItem({nid});
        },
        toggleDelete() {
            this.showDelete = !this.showDelete;
        },
        handleClickBack() {

        }
    },
    activated() {
        this.$store.dispatch('getNewsFavorList');

        this.setAppHeader({
            show: false,
            title: '收藏夹',
            showMenu: false,
            showBack: false,
            showLogo: false,
            actions: [
                {
                    icon: 'delete_forever'
                }
            ]
        });
    },
    deactivated() {
        this.showDelete = false;
    }
};
</script>

<style lang="stylus" scoped>
$padding = 10px

.favor-list-header
    height: $app-header-height
    line-height: $app-header-height
    background: $theme.primary
    color: #fff
    font-size 1.2em
    padding-right: $padding
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)

    .delete
        float: right
        line-height: inherit

.favor-list-content
    list-style: none
    padding: 0 0 $app-header-height 0
    overflow-y auto
    height: 100%

.favor-list-item
    position: relative
    padding: $padding
    display: flex

    >div
        flex: auto
        overflow: hidden

    p
        margin: 0

    .news-title
        font-size: 1.3em
        color: #333
        margin-bottom: 5px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis

    .news-date
        font-size: 0.9em
        color: #999

    .news-delete
        color: #e5e5e5
        flex: none
        margin-right: 10px

.favor-list-null
    padding-top: 50px
    font-size: 1.2em
    color: #888
    text-align: center

    img
        width: 40%
        vertical-align: middle

.shaking
    animation: shake .3s infinite

@keyframes shake
{
    0% {transform: rotate(0deg)}
    25% {transform: rotate(20deg)}
    50% {transform: rotate(0deg)}
    75% {transform: rotate(-20deg)}
    100% {transform: rotate(0deg)}
}

.favor-item-fold-enter-active,
.favor-item-fold-leave-active
    transition: all .7s

.favor-item-fold-enter,
.favor-item-fold-leave-to
    opacity: 0;
    transform: translateY(30px);

</style>