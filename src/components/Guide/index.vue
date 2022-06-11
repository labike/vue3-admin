<template>
  <div>
    <el-tooltip :content="$t('message.navBar.guide')">
      <svg-icon id="guild-start" icon="guide" @click="onClickGuide"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useI18n } from 'vue-i18n'
import step from './step'

const i18n = useI18n()

let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: i18n.t('message.guide.close'),
    nextBtnText: i18n.t('message.guide.next'),
    prevBtnText: i18n.t('message.guide.prev')
  })
})

const onClickGuide = () => {
  driver.defineSteps(step(i18n))
  driver.start()
}
</script>

<style lang="scss" scoped>

</style>
