<template>
	<!-- 写在最外层，防止事件冒泡 -->
	<view class="my-search-container" @click="searchBoxHandler" :style="{backgroundColor:props.bgcolor}">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box"   :style="{borderRadius:props.radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		toRefs,
		onMounted,
		computed,
		watch
	} from "vue"
	const props = defineProps({
		bgcolor: {
			type: String,
			default: "#c00000",
		},
		radius:{
			type:Number,
			// 默认值
			default:18
		}
	});
	const emit = defineEmits();
	const searchBoxHandler = () =>{
		emit("click");
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 36px;
		background-color: #ffffff;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>