<template>
  <div>
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择角色" size="large">
            <el-option label="全部角色" :value="0" />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="Id" width="180" />
        <el-table-column prop="nickName" label="姓名" width="180" />
        <el-table-column prop="role" label="角色" >
          <template #default="scope">
            <el-button
              v-for="item in scope.row.role"
              :key="item.role"
              size="small"
              link
            >
              {{item.roleName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="操作" >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="changeUser(scope.row)"
              link
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="isShow" title="编辑用户">
        <el-form :model="active">
          <el-form-item label="姓名" label-width="50px">
            <el-input v-model="active.nickName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色" label-width="50px">
            <el-select multiple v-model="active.role" placeholder="选择角色">
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="updateUser">更改</el-button>
            <el-button @click="isShow = false"
              >取消</el-button
            >
          </span>
        </template>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from '@/request/api'
import { InitData, ListInt } from '@/type/user'

export default defineComponent({
  setup () {
    const data = reactive(new InitData())
    onMounted(() => {
      getUser()
      getRole()
    })
    const getUser = () => {
      getUserList().then(res => {
        data.list = res.data
      })
    }
    const getRole = () => {
      getRoleList().then(res => {
        data.roleList = res.data
      })
    }
    const onSubmit = () => {
      console.log(data.selectData)
      let arr: ListInt[] = data.list
      if (data.selectData.nickName || data.selectData.role) {
        if (data.selectData.nickName) {
          arr = arr.filter(value => value.nickName.indexOf(data.selectData.nickName) !== -1)
        }
        if (data.selectData.role) {
          arr = arr.filter(value => {
            return value.role.find(item => item.role === data.selectData.role)
          })
        }
      }
      data.list = arr
    }
    watch([() => data.selectData.role, () => data.selectData.nickName], () => {
      if (data.selectData.role === 0 && data.selectData.nickName === '') {
        getUser()
      }
    })
    const changeUser = (row: ListInt) => {
      // console.log(row)
      data.active = {
        id: row.id,
        nickName: row.nickName,
        userName: row.userName,
        role: row.role.map((value: any) => value.role || value.roleId)
      }
      // console.log(data.active)
      data.isShow = true
    }
    const updateUser = () => {
      // console.log(data.active)
      let obj: any = data.list.find(value => value.id === data.active.id)
      obj.nickName = data.active.nickName
      obj.role = data.roleList.filter(value => data.active.role.indexOf(value.roleId)!== -1)
      console.log(obj.role)
      data.list.forEach((item, i) => {
        if (item.id === obj.id) {
          data.list[i] = obj
        }
      })
      data.isShow = false
      // console.log(data)
    }
    return {...toRefs(data), onSubmit, changeUser, updateUser}
  }
})
</script>

<style scoped>

</style>