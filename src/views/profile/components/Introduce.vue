<template>
  <!-- <div>
    <thumb :image="$store.getters.userinfo.avatar" height="100px" width="100px">
      {{$store.getters.userinfo.title}}
    </thumb>
  </div> -->
  <el-card class="user-container">
    <template #header>
      <div class="header">
        <span>{{$t('message.profile.introduce')}}</span>
      </div>
    </template>

    <div class="user-profile">
      <div class="box-center">
        <thumb :image="$store.getters.userinfo.avatar" height="100px" width="100px">
          {{$store.getters.userinfo.title}}
        </thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-align">
          {{$store.getters.userinfo.username}}
        </div>
        <div class="user-role text-align text-muted">
          {{$store.getters.userinfo.title}}
        </div>
      </div>
    </div>

    <div class="project-intro">
      <div class="project-intro-section">
        <div class="project-intro-section-header">
          <svg-icon icon="introduce"></svg-icon>
          <span>{{ $t('message.profile.projectIntroduction') }}</span>
        </div>
        <div class="project-intro-section-body">
          <div class="text-muted">
            {{ $t('message.profile.muted') }}
          </div>
        </div>
      </div>

      <div class="project-intro-section">
        <div class="project-intro-section-header">
          <svg-icon icon="reward"></svg-icon>
          <span>{{ $t('message.profile.projectFunction') }}</span>
        </div>
        <div class="project-intro-section-body">
          <div class="progress-item" v-for="item in features" :key="item.id">
            {{ $t('message.profile.muted') }}
            <div>{{item.title}}</div>
            <el-progress status="success" :percentage="item.percentage"></el-progress>
          </div>
        </div>
      </div>
    </div>

  </el-card>
</template>

<script setup>
import { defineProps } from 'vue'
import Thumb from '@/components/Thumb'

defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }

  .project-intro {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }

    .project-intro-section {
      margin-bottom: 36px;
      .project-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .project-intro-section-body {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
