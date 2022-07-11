<template>
  <div class="login-box">
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <h2>后台管理系统</h2>
    <el-form-item label="账号：" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
    </el-form-item>
    <el-form-item>
      <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
      <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
      <div>账号：admin 密码：123456</div>
    </el-form-item>
  </el-form>
  
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '../request/api'
import { useRouter } from 'vue-router'


export default defineComponent({
  setup () {
    const data = reactive(new LoginData())
    const rules = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 10, message: '账号的长度在3到10之间', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 10, message: '密码的长度在3到10之间', trigger: 'blur' },
      ],
    }
    const router = useRouter()
    const ruleFormRef = ref<FormInstance>()
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
          login(data.ruleForm).then((res) => {
            // console.log(res)
            localStorage.setItem('token', res.data.token)
            router.push('/')
          })
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    return {...toRefs(data), rules, ruleFormRef, submitForm, resetForm}
  }
})
</script>

<style lang="scss" scoped>
  .login-box {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg");
    overflow: hidden;

    .demo-ruleForm {
      width: 500px;
      margin: 200px auto;
    }
    h2 {
      margin:0 0 20px 230px;
    }
    .loginBtn {
      width: 48%;
    }
  }
</style>