<template>
    <div class="carousel-wrapper">
        <transition-group name="carousel" tag="ul" 
            class="carousel-container" :style="{width: containerW + 'px'}">
            <router-link class="carousel-item" tag="li"
                v-for="(item, i) in carouselList"
                :key="item"
                :to="{path:'/detail/' + item.nid}"
                :style="{width: itemW + 'px'}">
                <div class="carousel-item-inner"
                    :style="{backgroundImage:'url(' + item.imageurls[0].url + ')'}">
                </div>
                <div class="carousel-item-title"><p>{{ item.title }}</p></div>
            </router-link>
        </transition-group>
        <div class="carousel-bottom-nav-list" :style="{width: itemW * 0.3 + 'px'}">
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
            return this.carouselList.length * this.itemW;
        }
    },
    created() {
        let list = this.list;
        this.listLen = list.length;
        this.itemW = window.innerWidth;

        this.carouselList = list.slice(0, this.listLen - 1);
        this.idx = this.listLen - 2;
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
                this.idx++;
                if (this.idx >= this.listLen) {
                    this.idx = 0;
                }

                //this.carouselList.push(this.carouselList[0]);
                //this.carouselList.shift();
                this.carouselList.push(this.list[this.idx]);
                this.carouselList.shift();
            }, this.interval);
        },
        pauseSlide() {
            clearInterval(this.loopTimer);
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

.carousel-item
    position: relative

.carousel-item-inner
    width: 100%
    height: 0
    padding-bottom: 75%
    background-repeat: no-repeat
    background-size: cover

.carousel-item-title
    background: linear-gradient(to top,rgba(0,0,0,.7),rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,.1),rgba(255,255,255,0))
    position: absolute
    bottom: 0
    width: 100%
    color: #fff

    p
        width: 70%
        ellipsis()
        padding: 8px 10px
        box-sizing: border-box
        margin: 0

.carousel-bottom-nav-list
    position: absolute
    bottom: 0
    right: 0
    padding: 8px 10px
    display: flex
    justify-content: space-around

.carousel-bottom-nav-item
    font-size: 12px

</style>