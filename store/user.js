import {
	defineStore
} from "pinia"
import {
	ref,
	reactive,
	computed
} from "vue"
// 创造小仓库
export default defineStore("userinfo", () => {
	const data = reactive({
		token:uni.getStorageSync('token') || "",
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || "{}"),
		redirectInfo:null
	})
	
	const saveData = () =>{
			uni.setStorageSync("token",data.token)
			uni.setStorageSync("userinfo",JSON.stringify(data.userinfo))
	}
	
	const updataUserinfo = value =>{
		data.userinfo = value
		saveData()
	}
	const updataToken = value => {
		data.token = value
		saveData()
	}
	const updataRedirectInfo = info =>{
		data.redirectInfo = info
	}

	
	return {
		data,
		updataUserinfo,
		updataToken,
		updataRedirectInfo,
	}
})