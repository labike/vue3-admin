<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{$t('message.uploadExcel.upload')}}
      </el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    >

    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handDragover"
      @dragenter.stop.prevent="handleDragenter"
    >
      <i class="el-icon-upload"></i>
      <span>{{$t('message.uploadExcel.drop')}}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './read'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 上传之前回调
  beforeUpload: Function,
  onSuccess: Function
})

const loading = ref(false)
const excelUploadInput = ref(null)

const handleUpload = () => {
  excelUploadInput.value.click()
}

const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

/**
 * 上传
 */
const upload = (file) => {
  excelUploadInput.value.value = null
  if (!props.beforeUpload) {
    readerData(file)
    return
  }

  const before = props.beforeUpload(file)
  if (before) {
    readerData(file)
  }
}

/**
 * 读取数据
 */
const readerData = file => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target.result
      const workBook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[firstSheetName]
      const header = getHeaderRow(workSheet)
      const results = XLSX.utils.sheet_to_json(workSheet)
      generateData({ header, results })
      loading.value = false
      resolve()
    }
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 根据导入内容生成数据
 */
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

/**
 * 拖拽
 */
const handleDrop = (e) => {
  // 上传中
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('请选择上传文件')
    return
  }

  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件格式必须是.xlsx, .csv, .xls')
    return
  }
  upload(rawFile)
}

const handDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}

const handleDragenter = () => {

}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
