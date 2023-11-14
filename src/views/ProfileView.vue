<template>
    <div class="profile-area">
        <div class="inner">
            <el-progress type="dashboard" :percentage="percentage" :color="colors" />
            <span style="margin-top: 20px; font-weight: 600; font-size: large;">存储空间剩余{{ (parseFloat(percentage / 100) *
                5).toFixed(2) }}GB</span>
        </div>
        <!-- <div class="inner">
            文件类型:
            <div class="progress">
             <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage" /> 
            </div>
        </div> -->
    </div>
</template>

<script setup>

import axios from 'axios';
const api = axios.create({
    baseURL: "http://localhost:8081"
});

const fetchData = async () => {
    try {
        const response = await api.get("/getFiles", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token")
            }
        });
        let sum = 0;
        response.data.forEach(e => {
            
            sum += parseFloat(e.size);
            

            // percentage.value = ((1-(Math.floor(sum / 1024 / 1024)/5))*100).toFixed(2)


        });

        percentage.value = ((1 - sum / 1024 / 1024) * 100).toFixed(2)

    } catch (error) {
        console.error(error);
    }
};

import { onMounted, ref } from 'vue'

const colors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 },
]
const percentage = ref(100)

onMounted(() => {
    fetchData();

})


</script>

<style scoped> .profile-area {
     background-color: white;
     width: 100%;
     min-height: 90%;
     display: flex;
     justify-content: space-evenly;
     align-items: center;
     border-radius: 10px;
 }

 .inner {
     width: 50%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
 }

 .progress {
     width: 80%;
     margin: auto;
 }
</style>