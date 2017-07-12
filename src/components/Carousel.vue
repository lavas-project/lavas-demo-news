<template>
    <div class="carousel-wrapper">
        <transition-group name="carousel" tag="ul" 
            class="carousel-container" :style="{width: containerW + 'px'}"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave">
            <li class="carousel-item"
                v-for="(item, i) in carouselList"
                :key="item"
                :style="{width: itemW + 'px'}">
                <div class="carousel-item-inner"
                    :style="{backgroundImage:'url(' + item.imageurls[0].url + ')'}">
                </div>
            </li>
        </transition-group>
        <div class="carousel-bottom-nav-list">
            <v-icon 
                v-for="i in listLen" 
                :key="i"
                :class="{'white--text': slideIdx + 1 === i}"
                class="carousel-bottom-nav-item">fiber_manual_record</v-icon>
        </div>
    </div>
</template>

<script>

export default {
    name: 'carousel',

    props: {
        interval: {
            default: 3000
        },
        list: {
            requires: true
        }
    },
    data() {
        return {
            listLen: 0,
            itemW: 0,
            slideIdx: 0
        };
    },
    computed: {
        containerW() {
            return this.listLen * this.itemW;
        }
    },
    created() {
        let list = this.list;
        this.listLen = list.length;
        this.itemW = window.innerWidth;

        this.carouselList = [];
        Object.assign(this.carouselList, this.list);
    },
    mounted() {
        if (this.listLen > 1) {
            this.startSlide();
        }
    },
    methods: {
        startSlide() {
            this.loopTimer = setInterval(() => {
                this.slideIdx++;
                if (this.slideIdx >= this.listLen) {
                    this.slideIdx = 0;
                }

                this.carouselList.push(this.carouselList[0]);
                this.carouselList.shift();
            }, this.interval);
        },
        pauseSlide() {
            clearInterval(this.loopTimer);
        },
        beforeEnter(el) {
            console.log(el)
        },
        enter(el) {
            console.log(el)
        },
        leave(el) {
            console.log(el)
        }
    }
};
</script>

<style lang="stylus" scoped>
.carousel-wrapper
    overflow: hidden
    width: 100%
    position: relative

.carousel-container
    list-style: none
    display: flex
    position: relative
    padding: 0

.carousel-item-inner
    width: 100%
    height: 0
    padding-bottom: 75%
    background-repeat: no-repeat
    background-size: cover

.carousel-bottom-nav-list
    position: absolute
    bottom: 20px
    left: 50%
    transform: translateX(-50%)

.carousel-bottom-nav-item
    font-size: 14px
    padding-right: 15px

    &:last-of-type
        padding: 0
/*
.carousel-move
    transition: all 1s
*/
</style>