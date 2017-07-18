<template>
    <div class="b-loading" v-show="show">
        <div class="b-loading-logo-wrap">
            <div class="b-loading-logo"></div>
            <div class="b-loading-anim"></div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'b-loading',
    props: {
        show: Boolean
    },
    data() {
        return {};
    },
    computed: {
    }
};
</script>

<style lang="stylus" scoped>
$logo = 'https://gss0.bdstatic.com/5foIcy0a2gI2n2jgoY3K/n/nvn/static/news/imgs/new-loading-logo_455e47c.png';
$anim-pic = 'https://gss0.bdstatic.com/5foIcy0a2gI2n2jgoY3K/n/nvn/static/news/imgs/new-loading-anim_3d81075.png'

@keyframes new-loading-anim {
    0% {
        left -80px
    }
    100% {
        left 170px
    }
}

.b-loading
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    display inline-block
    background-color #fff
    text-align center

.b-loading-text
    color #888
    font 400 16px/30px normal

.b-loading-logo-wrap
    margin-top 210px
    height 60px
    width 150px
    display inline-block
    position relative

.b-loading-logo
    height 60px
    width 150px
    display inline-block
    background url($logo) 0 0 no-repeat
    background-size 100%
    opacity .7

.b-loading-anim
    position absolute
    width 60px
    height 60px
    background url($anim-pic) center center no-repeat
    top 0
    left -80px
    background-size cover
    animation new-loading-anim 1s linear infinite

</style>