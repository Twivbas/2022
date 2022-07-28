<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="createTime" label="添加时间">
      <template v-slot:default="scope">{{ formateDate(scope.row.createTime) }}</template>
    </el-table-column>
    <el-table-column prop="loginTime" label="最后登录">
      <template v-slot:default="scope">{{ formateDate(scope.row.loginTime) }}</template>
    </el-table-column>
    <el-table-column prop="status" label="是否启用">
      <template v-slot:default="scope">
        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="{ row }">
        <el-button type="text" @click="allocRole(row.id)">分配角色</el-button>
        <el-button type="text" @click="editAdmin(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <EditAdmin :visible="visible" @close="closeDialog" :form="rowData" />
  <EditRole :visible="roleVisible" :form="roleData" @close="closeRoleDialog"/>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { getAdminListApi, getRoleListAll, getAdminRoleById } from '../../request/api'
import EditAdmin from './components/EditAdmin.vue'
import EditRole from './components/EditRole.vue';

const state = reactive<{
  tableData: {}[]
  a: number
  visible: boolean
  rowData: AdminObjItf
  roleVisible: boolean
  roleData: AdminRoleFormData
}>({
  tableData: [],
  a: 1,
  visible: false,
  rowData: {},
  roleVisible: false,
  roleData: {
    roleLists: [],
    userRoles: [],
    adminId: 0
  }
})
const { tableData, a, visible, rowData, roleVisible, roleData } = toRefs(state)

const fetchData = () => {
  getAdminListApi({
    keyword: '',
    pageNum: 1,
    pageSize: 10
  }).then(res => {
    console.log(res)
    if (res.code === 200) {
      tableData.value = res.data.list
    }
  })
}

fetchData()

// 获取所有角色
getRoleListAll().then(res => {
  if (res.code === 200) {
    roleData.value.roleLists = res.data
  }
})

// 点击分配角色按钮
const allocRole = (id: number) => {
  getAdminRoleById(id).then(res => {
    if (res.code === 200) {
      roleVisible.value = true
      roleData.value.adminId = id
      roleData.value.userRoles = res.data
    }
  })
  roleVisible.value = true
}

// 隐藏分配角色弹框
const closeRoleDialog = () => {
  roleVisible.value = false
}

const addZero = (num: number) => {
  return num > 9 ? num + '' : '0' + num
}

const formateDate = (time: string | undefined) => {
  if (!time) return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const month = addZero(date.getMonth() + 1)
  const day = addZero(date.getDate())
  const hour = addZero(date.getHours())
  const min = addZero(date.getMinutes())
  const sec = addZero(date.getSeconds())
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

const editAdmin = (row: AdminObjItf) => {
  visible.value = true
  rowData.value = row
}

const closeDialog = (r?: string) => {
  visible.value = false
  rowData.value = {}  // 清空用户编辑弹框内容
  if (r === 'reload') {
    // 更新表格数据
    fetchData()
  }
}
</script>

<style lang="less" scoped>
</style>