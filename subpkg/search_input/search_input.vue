<template>
	<view class="search-box">
		<uni-search-bar @input="input" :radius="100" placeholder="请输入搜索内容" cancelButton="none"></uni-search-bar>
	</view>

	<view class="sugg-list" v-if="data.searchResults.length !== 0">
		<view class="sugg-item" v-for="(item, i) in data.searchResults" :key="i" @click="gotoDetail(item.goods_id)">
			<view class="goods-name">{{item.goods_name}}</view>
			<uni-icons type="arrowright" size="16"></uni-icons>
		</view>
	</view>
	<!-- 搜索历史 -->
	<view class="history-box" v-else>
		<!-- 标题区域 -->
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons type="trash" size="17" @click="clear"></uni-icons>
		</view>
		<!-- 列表区域 -->
		<view class="history-list">
			<uni-tag :text="item" v-for="(item, i) in data.historyList" :key="i" @click="gotoGoodsList(item)"></uni-tag>
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

	const data = reactive({
		input: "",
		searchResults: [],
		historyList: ['a', 'b', 'c']
	})
	let timer = null;


	const getSearchList = async () => {
		if (data.input.length === 0) data.searchResults = []
		let res = await uni.$http.get("/api/public/v1/goods/qsearch", {
			query: data.input
		})
		if (res.data.meta.status !== 200) return uni.$showMsg()
		data.searchResults = res.data.message
		saveSearchHistory()
		console.log(res);
	}

	// 防抖
	const input = (e) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			data.input = e;
			getSearchList();
			console.log(data.input);
		}, 500)
	}
	const gotoDetail = id => {
		uni.navigateTo({
			url: "/subpkg/goods_detail/goods_detail?goods_id=" + id
		})
	}
	const saveSearchHistory = () =>{
		const set = new Set(data.historyList)
		set.delete(data.input)
		set.add(data.input)
		data.historyList = Array.from(set)
		uni.setStorageSync('searchHistory',JSON.stringify(data.historyList));
		
	}
	const clear = () =>{
		data.historyList = [],
		uni.removeStorageSync("searchHistory")
	}
	const gotoGoodsList = value =>{
		uni.navigateTo({
			url: "/subpkg/goods_list/goods_list?query=" + value
		})
	}
	onLoad(()=>{
		data.historyList = JSON.parse(uni.getStorageSync('searchHistory') || "[]")
	})
</script>


<style lang="scss" scoped>
	// 修复微信显示问题
	.search-box {
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
	.history-box {
	  padding: 0 5px;
	
	  .history-title {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    height: 40px;
	    font-size: 13px;
	    border-bottom: 1px solid #efefef;
	  }
	
	  .history-list {
	    display: flex;
	    flex-wrap: wrap;
	
	    .uni-tag {
	      margin-top: 5px;
	      margin-right: 5px;
	    }
	  }
	}
</style>