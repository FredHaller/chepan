<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="large"
        style="width: 400px;" label-position="left" status-icon>
        <el-form-item label="Account" prop="account">
            <el-input v-model="ruleForm.account" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email" type="email" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                Register
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
        <RouterLink to="/login">Log in</RouterLink>
    </el-form>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import { sha256 } from 'js-sha256';

function encryptPassword(account, password) {
    const data = (account + password).toString();
    return sha256(data).toString();
}

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:8081/'
})
// api.defaults.headers.common['Authorization'] = loginStatus.value.token;
import { ElMessage } from 'element-plus'

// TODO 加入邮箱的验证
interface RuleForm {
    password: string
    account: string
    email: string
}


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    account: '',
    password: '',
    email: '',
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = reactive<FormRules<RuleForm>>({
    account: [
        { required: true, message: 'Please input Account', trigger: 'blur' },
        { min: 5, max: 10, message: 'Length should be 5 to 10', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please input Password', trigger: 'blur' },
        { min: 8, max: 16, message: 'Length should be 8 to 16', trigger: 'blur' },
    ],
    email: [
        { required: true, message: 'Please input Email', trigger: 'blur' },
       {
            validator: (rule, value) => {
                if (!emailRegex.test(value)) {
                    return false;
                }
                return true;
            },message:'Invalid email format',
            trigger: 'blur'
        },
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            console.log(ruleForm.account);
            console.log(ruleForm.password);
            console.log(encryptPassword(ruleForm.account, ruleForm.password));
            console.log(ruleForm.email);
            api.post(
                '/register', {
                'account': ruleForm.account,
                'hash': encryptPassword(ruleForm.account, ruleForm.password),
                'email': ruleForm.email
            }).then((response) => {
                if (response.data.header == false) {
                    console.log("注册失败" + response.data.msg)
                    ElMessage({
                        message: "注册失败" + response.data.msg,
                        type: "error",
                        appendTo: "#message",
                        grouping: true,
                        duration: 1000,
                        customClass: "message"
                    })
                } else {
                    router.push("/login")
                    ElMessage({
                        message: "注册成功,现在可以登录了!",
                        type: "success",
                        appendTo: "#message",
                        grouping: true,
                        duration: 1000,
                        customClass: "message"
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style>
.message {
    /* border: 2px blanchedalmond solid; */
    height: 50px;
    border-radius: 8px;
    padding: 10px;
    padding-left: 20px;
    display: flex;
    width: 300px;
    align-items: center;
    background-color: rgba(70, 83, 90, 0.2);
}

.message .el-message__badge {
    width: 15px;
}

.message i {
    margin: auto 10px;
}
</style>