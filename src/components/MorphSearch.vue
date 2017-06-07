<template>
    <div class="search-wrapper" :class="{open: open}">
        <div class="search-form">
            <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词" autocapitalize="off" @focus="open = true"/>
        </div>
        <v-btn class="close-btn"
            icon ripple @click.native="open = false">
            <v-icon class="close-icon">close</v-icon>
        </v-btn>
        <v-btn light icon class="search-btn" @click.native="search(query)">
            <v-icon class="search-icon">search</v-icon>
        </v-btn>
        
        <div class="search-history">
            <v-list two-line subheader>
                <v-subheader inset>历史记录</v-subheader>
                <v-list-item
                    v-for="historyItem, idx in history"
                    :key="idx"
                    @click="search(historyItem)">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <v-icon>search</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ historyItem }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn 
                                class="grey--text"
                                icon ripple @click.native.stop="deleteHistory(historyItem)">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                </v-list-item>

            </v-list>
            <!-- <transition name="">

            </transition> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'morphSearch',
    props: {
        history: {
            type: Array
        }
    },
    data() {
        return {
            open: false,
            query: ''
        };
    },
    methods: {
        search(query) {
            if (query) {
                this.open = false;
                this.query = query;
                this.$emit('search', this.query);
            }
        },
        deleteHistory(historyItem) {
            this.$emit('delete-history', historyItem);
        }
    },
    async mounted() {

    }
};
</script>

<style lang="stylus" scoped>
.search-wrapper
    display flex
    align-items center
    z-index 999
        
    .search-form
        flex 1
        display flex
        
        .search-input
            flex 1
            outline none
            font-size 16px
            height 50px
            color: $material-theme.bg-color
            +placeholder()
                color: $material-theme.bg-color
    
        .search-btn
            transition opacity 0.3s, transform 0.3s
            opacity 0
            transform scale3d(0, 0, 1)
            color: $material-theme.bg-color

    .close-btn
        position absolute
        left 0
        top 2px
        background: $theme.primary
        transition opacity 0.3s, transform 0.3s
        opacity 0
        transform scale3d(0, 0, 1)
        color: $material-theme.bg-color
        
    .search-history
        opacity 0
        position absolute
        top $app-header-height
        bottom 0
        right 0
        left 0
        background: $material-theme.bg-color
    
    &.open
        
        .search-form
            
            .search-btn
                opacity 1
                transform scale3d(1, 1, 1)
            
        .close-btn
            opacity 1
            transform scale3d(1, 1, 1)
            
        .search-history
            opacity 1
        

</style>