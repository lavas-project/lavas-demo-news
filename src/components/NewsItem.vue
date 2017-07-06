<template>
    <router-link :to="'/detail/' + newsItem.nid" class="news-item">
        <!-- 仅一张图时的样式 -->
        <div v-if="newsItem.imageurls.length === 1" class="img-first news-content" >
            <div class="posts" v-if="newsItem.imageurls.length">
                <span v-for="imgUrl in newsItem.imageurls">
                    <img :src="imgUrl.url" alt="">
                </span>
            </div>
            <div class="right-part">
                <div class="list-item-title">{{newsItem.title}}</div>
                <div class="some-icons">
                    <span class="update-time">{{newsItem.show}}</span>
                    <span class="icons">{{newsItem.site}}</span>
                </div>
            </div>
        </div>

        <!-- 非一张图时的样式 -->
        <div v-if="newsItem.imageurls.length !== 1" class="title-first news-content">
            <div class="list-item-title">{{newsItem.title}}</div>
            <div class="posts" v-if="newsItem.imageurls.length">
                <span v-for="imgUrl in newsItem.imageurls">
                    <img :src="imgUrl.url" alt="">
                </span>
            </div>
            <div class="some-icons">
                <span class="update-time">{{newsItem.show}}</span>
                <span class="icons">{{newsItem.site}}</span>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'news-item',
    props: ['newsItem'],
    data() {
        return {}
    }
};
</script>

<style lang="stylus" scoped>
.news-item
    display block
    font-size 16px
    padding 10px
    line-height 16px
    border-bottom 1px solid #eee
    transition: all 1s

    &.item-leave-active
        position absolute

    .news-content
        display inline-block
        width 100%

        .list-item-title
            font-size 16px
            line-height 24px
            color #333

        .posts
            margin-top 5px
            span
                display inline-block
                margin-right 2%
                max-height 111px
                width 32%
                img
                    width 100%
                    display inline-block
                &:last-child
                    margin-right 0

        .some-icons
            color #ccc
            margin-right 3%
            margin-top 3px
            font-size 12px

            .icons
                float right

    .img-first
        .right-part
            width 66%
            float right
            padding-left 10px
        .posts
            width 34%
            display inline-block
            span
                width 100%
                img
                    width 100%

</style>