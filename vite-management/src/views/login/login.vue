<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginFn">登录</el-button>
      </el-form-item>
    </el-form>
    <div>账号：admin 密码：123456</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { adminLoginApi, getAdminInfoApi } from '../../request/api'
import Cookie from 'js-cookie'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const state = reactive({
  ruleForm: {
    username: 'admin',
    pwd: '123456'
  }
})
let { ruleForm } = toRefs(state)
// 获取el-form组件
const ruleFormRef = ref()
const router = useRouter()
const store = useStore()

const validatePwd = (rule: unknown, value: string | undefined, cb: (msg?: string) => void) => {
  if (!value) {
    cb('密码不能为空')
  } else {
    cb()
  }
}

const rules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  pwd: [{ validator: validatePwd, trigger: 'blur' }]
})

const loginFn = () => {
  ruleFormRef.value.validate().then(() => {
    adminLoginApi({
      username: ruleForm.value.username,
      password: ruleForm.value.pwd
    }).then(res => {
      if (res.code === 200) {
        // 存储token
        Cookie.set('token', res.data.tokenHead + res.data.token, { expires: 7 })
        // 获取用户信息
        store.dispatch('getAdminInfo').then(res => {
          router.push('/homepage')
        })
        
      }
    }).catch(err => {
      console.log(err)
    })
  }).catch(() => {
    console.log('校验不通过')
  })
}

</script>

<style lang="less" scoped>
</style>