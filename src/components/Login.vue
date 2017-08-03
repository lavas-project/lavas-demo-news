<template>
    <transition name="login" v-if="show">
        <div class="login-wrapper" v-bind:style="{width: wrapperWidth + 'px'}">
            <header>
                <v-btn light icon @click.native="close">
                    <v-icon>close</v-icon>
                </v-btn>
                <span>登录</span>
            </header>
            <div v-if="!useDefaultAccount" class="login-content">
                <v-text-field
                  name="username"
                  single-line
                  prepend-icon="email"
                  placeholder="用户名"
                  v-model="username"
                  type="text"
                  autocomplete="name"
                ></v-text-field>
                <v-text-field
                  name="password"
                  single-line
                  prepend-icon="lock"
                  placeholder="密码"
                  v-model="password"
                  type="password"
                  autocomplete="new-password"
                ></v-text-field>
                <div class="sign-in-btn" @click="submit"><v-btn>登录</v-btn></div>
            </div>
            <div v-else class="login-content">
                <p class="sign-in-already-tip">您已经登录过您的账户，可以直接访问</p>
                <input type="text" v-model="username" class="hidden-filed" />
                <input type="password" v-model="password" class="hidden-filed" />
                <v-radio :label="username" v-model="username" :value="username" 
                    class="sign-in-checkbox" color="primary" hide-details></v-radio>
                <div class="sign-in-btn" @click="submit"><v-btn>现在访问</v-btn></div>
                <p class="sign-in-change" @click="changeAccount">换个账户登录</p>
            </div>
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
            processing: false,
            useDefaultAccount: false
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
                    this.storeCred();
                })
                .then(() => {
                    this.hideLoginLoading();
                    this.close();
                    this.useDefaultAccount = true;
                });
        },
        // 换账户登录
        changeAccount() {
            this.username = '';
            this.password = '';
            this.useDefaultAccount = false;
        },
        // 存储用户凭证
        storeCred() {
            if (navigator.credentials) {
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
                        this.accountLogout();
                    });
                return;
            }

            this.accountLogout();
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
                // unmediated: true,
                // 返回类型为 PasswordCredential 的登录信息
                password: true
            }).then(cred => {
                // cred 可能为 undefined
                if (cred) {
                    switch (cred.type) {
                        case 'password':
                            if (cred.password === undefined) {
                                break;
                            }
                            this.username = cred.id;
                            this.password = cred.password;
                            this.useDefaultAccount = true;
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

.login-content
    padding: 0 16px

.sign-in-btn

    button
        width: 100%
        margin: 0
        font-size: 1.2em
        background: $theme.primary
        color: #fff

.sign-in-already-tip
    color: #898B92
    font-size: 1.2em
    line-height: 20px
    padding-bottom: 12px
    border-bottom: 1px solid #EBEBEC

.sign-in-change
   color: #3A3E4A
   font-size: 16px
   line-height: 24px
   text-align: center
   margin-top: 10px

.hidden-filed
    visibility: hidden
    height: 0
    float: right

.login-progress
    position: absolute
    top: 60%
    left: 50%
    transform: translateX(-50%)

.login-leave-active, .login-enter-active
  transition: all .2s ease

.login-enter, .login-leave-to, .login-leave-active
  transform: translateY(700px)
  opacity: 0
</style>