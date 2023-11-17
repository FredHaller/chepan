<template>
  <AuthView />
  <div class="main-penal">
    <!-- <ListFile text="65" path="http:localhost:8081/">
        <Folder />
    </ListFile> -->
    <el-table
      :data="tableData"
      stripe
      max-height="63vh"
      @row-click="rowClick"
      @row-contextmenu="rowDbClick"
      class="main-area"
    >
      <el-table-column prop="name" label="FileName" width="250px" />
      <el-table-column prop="size" label="Size" width="120px" />
      <el-table-column prop="extension" label="Extension" width="220px" />
      <el-table-column prop="uploadTime" label="Upload Time" width="250px" />
    </el-table>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import AuthView from './AuthView.vue'
import { ElMessage } from 'element-plus'

dayjs.extend(relativeTime)

const api = axios.create({
  baseURL: 'http://localhost:8081'
})

const tableData = ref([])

const fetchData = async () => {
  try {
    const response = await api.get('/getFiles', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token')
      }
    })
    response.data.forEach((e) => {
      e.uploadTime = dayjs(e.uploadTime).fromNow()
      if (parseInt(e.size) <= 0) {
        e.size = '<0KB'
      } else if (parseInt(e.size) <= 1024) {
        e.size += ' KB'
      } else if (parseInt(e.size) / 1024 <= 1024) {
        e.size = (parseFloat(e.size) / 1024).toFixed(2) + ' MB'
      } else {
        e.size = (parseFloat(e.size) / 1024 / 1024).toFixed(2) + ' GB'
      }
    })
    tableData.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const rowClick = (row, column, event) => {
  const a = document.createElement('a')
  a.href = row.path
  a.target = '_blank'
  a.download = row.name
  a.click()
}

const rowDbClick = async (row, column, event) => {
  console.log(row.id)
  const response = await api
    .post(
      '/delete',
      {
        fileId: row.id,
        extension: row.extension
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        }
      }
    )
    .then((response) => {
      fetchData()
      ElMessage({
        message: response.msg,
        type: response.header ? 'success' : 'error',
        appendTo: '#message',
        grouping: true,
        duration: 1000,
        customClass: 'message'
      })
    })
  console.log(response)
}

onMounted(fetchData)

document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
</script>

<style>
.main-penal {
  padding: 0;
}

.main-area {
  border-radius: 10px;
  padding: 10px 20px 10px 40px;
  cursor: pointer;
  width: 100%;
}
</style>