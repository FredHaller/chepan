<template>
    <div class="common-layout">
        <el-container>
            <el-header height="5em" style="overflow: hidden; margin: 10px;">
                <div style="display: flex; height: inherit; justify-content: space-between; align-items: center;">
                    <div class="left">
                        <ChapanLogo></ChapanLogo>
                    </div>
                    <div class="right">
                        <!-- 右侧图标 下载按钮 -->
                    </div>
                </div>

            </el-header>


            <el-main style="min-width: 1000px;width: 70%; margin: auto;">
                <el-container>
                    <el-aside width="20%">
                        <SideBar />
                    </el-aside>
                    <el-main class="file-lists">
                        <RouterView />
                    </el-main>
                </el-container>
            </el-main>

        </el-container>
    </div>
</template>

<script setup>
import ChapanLogo from '../components/ChapanLogo.vue';
import SideBar from './SideBarView.vue';


</script>

<style scoped>
.file-lists {
    min-width: 30vh;
    margin: 0 40px;
    padding: 30px 30px;
    height: 70vh;
    /* border: 2px rgba(70, 83, 90, 0.6) solid;
    border-top: 2px rgba(70, 83, 90, 0.6) solid;*/
    border-radius: 10px; 
  backdrop-filter:blur(8px); 
  -webkit-backdrop-filter:blur(8px);
    background-color: rgba(255, 255, 255, 0.37);

}
</style>


