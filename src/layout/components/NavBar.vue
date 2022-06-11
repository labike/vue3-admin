<template>
  <div class="navbar">
    <open-side-bar class="openSideBar" />
    <bread-crumb id="guide-breadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />
      <header-search class="right-menu-item hover-effect" />
      <screen-full class="right-menu-item hover-effect" />
      <theme-picker class="right-menu-item hover-effect" />
      <lang-select class="right-menu-item hover-effect" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userinfo.avatar"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{$t('message.navBar.home')}}</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="logout">{{$t('message.navBar.logout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import OpenSideBar from '@/components/OpenSideBar'
import BreadCrumb from '@/components/BreadCrumb'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import ScreenFull from '@/components/ScreenFull'
import HeaderSearch from '@/components/HeaderSearch'
import Guide from '@/components/Guide'
import { useStore } from 'vuex'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .breadcrumb-container {
    float: left;
  }

  .openSideBar {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.5s;
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        // &:hover {
        //   background: rgba(0, 0, 0, 0.025);
        // }
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
