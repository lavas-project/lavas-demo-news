<template>
    <div class="menu-tabs">
        <div class="menu-tabs-wrap" :style="{width: len * 72 + 'px'}">
            <div class="menu-tabs-item"
                v-for="(item, i) in tabs"
                @click="selectItem(item)">
                <span :class="{active: item.active}">{{item.text}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    name: 'menu-tabs',

    props: ['tabs'],

    data() {
        return {};
    },

    created() {
    },

    computed: {
        len() {
            return this.tabs.length;
        }
    },

    methods: {
        selectItem(item) {
            // this.$store.dispatch('selectTab', item);
            this.$router.push('/home/' + item.value);
        }
    }
};
</script>

<style lang="stylus" scoped>

$btn-color = #fff
$height = 40px

.menu-tabs
    background: $theme.primary
    border-top 1px solid #5dabf0
    height $height
    overflow scroll

    // 隐藏掉scrollbar
    &::-webkit-scrollbar
        width 0px
        height 0px
        background transparent

    &-wrap
        display flex


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