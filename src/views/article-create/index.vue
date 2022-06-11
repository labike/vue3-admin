<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="text-input"
        :placeholder="$t('message.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      ></el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane
          :label="$t('message.article.markdown')"
          name="markdown"
        >
          <mark-down
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></mark-down>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('message.article.richText')"
          name="editor"
        >
          <edit
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Edit from './components/Edit.vue'
import MarkDown from './components/MarkDown.vue'
import { detailArticle } from '@/api/article'

const title = ref('')
const activeName = ref('markdown')

const onSuccess = () => {
  title.value = ''
}

const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getDetail = async () => {
  detail.value = await detailArticle(articleId)
  title.value = detail.value.title
}
if (articleId) {
  getDetail()
}
</script>

<style lang="scss" scoped></style>
