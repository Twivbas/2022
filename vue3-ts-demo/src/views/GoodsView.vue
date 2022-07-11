<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="dataList.comList" border style="width: 100%">
      <el-table-column prop="id" label="Id" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <el-pagination layout="prev, pager, next" :total="selectData.count*2" @current-change="currentChange" @size-change="sizeChange"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch, onMounted } from 'vue'
import { getGoodsList } from '@/request/api'
import { InitData, ListInt } from '@/type/goods'

export default defineComponent({
  setup () {
    const data = reactive(new InitData())
    const getGoods = () => {
      getGoodsList().then(res => {
        data.list = res.data
        data.selectData.count = res.data.length
      })
    }
    
    const currentChange = (page: number) => {
      data.selectData.page = page
    }
      
    const sizeChange = (pageSize: number) => {
      data.selectData.pageSize = pageSize
    }
    const dataList = reactive({
      comList: computed(() => {
        // 分页
        // 1-->[1-10]
        // 2-->[11-20]
        // 3-->[21-30]
        return data.list.slice((data.selectData.page-1)*data.selectData.pageSize, data.selectData.page *data.selectData.pageSize)
      })
    })
    // 查询
    const onSubmit = () => {
      console.log(data.selectData.title)
      console.log(data.selectData.introduce)
      let arr: ListInt[] = data.list
      if (data.selectData.title || data.selectData.introduce) {
        if (data.selectData.title) {
          arr = arr.filter(value => value.title.indexOf(data.selectData.title) !== -1)
        }
        if (data.selectData.introduce) {
          arr = arr.filter(value => value.introduce.indexOf(data.selectData.introduce) !== -1)
        }
      }
      data.selectData.count = arr.length || data.list.length
      data.list = arr
    }
    watch([() => data.selectData.title, () => data.selectData.introduce], () => {
      if (data.selectData.title == '' && data.selectData.introduce == '') {
        getGoods()
      }
    })
    onMounted(() => {
      getGoods()
    })

    return {...toRefs(data), onSubmit, currentChange, sizeChange, dataList}
  }
})
</script>

<style scoped>

</style>