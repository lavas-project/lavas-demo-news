<template>
    <div class="home-wrapper">
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';

export default {
    name: 'home',
    mixins: [pageLoadingMixin],
    props: {},
    data() {
        return {};
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'setAppHeader'
        ])
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: '',
            showMenu: false,
            showBack: false,
            showLogo: true,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                },
                {
                    icon: 'person',
                    route: '/user'
                }
            ]
        });
        this.setPageLoading(false);
    }
};
</script>

<style lang="stylus" scoped>
</style>
