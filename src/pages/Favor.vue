<template>
    <div class="favor-list-wrapper">
        <div class="favor-list-container">
            <transition-group name="favor-item-fold" v-if="newsFavorList && newsFavorList.length > 0" tag="ul" class="favor-list-content">
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
            <div v-else class="favor-list-null">
                <span>这里空空的</span>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import EventBus from '@/event-bus';

export default {
    name: 'favor',
    data() {
        return {
            showDelete: false,
            action: {
                toggleIcon: 'delete_forever',
                toggle: true,
                toggleHandler: 'toggleDelete',
                toggleClassObj: {
                    shaking: false
                }
            }
        };
    },
    computed: {
        ...mapState({
            newsFavorList(state) {
                return state.favor.newsFavorList;
            }
        })
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
        toggleDelete(showDelete) {
            this.showDelete = typeof showDelete !== 'undefined' ? showDelete : !this.showDelete;

            Object.assign(this.action.toggleClassObj, {
                shaking: this.showDelete
            });
            this.setAppHeader({
                actions: [this.action]
            });
        }
    },
    created() {
        EventBus.$on('app-header:click-toggle', data => {
            this[data.handler] && this[data.handler]();
        });
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: '收藏夹',
            showMenu: false,
            showBack: true,
            showLogo: false,
            actions: [this.action]
        });
    },
    deactivated() {
        this.toggleDelete(false);
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

.favor-item-fold-enter-active,
.favor-item-fold-leave-active
    transition: all .7s

.favor-item-fold-enter,
.favor-item-fold-leave-to
    opacity: 0;
    transform: translateY(30px);

</style>
<style lang="stylus">
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
</style>