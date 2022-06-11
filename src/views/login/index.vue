<template>
  <div class="login-content">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{$t('message.login.title')}}</h3>
        <lang-select class="lang-select" />
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
            <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
        ></el-input>
      </el-form-item>
      <!--password-->
      <el-form-item prop="password">
        <span class="svg-container">
            <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd">
          <span class="svg-container" @click="onChangePwdType">
            <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
          </span>
        </span>
      </el-form-item>

      <el-button :loading="loading" @click="handleLogin" type="primary" style="width: 100%; margin-bottom: 30px">{{$t('message.login.loginBtn')}}</el-button>

      <!-- <div class="tips" v-html="$t('message.login.desc')"></div> -->
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import router from '@/router'
import LangSelect from '@/components/LangSelect'
import { useI18n } from 'vue-i18n'

const loginForm = ref({
  username: 'admin',
  password: '123456'
})

const i18n = useI18n()

const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('message.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

const passwordType = ref('password')

const onChangePwdType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
  console.log(passwordType.value)
  return passwordType
}

const loading = ref(false)
const store = useStore()
const loginFormRef = ref(null)
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) return
    loading.value = true
    store.dispatch('user/login', loginForm.value).then(res => {
      loading.value = false
      router.push('/')
    }).catch(err => {
      loading.value = false
      return err
    })
  })
}
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $cursor: #fff;

  .login-content {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      ::v-deep .el-form-item {
        border: 1px solid rgba(255, 255, 255, .1);
        background-color: rgba(0, 0, 0, .1);
        border-radius: 5px;
        color: #454545;
      }

      ::v-deep .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
          background: transparent;
          border: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          caret-color: $cursor;
        }
      }
      .tips {
        font-size: 16px;
        color: #fff;
        line-height: 25px;
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 25px;
      color: #fff;
    }
  }
</style>
