<template>
    <div class="error-wrapper">
        <slot name="icon">
            <div class="error-icon">
                <v-icon x-large class="grey--text text--lighten-2">error</v-icon>
            </div>
        </slot>
        <p class="error-message dark--text">{{message}}</p>
    </div>
</template>

<script>

export default {
    name: 'error',

    props: {
        message: {
            'type': String,
            'default': '未知错误'
        }
    },

    data() {
        return {
        };
    },

    computed: {
    },

    methods: {

    }
};
</script>

<style lang="stylus" scoped>

.error-wrapper
    background #fff
    width 100%
    text-align center

    .error-icon
        margin-top 40px

    .error-message
        margin-top 20px

</style>