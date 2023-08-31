<template>
 <view>
    <view class="goods-list">
      <view v-for="(goods, i) in data.goodsList" :key="i" @click="gotoDetail(goods)">
		<Mygoods :goods="goods" ></Mygoods>
      </view>
    </view>
  </view>
</template>

<script setup>
	import Mygoods from "@/components/my_goods/my_goods.vue"
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
	const data = reactive({
		queryObj:{
			query: "",
			cid: "",
			pagenum: 1,
			pagesize: 10,
		},
		goodsList: [],
		total: 0,
		isLoading:false

	})
	onLoad((options) => {
		data.queryObj.cid = options.cid || ""
		data.queryObj.query = options.query || ""
		if(!data.isLoading) getGoodsList();
	})
	const getGoodsList = async (cb) => {
		data.isLoading = true
		let res  = await uni.$http.get("/api/public/v1/goods/search",data.queryObj)
		data.isLoading = true
		if(res.data.meta.status!==200) return
		data.goodsList.push(...res.data.message.goods)
		data.total = res.data.message.total
		data.isLoading = false
		cb && cb()
		console.log("商品列表页面",res);
	}
	onReachBottom(()=>{
		if(data.queryObj.pagenum * data.queryObj.pagesize >= data.total) return uni.$showMsg("数据加载完毕!")
		if(!data.isLoading) 
		data.queryObj.pagenum = data.queryObj.pagenum + 1
		getGoodsList();
	})
	onPullDownRefresh(()=>{
		data.queryObj.pagenum = 1;
		data.total = 0;
		data.isLoading = false;
		data.goodsList = [];
		getGoodsList(()=>uni.stopPullDownRefresh());
	})
	const gotoDetail = (item) =>{
		uni.navigateTo({
			url:"/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
		})
	}
</script>

<style lang="scss" scoped>

</style>