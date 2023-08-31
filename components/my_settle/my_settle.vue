<template>

	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeRadio">
			<radio color="#C00000" :checked="isFullCheck" /> <text>全选</text>
		</label>

		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{cartinfo.checkedGoodsAmount}}</text>

		</view>
		<!-- 结算 -->
		<view class="btn-settle" @click="settlement">
			结算({{cartinfo.checkedCount}})
		</view>
		<!-- <button @click="print">bug调试</button> -->
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
		onLoad,
		onHide,
		onPullDownRefresh,
		onReachBottom,
		onTabItemTap,
		onReady
	} from '@dcloudio/uni-app'
	import usercartinfo from "../../store/cart.js"
	import Useuserinfo from "../../store/user.js"
	const cartinfo = usercartinfo()
	const userinfo = Useuserinfo()
	let seconds = 3
	let timer = null
	const isFullCheck = computed(() => {
		return cartinfo.total === cartinfo.checkedCount
	})
	const changeRadio = () => {
		console.log(isFullCheck.value);
		console.log("全选触发");
		cartinfo.updateAllGoodsState(!isFullCheck.value)
		console.log(cartinfo.data.cart);
	}
	const print = () => {

		cartinfo.log()
	}
	const showTips = n => {
		uni.showToast({
			icon: 'none',
			title: "请先登录再结算：" + n + " 秒后自动跳转到登陆界面",
			mask: true,
			duration: 1500
		})
	}
	const delayNavigate = () => {
		seconds = 3
		showTips(seconds)

		timer = setInterval(() => {
			seconds--;
			if (seconds <= 0) {
				clearInterval(timer)
				uni.switchTab({
					url: '/pages/my/my',	
					success:()=>{
						userinfo.updataRedirectInfo({
							openType:"switchTab",
							from:'/pages/cart/cart'
						})
						
					}
				})
				return 
			}
			showTips(seconds)
		}, 1000)

	}
	const settlement = () => {
		if (!cartinfo.checkedCount) return uni.$showMsg("请选择要结算的商品！")
		if (!cartinfo.checkedCount) return uni.$showMsg("请选择要结算的商品")
		if (!userinfo.data.token) delayNavigate()
		payOrder()
		

	}
	// 微信支付相关功能
	const payOrder = async ( ) =>{
		const orderInfo = {
		    // 开发期间，注释掉真实的订单价格，
		    // order_price: this.checkedGoodsAmount,
		    // 写死订单总价为 1 分钱
		    order_price: 0.01,
		    consignee_addr: "广东省深圳市潮阳区",
		    goods: cartinfo.data.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
		  }
		  console.log(orderInfo);
		  const res = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
		  console.log(res);
		  const orderNumber = res.data.message.order_number
		  
	}

	onMounted(() => {
		console.log(seconds);
	})
</script>

value
<style lang="scss" scoped>
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
			font-weight: bold;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>