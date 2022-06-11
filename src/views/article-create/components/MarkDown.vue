<template>
  <div class="markdown-container">
    <div id="markdown-box">

    </div>
    <div class="bottom">
      <el-button type="primary" @click="submitClick">{{$t('message.article.commit')}}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

let mkEditor
let el
const store = useStore()
const initEditor = () => {
  mkEditor = new MKEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

watch(
  () => props.detail,
  val => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)

const submitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  mkEditor.reset()
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
