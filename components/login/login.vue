<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
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
	import Useuserinfo from "../../store/user.js"
	const userinfo = Useuserinfo()


	const getUserInfo = async e => {
		let res = await uni.getUserProfile({
			desc: "login"
		}).catch(err => {
			if (err.errMsg == "getUserProfile:fail auth deny") {
				uni.$showMsg("您取消了授权！")
			}
		})
		userinfo.updataUserinfo(res)
		gettoken(res)
	}


	const gettoken = async info => {
		console.log(info);
		const res = await uni.login().catch(err => {
			uni.$showMsg("登陆失败");
		})
		console.log(res);
		if (res.errMsg !== "login:ok") return uni.$showMsg("登陆失败");
		const query = {
			code: res.code,
			encryptedData: info.encryptedData,
			iv: info.iv,
			rawData: info.rawData,
			signature: info.signature
		}


		const res_two = await uni.$http.post("/api/public/v1/users/wxlogin", query)
		console.log(res_two);
		if (res_two.statusCode !== 200) return uni.$showMsg("登陆失败！")
		userinfo.updataToken(
			"BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
			)
		uni.$showMsg("登陆成功！")
		navigateBack()
	}
	const navigateBack = () => {
		if (userinfo.data.redirectInfo && userinfo.data.redirectInfo.openType == "switchTab") {
			uni.switchTab({
				url: userinfo.data.redirectInfo.from,
				complete: () => {
					userinfo.updataRedirectInfo(null)
				}
			})
		}
	}
</script>


<style lang="scss" scoped>
	.login-container {
		// 登录盒子的样式
		height: 700rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		// 绘制登录盒子底部的半椭圆造型
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		// 登录按钮的样式
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		// 按钮下方提示消息的样式
		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>