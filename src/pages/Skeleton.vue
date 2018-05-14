<template>
    <div class="skeleton-wrapper">
        <section class="skeleton-block">
            <img src="../assets/images/skeleton-logo.jpg" class="skeleton-logo">
            <div class="title" v-show="showTitle" ref="title">
                <img src="../assets/images/skeleton-bg.jpg" class="skeleton-bg">
            </div>
        </section>
    </div>
</template>

<script>

export default {
    name: 'skeleton',
    data() {
        return {
            showTitle: true
        };
    }
};
</script>

<style lang="stylus">

@import '~normalize.css';

.skeleton-wrapper
    background #fff
    height: 100%

    .skeleton-block
        width 100%
        height 100%
        color #fff
        text-align center
        display: flex
        flex-direction: column-reverse

        .title
            width: 100%
            flex: 1
            position: relative
            .skeleton-bg
                width: (530 / 750) * 100%
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
    .skeleton-logo
        width: (350 / 750) * 100%
        margin-bottom: 25px
        position: relative
        left: 50%
        transform: translateX(-50%)

</style>
