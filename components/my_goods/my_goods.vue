<template>

	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<radio :checked="props.goods.goods_state" color="#C00000" v-if="showRadio" @click="radioChange"></radio>
			<image :src="props.goods.goods_small_logo || data.defaultPic" class="goods-pic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{props.goods.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">{{toFixedTwo(props.goods.goods_price)}}</view>
				<uni-number-box :min="1" :value="props.goods.goods_count" v-if="showNum" @change="updataNum"></uni-number-box>
			</view>
		</view>
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

	const emit = defineEmits()
	const data = reactive({
		defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
	})
	const props = defineProps({
		goods: {
			type: Object,
			default: {}
		},
		showRadio: {
			type: Boolean,
			// 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
			default: false,
		},
		showNum: {
			type: Boolean,
			default: false,
		}
	});
	const toFixedTwo = (e) => {
		return e.toFixed(2)
	}
	onLoad(() => {
		console.log(props.goods, "==============================");
	})
	const radioChange = (e) => {
		console.log("触发按钮改变",props.goods,e,"====================")
		emit("radio-change", {
			goods_id: props.goods.goods_id,
			goods_state: !props.goods.goods_state,
		});
	}
	const updataNum = (value) => {
		emit("num-change",{
			goods_id: props.goods.goods_id,
			goods_count:+value
		})
	}
</script>


<style lang="scss" scoped>
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>