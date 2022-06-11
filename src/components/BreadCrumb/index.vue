<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbData"
        :key="item.path"
      >
        <span class="no-redirect" v-if="index === breadCrumbData.length - 1">
          {{generateTitle(item.meta.title)}}
        </span>
        <span class="redirect" v-else @click="breadCrumbRedirect(item)">
          {{generateTitle(item.meta.title)}}
        </span>
      </el-breadcrumb-item>
      </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const breadCrumbData = ref([])
const getBreadCrumbData = () => {
  breadCrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
}

const route = useRoute()
watch(route, () => {
  getBreadCrumbData()
}, {
  immediate: true
})

const router = useRouter
const breadCrumbRedirect = (item) => {
  router.push(item.path)
}

const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: bold;
    cursor: pointer;
  }
  .redirect:hover {
    color: v-bind(linkHoverColor)
  }
}
</style>
