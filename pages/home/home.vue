<template>
	<view class="search-box">
		<search @click="gotoSearchInput"></search>
	</view>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 循环渲染轮播图的 item 项 -->
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id = ` + item.goods_id">
					<!-- 动态绑定图片的 src 属性 -->
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
	</view>


	<view class="nav-list">
		<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
			<image :src="item.image_src" class="nav-img"></image>
		</view>
	</view>


	<view class="floor-list">
		<!-- 楼层 item 项 -->
		<view class="floor-item" v-for="(item, i) in floorList" :key="i">
			<!-- 楼层标题 -->
			<image :src="item.floor_title.image_src" class="floor-title"></image>
			<view class="floor-img-box">
				<!-- 左侧大图片的盒子 -->
				<navigator class="left-img-box" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src"
						:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
				</navigator>
				<!-- 右侧 4 个小图片的盒子 -->
				<view class="right-img-box" >
					<navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-show="i2 !== 0" :url="item2.url">
						<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
						</image>
					</navigator>
				</view>
			</view>
		</view>
	</view>



</template>

<script setup>
	import {reactive,toRefs,onMounted,watch,ref,computed} from 'vue'
	import {onLoad,onHide,onPullDownRefresh,onReachBottom,onTabItemTap,onReady} from "@dcloudio/uni-app"
	import search from "@/components/search/search.vue"
	import usedemoStore from "../../store/demo.js"	
	import useTabCart from "../../hooks/Tabcart.js"
	useTabCart()
	// import My from "../my/my.vue"
	// ref定义的数据：操作数据需要 .value  读取数据时模板中直接读取，（第一层）
	// reactive定义的数据：操作数据与读取数据 均不需要 .value
	let demoStore = usedemoStore()
	// const data = ref({
	// 	swiperList:[],
	// })
	const _data = reactive({
		swiperList: [],
		navList: [],
		floorList: []
	})
	// 解包之后在js需要 .value 来获取具体数据  模板中不用
	const {
		swiperList,
		navList,
		floorList
	} = toRefs(_data);

	const getSwiperList = async () => {
		let res = await uni.$http.get("/api/public/v1/home/swiperdata");
		if (res.data.meta.status != 200) return uni.$showMsg()
		console.log("轮播图请求数据", res)
		// data.value.swiperList = res.data.message;
		swiperList.value = res.data.message;
	}
	const getNavList = async () => {
		let res = await uni.$http.get("/api/public/v1/home/catitems");
		if (res.data.meta.status != 200) return uni.$showMsg()
		navList.value = res.data.message;
		console.log("nav数据", navList.value);
	}
	const navClickHandler = (item) => {
		console.log("触发nav相关事件，item是：", item);
		if (item.name !== "分类") return
		uni.switchTab({
			url: "/pages/cate/cate"
		})
	}
	
	const getFoolList = async () => {
		let res = await uni.$http.get("/api/public/v1/home/floordata");
		if (res.data.meta.status != 200) return uni.$showMsg()
		res.data.message.forEach((item)=>{
			item.product_list.forEach(index=>{
				index.url = "/subpkg/goods_list/goods_list?" + index.navigator_url.split('?')[1]
			})
		})
		floorList.value = res.data.message;
		
		console.log("floor数据", floorList.value);

	}
	const gotoSearchInput = () =>{
		uni.navigateTo({
			url:'/subpkg/search_input/search_input'
		})
		console.log("触发跳转");
	}

	// onLoad(()=>{
	// 	getSwiperList()
	// })
	onMounted(() => {
		uni.$showMsg();
		getSwiperList();
		getNavList();
		getFoolList()
		console.log(swiperList);


	})
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}
	.right-img-box {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-around;
	}
	
	.floor-img-box {
	  display: flex;
	  padding-left: 10rpx;
	}
	.search-box{
		position: sticky;
		top:0;
		z-index: 10;
	}
	
</style>