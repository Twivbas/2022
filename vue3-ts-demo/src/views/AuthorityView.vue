<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="list"
      show-checkbox
      node-key="roleId"
      :check-strictly="true"
      :default-checked-keys="authority"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button @click="changeAuthority">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { InitData, ListInt } from '@/type/authority'
import { getAuthorityList } from '@/request/api'

export default defineComponent({
  setup () {
    const route = useRoute()
    console.log(route)
    const params: any = route.params
    const data = reactive(new InitData(params.id, params.authority))
    onMounted(() => {
      getAuthorityList().then(res => {
        console.log(res)
        data.list = res.data
      })
    })
    const changeAuthority = () => {
      console.log(data.treeRef.getCheckedKeys().sort((a:number, b:number) => a - b))
      // 传给后台进行修改
    }

    return {...toRefs(data), changeAuthority}
  }
})
</script>

<style scoped>

</style>