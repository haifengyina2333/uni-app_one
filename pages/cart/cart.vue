<template>
	<view class="kkry" v-if="cartInfo.data.cart.length == 0">
		<text>空空如也捏</text>
	</view>
	<view class="" v-else>
		<Address></Address>
		<view class="cart-container">
			<view class="cart-title">
				<!-- 左侧的图标 -->
				<uni-icons type="shop" size="18"></uni-icons>
				<!-- 描述文本 -->
				<text class="cart-title-text">购物车</text>
			</view>
			<uni-swipe-action>
				<block v-for="(goods, i) in cartInfo.data.cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
						<Mygoods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :showNum="true"
							@num-change="numChangeHandel"></Mygoods>
					</uni-swipe-action-item>
				</block>
		
			</uni-swipe-action>
			<Mysettle></Mysettle>
		</view>
		
	</view>
	


</template>


<script setup>
	import Mygoods from "@/components/my_goods/my_goods.vue"
	import {
		reactive,
		toRefs,
		onMounted,
		watch,
		ref,
		computed
	} from 'vue'
	import {
		onLoad,
		onHide,
		onPullDownRefresh,
		onReachBottom,
		onTabItemTap,
		onReady,
		onShow
	} from '@dcloudio/uni-app'
	import usecartInfo from "../../store/cart.js"
	import useTabCart from "../../hooks/Tabcart.js"
	import Address from "@/components/my-address/my-address.vue"
	import Mysettle from "@/components/my_settle/my_settle.vue"
	useTabCart()
	const cartInfo = usecartInfo()
	const data = computed(() => cartInfo.data)
	const options = [{
		text: '删除', // 显示的文本内容
		style: {
			backgroundColor: '#C00000' // 按钮的背景颜色
		}
	}]
	onLoad(() => {
		console.log(cartInfo);

	})
	onShow(() => {

	})
	const radioChangeHandler = (e) => {
		// 调用pinia方法来修改数据
		cartInfo.updataGoodsState(e)
	}
	const numChangeHandel = (e) => {
		cartInfo.updataGoodsCount(e)
	}
	const swipeActionClickHandler = goods => {
		console.log("正在删除ID:", goods.goods_id, "的数据")
		cartInfo.removeGoodsById(goods.goods_id)
	}
</script>


<style lang="scss" scoped>
	.kkry{
		margin-top: 300px;
		display:flex;
		align-items: center;
		justify-content: center;

	}
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}

	.cart-container {
		padding-bottom: 50px;
	}
</style>