<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<style lang="less">
@import url('./assets/styles/rebase.less');

html, body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>