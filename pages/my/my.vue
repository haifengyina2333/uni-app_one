<template>
	<view class="my-container">
		<login v-if="userinfo.data.token == '' "></login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script setup>
	import {
		reactive,
		toRefs,
		onMounted,
		watch,
		ref,
		computed
	} from 'vue'
	import {
		onReady,
		onShow,
		onHide
	} from '@dcloudio/uni-app'
	import useTabCart from "../../hooks/Tabcart.js"
	useTabCart()
	import Useuserinfo from '../../store/user.js'
	const userinfo = Useuserinfo();
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>