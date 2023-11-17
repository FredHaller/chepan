<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    size="large"
    style="width: 400px"
    label-position="left"
    status-icon
  >
    <el-form-item label="Account" prop="account">
      <el-input v-model="ruleForm.account" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="ruleForm.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> Login </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
    <RouterLink to="/register">Sign in</RouterLink>
  </el-form>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { sha256 } from 'js-sha256'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// api.defaults.headers.common['Authorization'] = loginStatus.value.token;
import { ElMessage } from 'element-plus'
import axios from 'axios'

const router = useRouter()

function encryptPassword(account, password) {
  const data = (account + password).toString()
  return sha256(data).toString()
}

const api = axios.create({
  baseURL: 'http://localhost:8081/'
})

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
  email: ''
})

const rules = reactive<FormRules<RuleForm>>({
  account: [
    { required: true, message: 'Please input Username', trigger: 'blur' },
    { min: 5, max: 10, message: 'Length should be 5 to 10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input Password', trigger: 'blur' },
    { min: 8, max: 16, message: 'Length should be 8 to 16', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      api
        .post('/login', {
          account: ruleForm.account,
          hash: encryptPassword(ruleForm.account, ruleForm.password),
          email: ''
        })
        .then((response) => {
          if (response.data.header == false) {
            ElMessage({
              message: '登陆失败:' + response.data.msg,
              type: 'error',
              appendTo: '#message',
              grouping: true,
              duration: 1000,
              customClass: 'message'
            })
          } else {
            sessionStorage.setItem('token', response.data.msg)
            router.push('/')
          }
        })
        .catch(() => {
          ElMessage({
            message: '登陆失败:' + '服务器暂时不可用',
            type: 'error',
            appendTo: '#message',
            grouping: true,
            duration: 1000,
            customClass: 'message'
          })
        })
    } else {
      ElMessage({
        message: '格式错误',
        type: 'error',
        appendTo: '#message',
        grouping: true,
        duration: 1000,
        customClass: 'message'
      })
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