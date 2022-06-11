<template>
  <div class="header-search" :class="{show: isShow}">
    <svg-icon id="guide-search" class-name="search-icon" icon="search" @click.stop="onShowClick"></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="search"
      :remote-method="querySearch"
      @change="selectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { filterRoutes } from '@/utils/routes'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from './filterData'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()
let searchPool = computed(() => {
  const filterAllRoutes = filterRoutes(router.getRoutes())
  return generateRoutes(filterAllRoutes)
})

let fuse
const initFuse = searchPool => {
  // 搜索
  fuse = new Fuse(searchPool, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

const isShow = ref(false)
const searchOptions = ref('')

watch(isShow, val => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

const headerSearchSelectRef = ref(null)
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

const onShowClick = () => {
  isShow.value = !isShow.value
}

const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

const selectChange = (val) => {
  router.push(val.path)
}

watchSwitchLang(() => {
  searchPool = computed(() => {
    const routes = filterRoutes(router.getRoutes())
    return generateRoutes(routes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
