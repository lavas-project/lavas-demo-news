<template>
    <transition name="login" v-if="show">
        <div class="login-wrapper" v-bind:style="{width: wrapperWidth + 'px'}">
            <header>
                <v-btn light icon @click.native="close">
                    <v-icon>close</v-icon>
                </v-btn>
                <span>登录</span>
            </header>
            <div class="field-item">
                <v-btn icon><v-icon>email</v-icon></v-btn>
                <input type="text" v-model="username" placeholder="用户名" />
            </div>
            <div class="field-item">
                <v-btn icon><v-icon>lock</v-icon></v-btn>
                <input type="password" v-model="password" placeholder="密码" />
            </div>
            <div class="sign-in-btn" @click="submit"><v-btn>登录</v-btn></div>
            <v-progress-circular indeterminate 
                class="primary--text login-progress" v-if="processing">
            </v-progress-circular>
        </div>
    </transition>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: 'login',
    props: ['show', 'logout'],
    data() {
        return {
            username: '',
            password: '',
            wrapperWidth: document.body.clientWidth,
            processing: false
        };
    },
    computed: {
    },
    methods: {
        ...mapActions('appShell/appSidebar', ['accountLogin', 'accountLogout']),
        close() {
            this.$emit('close-login');
        },
        // 验证用户输入
        validate() {
            if (!this.username.length) {
                return false;
            }
            if (!this.password.length) {
                return false;
            }
            return true;
        },
        // 登录操作
        submit() {
            if (!this.validate()) {
                return;
            }

            this.showLoginLoading();

            this.accountLogin(
                {
                    name: this.username,
                    pwd: this.password
                })
                .then(() => {
                    return this.storeCred();
                })
                .then(() => {
                    this.hideLoginLoading();
                    this.close();
                });
        },
        // 存储用户凭证
        storeCred() {
            if (navigator.credentials) {
                // 使用 navigator.credentials.store 进行凭证存储

                let cred = new PasswordCredential({
                    id: this.username,
                    password: this.password,
                    name: this.username,
                    iconURL: 'https://gss0.bdstatic.com/9rkZbzqaKgQUohGko9WTAnF6hhy/movie/edison/assets/android-chrome-192x192_1501062228038.png'
                });
                return navigator.credentials.store(cred);
            }

            return Promise.resolve();      
        },
        toLogout() {
            if (navigator.credentials) {
                navigator.credentials.requireUserMediation()
                    .then(() => {
                        return this.accountLogout();
                    });
            }
        },
        showLoginLoading() {
            this.processing = true;
        },
        hideLoginLoading() {
            this.processing = false;
        }
    },
    created() {
        // 提取用户凭证
        if (navigator.credentials) {

            navigator.credentials.get({
                // 返回类型为 PasswordCredential 的登录信息
                password: true,
                unmediated: true
            }).then(cred => {
                // cred 可能为 undefined
                if (cred) {
                    
                    switch (cred.type) {
                        case 'password':
                            this.username = cred.id;
                            this.password = cred.password;
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    },
    watch: {
        logout(value, old) {
            if (value) {
                this.toLogout();
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
p
    margin: 0

.login-wrapper
    position: fixed
    background: #fff
    top: 0
    bottom: 0
    left: 0
    right: 0

header
    display flex
    align-items center
    height 52px
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)
    background: #fff
    margin-bottom: 20px

    span
        font-size: 1.2em
        font-weight: 600
        margin-left: 10px

.field-item
    padding: 0 23px 0 8px

    input
        border-bottom: 1px solid #959595
        margin-left: 10px
        padding: 0 16px 0 0
        box-sizing: border-box
        width: calc(100% - 74px)

.sign-in-btn
    padding: 20px 23px

    button
        width: 100%
        margin: 0
        font-size: 1.2em
        background: $theme.primary
        color: #fff

.login-progress
    position: absolute
    top: 50%
    left: 50%
    transform: translateX(-50%)

.login-leave-active, .login-enter-active
  transition: all .2s ease

.login-enter, .login-leave-to, .login-leave-active
  transform: translateY(700px)
  opacity: 0
</style>