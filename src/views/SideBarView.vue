<template>
    <div class="list">
        <ListNav text="Files" path="/">
            <FolderOpened />
        </ListNav>
        <ListNav text="Upload" path="/upload">
            <Upload />
        </ListNav>
        <ListNav text="More Info" path="/moreinfo">
            <Odometer />
        </ListNav>
    </div>
    <div class="profile">

        <div style="margin: 20px;">

            <el-avatar size="large" fit="fill" shape="square" :src="avatarImg" />
        </div>
        <div style="display: flex; justify-content: space-evenly;align-items: center; width: 50%;">
            {{ account }}

            <el-icon @click="handleClick" size="20">
                <Edit />
            </el-icon>
        </div>
        
    </div>
</template>
<script setup>
import { reactive, toRefs } from 'vue'
import ListNav from '../components/ListNav.vue';

const state = reactive({
    avatarImg:
        'http://localhost:8081/files/avatars/default-avatar.jpg',
    account: "Unsetting",
})
const { avatarImg, account } = toRefs(state)

function handleClick(e) {

}

</script>

<style scoped>
.list {

    padding: 10px 20px;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.3);
}

.profile {
    height: 38vh;
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.3);
}
</style>

