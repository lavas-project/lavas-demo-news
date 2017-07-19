<template>
    <div class="skeleton-wrapper">
        <section class="skeleton-block">
            <div class="title" v-show="showTitle" ref="title">
                <img src="../../static/img/skeleton-bg.jpg" class="skeleton-bg">
            </div>
        </section>
        <img src="../../static/img/skeleton-logo.jpg" class="skeleton-logo">
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'skeleton',
    data() {
        return {
            showTitle: true
        };
    }
};
</script>

<style lang="stylus" scoped>

@import '~normalize.css';

.skeleton-wrapper
    background #fff

    .skeleton-block
        width 100%
        height 100%
        color #fff
        text-align center

        .title
            position absolute
            text-align: center
            width: 100%
            top 50%
            transform translateY(-50%)
            .skeleton-bg
                width: (530 / 750) * 100%
    .skeleton-logo
        width: (350 / 750) * 100%
        position: absolute
        bottom: 30px
        left: 50%
        transform translateX(-50%)


</style>
