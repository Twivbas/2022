<template>
	<view>
		<my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
  import { mapState } from 'vuex'
  import badgeMix from '../../minins/tabbar-badge.js'
  
	export default {
		data() {
			return {
				
			};
		},
    mixins: [badgeMix],
    computed: {
      ...mapState('m_user', ['token'])
    }
	}
</script>

<style lang="scss">

</style>
