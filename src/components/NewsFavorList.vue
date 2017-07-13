<template v-if="show">
    <div class="favor-list-wrapper">
        <app-mask
            :show="show"
            @close-mask="close"
        ></app-mask>
        <div :style="inlineStyle" class="favor-list-container">
            <div class="favor-list-header">收藏夹
                <v-icon class="delete white--text" @click="toggleDelete" :class="{shaking:showDelete}">delete_forever</v-icon>
            </div>
            <ul class="favor-list-content">
                <li v-if="list.length <= 0" class="favor-list-null">这里空空的</li>
                <transition-group name="favor-item-fold" v-else>
                    <li 
                        v-for="item in list" :key="item.nid"
                        class="favor-list-item"
                        @click.stop="closeAndGo(item.nid, $event)">
                        <v-icon v-if="showDelete" class="news-delete">highlight_off</v-icon>
                        <div>
                            <p class="news-title">{{ item.title }}</p>
                            <p class="news-date">收藏时间：{{ item.time | dateFormat('yyyy年M月d日 h时m分') }}</p>
                        </div>
                    </li>
                </transition-group>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
import AppMask from './AppMask.vue';

// 左/右阴影宽度
const BOX_SHADOW_WIDTH = 12;

export default {
    name: 'newsFavorList',

    components: {
        AppMask
    },
    props: {
        show: {
            default: false
        },
        list: {
            required: true
        }
    },
    data() {
        return {
            translateX: 0,
            clientWidth: 0,
            widthInPx: 0,
            slideFrom: 'left',
            width: 0.85,
            showDelete: false
        };
    },
    filters: {
        dateFormat(date = Date.now(), fmt) {
            date = new Date(date);
            var o = {
                'M+': date.getMonth() + 1, // 月份
                'd+': date.getDate(), // 日
                'h+': date.getHours(), // 小时
                'm+': date.getMinutes(), // 分
                's+': date.getSeconds(), // 秒
                'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                'S': date.getMilliseconds() // 毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))
                    );
                }
            }
            return fmt;
        }
    },
    computed: {
        inlineStyle() {

            // 拖拽时取消transition
            let transition = 'transform .5s ease';

            // 隐藏状态时的位置
            let initTranslateX = this.widthInPx + BOX_SHADOW_WIDTH;
            if (this.slideFrom === 'left') {
                initTranslateX = -initTranslateX;
            }

            // 当前水平方向平移距离
            let currentTranslateX = this.show ? 0 : initTranslateX;
            let styleObj = {
                'width': `${this.widthInPx}px`,
                'transition': transition,
                '-webkit-transition': transition,
                'transform': `translate3d(${currentTranslateX}px, 0, 0)`,
                '-webkit-transform': `translate3d(${currentTranslateX}px, 0, 0)`,
                [this.slideFrom]: 0 // 展示状态绝对定位靠左/右
            };

            return styleObj;
        }
    },
    methods: {
        ...mapActions([
            'removeFavorItem'
        ]),
        caclWidth() {
            this.clientWidth = document.body.clientWidth;

            if (this.width > 1) {
                this.widthInPx = this.width;
            }
            else {
                this.widthInPx = Math.round(this.clientWidth * this.width);
            }
        },
        close() {
            this.$emit('hide-favorList');
            this.translateX = Math.round(-this.widthInPx);
        },
        closeAndGo(nid, evt) {
            if (this.showDelete) {
                if (evt.target.className.indexOf('news-delete') !== -1) {
                    this.removeItem(nid);
                }
                return;
            }
            this.$router.push('/detail/'+ nid);
            this.close();
        },
        removeItem(nid) {
            this.removeFavorItem({nid});
        },
        toggleDelete() {
            this.showDelete = !this.showDelete;
        }
    },
    created() {
        this.caclWidth();
    }
};
</script>

<style lang="stylus" scoped>
$padding = 10px

.favor-list-container
    z-index: 9999
    position: fixed
    top: 0
    height: 100%
    background: #fff
    box-shadow 3px 0 8px 1px rgba(0, 0, 0, 0.4)

.favor-list-header
    height: $app-header-height
    line-height: $app-header-height
    background: $theme.primary
    color: #fff
    font-size 1.2em
    padding: 0 $padding
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)
    position: fixed
    top: 0
    width: 100%

    .delete
        float: right
        line-height: inherit

.favor-list-content
    list-style: none
    padding: $app-header-height 0 0 0
    overflow-y auto

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
    padding: $padding
    font-size: 1.2em
    color: #888

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