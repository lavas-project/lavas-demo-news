<template>
    <div class="skeleton-wrapper">
        <section class="skeleton-block">
            <div class="title" v-show="showTitle" ref="title">
                <h1>百度新闻</h1>
                <p>Powerd by Lavas</p>
            </div>
        </section>
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
    background #2874f0

    .skeleton-block
        width 100%
        height 100%
        color #fff
        text-align center

        .title
            position absolute
            left 50%
            top 50%
            transform translate(-50%, -50%)

            h1
                font-size 36px
                color #fff

            p
                font-size 14px
                color #fff


</style>
