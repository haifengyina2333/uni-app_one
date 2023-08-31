<template v-cloak>
	<view class="goods-detail-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in data.goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{data.goods_info.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{data.goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
			<!-- 富文本，渲染html标签 -->
			<rich-text :nodes="data.goods_info.goods_introduce"></rich-text>
		</view>
		<uni-goods-nav class="goods_nav" :fill="true" :options="data.options" :buttonGroup="_data.buttonGroup"
			@click="onClick" @buttonClick="buttonClick"></uni-goods-nav>


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
		onTabItemTap
	} from '@dcloudio/uni-app'
	import usecartInfo from "../../store/cart.js"

	const cartInfo = usecartInfo()
	const props = defineProps({
		goods_id: Number
	})
	const data = reactive({
		options: [{
			icon: 'shop',
			text: '店铺'
		}, {
			icon: 'cart',
			text: '购物车',
			info: cartInfo.data.total
		}],
		goods_info: {},

	})
	const _data = {
		
		// 右侧按钮组的配置对象
		buttonGroup: [{
				text: '加入购物车',
				backgroundColor: '#ff0000',
				color: '#fff'
			},
			{
				text: '立即购买',
				backgroundColor: '#ffa200',
				color: '#fff'
			}
		]
	}

	const getGoodsDetail = async (id) => {

		let res = await uni.$http.get("/api/public/v1/goods/detail", {
			goods_id: id
		})
		if (res.data.meta.status !== 200) return
		res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img /g,
			'<img style="display:block;" ')
		res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img /g,
			'<img style="display:block;" ').replace(/webp/g, 'jpg')
		data.goods_info = res.data.message
		console.log("商品信息", res);
	}
	const preview = (i) => {
		uni.previewImage({
			urls: data.goods_info.pics.map(x => x.pics_big),
			current: i
		})
	}
	const onClick = (e) => {
		if (e.content.text === "购物车")
			uni.switchTab({
				url: "/pages/cart/cart"
			})
	}
	const buttonClick = (e) => {
		if (e.content.text === "加入购物车") {
			const addgoods = {
				goods_id: data.goods_info.goods_id,
				goods_name: data.goods_info.goods_name,
				goods_price: data.goods_info.goods_price,
				goods_count: 1,
				goods_small_logo: data.goods_info.goods_small_logo,
				goods_state: true
			}
			cartInfo.addToCart(addgoods)
		} else {
			// 点击立即购买的代码

		}
	}
	watch(() => cartInfo.total, () => {
		const find = data.options.find(x => x.text === "购物车")
		if (find) find.info = cartInfo.total

	})
	onLoad((op) => {
		console.log(op);
		getGoodsDetail(op.goods_id)
		const find = data.options.find(x => x.text === "购物车")
		if (find) find.info = cartInfo.total
	})
</script>


<style lang="scss" scoped>
	[v-cloak] {
		display: none;
	}

	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		// 运费
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}

	.goods_nav {
		// 为商品导航组件添加固定定位
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.goods-detail-container {
		padding-bottom: 50px;
	}
</style>