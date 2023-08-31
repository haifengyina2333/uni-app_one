<template>
	<view class="address-choose-box" v-if="JSON.stringify(data.address) === '{}' ">
		<button type="primary" size="mini" class="btnaddChooseAddress" @click="chooseAddress">请选择收货地址 + </button>
	</view>
	<view class="address-info-box" v-else>	
		<view class="one">
			<view class="one-left">
				<view class="username">
					收货人:
				</view>
			</view>
			<view class="one-right">
				<view class="phone">电话：188XXXXXXXX</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view class="two">
			<view class="two-left">
				收货地址：
			</view>
			<view class="two-right">
				广东省深圳市南山区广东省深圳市南山区广东省深圳市南山区广东省深圳市南山区广东省深圳市南山区
			</view>
		</view>
	</view>
	<image src="/static/border.png" class="address-border"></image>
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
		address:{

		}
	})
		// 收货地址功能（有bug） api无权限调用
	const chooseAddress = async () =>{
		return uni.showToast({
			title:"功能残疾!",
			icon:"error"
		})
		const ret = await uni.chooseAddress()
		if(err === null && succ.errMsg === "chooseAddress:ok"){
			data.address = succ
			console.log(ret);
		}
		
	}
</script>


<style lang="scss" scoped>
	.address-border {
		display: block;
		width: 100%;
		height: 5px;

	}

	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;

		.btnaddChooseAddress {}
	}
	.address-border {
	  display: block;
	  width: 100%;
	  height: 5px;
	}
	
	
	// 渲染收货信息的盒子
	.address-info-box {
	  font-size: 12px;
	  height: 90px;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  padding: 0 5px;
	
	  // 第一行
	  .one {
	    display: flex;
	    justify-content: space-between;
	
	    .one-right {
	      display: flex;
	      align-items: center;
	
	      .phone {
	        margin-right: 5px;
	      }
	    }
	  }
	
	  // 第二行
	  .two {
	    display: flex;
	    align-items: center;
	    margin-top: 10px;
	
	    .two-left {
	      white-space: nowrap;
	    }
	  }
	}
</style>