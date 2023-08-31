<template>
	<!-- <search :bgcolor="as" :radius="'1'"></search> -->
	<search @click="gotoSearchInput"></search>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<!-- :style="{height: wh + 'px'}" -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: data.wh +'px'}">
				<template v-for="(item,i) in data.cateList" :key="i">

					<view :class="['left-scroll-view-item', i === data.active ? 'active' : '']"
						@click="activeChhanged(i)">{{item.cat_name}}</view>
				</template>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: data.wh + 'px'}" :scroll-top="data.scrollTop">
				<view class="cate-lv2" v-for="(item2,i2) in data.cateLevel2" :key="i2">
					<view class="cate-lv2-title">
						{{item2.cat_name}}
						<view class="cate-lv3-list">
							<!-- 三级分类 Item 项 -->
							<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodList(item3)">
								<!-- 图片 -->
								<image :src="item3.cat_icon.replace('dev','web')"></image>
								<!-- 文本 -->
								<text>{{item3.cat_name}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive
	} from "vue"
	import {
		onLoad,
		onHide,
		onPullDownRefresh,
		onReachBottom,
		onTabItemTap,
		onReady
	} from "@dcloudio/uni-app"
	import search from "@/components/search/search.vue"	
	import useTabCart from "../../hooks/Tabcart.js"
	useTabCart()
	const data = reactive({
		wh: 0,
		cateList: [],
		cateLevel2: [],
		active: 0,
		// 修复切换时的滚动条，该属性为距离顶部的距离
		scrollTop:0
	})

	const getCateList = async () => {
		let res = await uni.$http.get("/api/public/v1/categories");
		if (res.data.meta.status !== 200) return uni.$showMsg();
		data.cateList = res.data.message
		data.cateLevel2 = res.data.message[0].children
		console.log("列表数据", data.cateList);
	}
	// 修改样式
	const activeChhanged = i => {
		data.active = i;
		data.cateLevel2 = data.cateList[i].children
		// 修复切换时的滚动条
		data.scrollTop = data.scrollTop === 0 ? 1 : 0
	}
	const gotoGoodList = item =>{
		uni.navigateTo({
			url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
		})
	}
	const gotoSearchInput = () =>{
		uni.navigateTo({
			url:'/subpkg/search_input/search_input'
		})
		console.log("触发跳转");
	}
	onLoad(() => {
		// windowHeight 可用屏幕高度
		// screenHeight 屏幕高度
		// 设置内容高度
		data.wh = uni.getSystemInfoSync().windowHeight - 50
		getCateList()
	})
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				line-height: 60px;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;

				// 激活项的样式
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}
		.cate-lv3-list {
		  display: flex;
		  flex-wrap: wrap;
		
		  .cate-lv3-item {
		    width: 33.33%;
		    margin-bottom: 10px;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		
		    image {
		      width: 60px;
		      height: 60px;
		    }
		
		    text {
		      font-size: 12px;
		    }
		  }
		}
	}
</style>