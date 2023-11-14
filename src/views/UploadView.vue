<template>
    <el-upload class="upload-area" drag action="http://localhost:8081/upload" multiple method="post" :headers="headers" 
    :accept="accept"
     :http-request="uploadFile" 
     >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
               本网盘支持上传文档文件（PDF、Word、PowerPoint、Excel、MarkDown）、图像文件（JPEG、PNG、GIF）、视频文件（MP4）、音频文件（MP3）以及压缩文件（ZIP、RAR、7Z）<br/>
               单个文件请小于1GB
            </div>
        </template>
    </el-upload>

</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios';
const api = axios.create({
    baseURL:"http://localhost:8081/"
})


const headers = {
    "Authorization":sessionStorage.getItem("token")
}

const accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .jpg, .jpeg, .png, .gif, .mp4, .mp3, .zip, .rar, .7z,.md,.txt"


function uploadFile(data){
        // 使用axios发送上传请求
        const formData = new FormData();
        formData.append('file', data.file);

        return api.post("/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": sessionStorage.getItem("token")
            },
            // onUploadProgress: progressEvent => {
            //     // 上传进度的处理逻辑
            //     const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //     // 更新进度显示
            //     console.log(`上传进度：${percent}%`);
            // }
        }).then(response => {
            // 上传成功的处理逻辑
            console.log('上传成功', response.data);
        }).catch(error => {
            // 上传失败的处理逻辑
            console.error('上传失败', error);
    })
}
</script>

<style scoped>
</style>