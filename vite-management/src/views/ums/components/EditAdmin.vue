<template>
  <el-dialog v-model="visible" title="修改账号资料" :before-close="close">
    <el-form :model="newForm" :label-width="formLabelWidth">
      <el-form-item label="账号：">
        <el-input v-model="newForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="newForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="newForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="newForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="newForm.note" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-radio-group v-model="newForm.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="modifyAdmin">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch } from 'vue'
import { updateAdmin } from '../../../request/api'

const props = defineProps<{
  visible: boolean
  form: AdminObjItf
}>()

const state = reactive<{
  formLabelWidth: string
  newForm: AdminObjItf
}>({
  formLabelWidth: '120px',
  newForm: {}
})

const { newForm, formLabelWidth } = toRefs(state)

// 拷贝form
watch(() => props.form, () => {
  newForm.value = { ...props.form }
})

const emit = defineEmits<{
  (event: 'close', r?: string): void
}>()

const close = (r?: string) => {
  // 传到父组件
  emit('close', r)
}

const modifyAdmin = () => {
  if (newForm.value.id) {
    updateAdmin(newForm.value.id, newForm.value).then(res => {
    if (res.code === 200) {
      close('reload')
    }
  })
  }
  
  
}
</script>

<style scoped>
</style>