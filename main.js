


// #ifndef VUE3
import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

import http from "./request.js"
http.baseUrl = "https://www.uinav.com"
http.beforeRequest=()=>{
	console.log("请求执前，触发提示框")
	uni.showLoading({
		title:"数据加载中..."
	})

}
http.afterRequest=(res)=>{
	console.log("请求执后，关闭提示框")
	uni.hideLoading({
		// 出现错误的原因如下	
		// 1、是微信小程序
		// 2、把请求接口统一封装，开始请求接口时showLoading，请求接口后hideLoading
		// 3、一个页面同时请求多个接口，由于请求是异步的，很有可能上一个开启了showLoading还没请求完成下一个有开始请求了，这个时候的showLoading与hideLoading就没有对应了
		// 解决IOS报错
		fail(){}
	});
	return res
}
uni.$http = http

uni.$showMsg = (value) => {
	console.log("showMsg触发");
	uni.showToast({
			title:value||"数据请求失败",
			duration:1500,
			icon:"none"
		});
		}


// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
// import {initRouter} from "./router/index.js"
import {initPinia} from "./store/index.js"
export function createApp() {
  const app = createSSRApp(App)
  // 挂载Pinia
  initPinia(app);
  // initRouter(app);
  return {
    app
  }
}
// #endif