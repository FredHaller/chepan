<template>
    <div class="list-nav-item" @click="handlerClick()">
        <el-icon size="24" :color="color">
            <slot />
        </el-icon><span style="margin-left: 10px;">{{ text }}</span>
    </div>
</template>


<script >
import { useRouter } from 'vue-router';
export default {
    props: ['color', 'text', 'path'],
    setup(props) {
        
        const router = useRouter()
        const handlerClick = () => {
            router.push(props.path);
        }
        return { handlerClick }
    }
}

</script>


<style scoped>
.list-nav-item {
    display: flex;
    align-items: center;
    justify-content: left;
    align-items: center;
    padding-left: 40px;
    width: 100%;
    margin: 10px auto;
    background: rgba(255, 255, 255, 0.3);
    height: 50px;
    border-radius: 10px;
    font-weight: 400;

}

.list-nav-item:hover {
    background: rgba(70, 83, 90, 0.6);
    color: #e6e6e6;
}</style>