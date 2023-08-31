import { reactive, toRefs, onMounted ,watch,ref,computed } from 'vue'
import {onShow,onHide} from "@dcloudio/uni-app"
import usecartInfo from "../store/cart.js"
export default function (){
	const cartInfo = usecartInfo();
	const setBadge = () =>{
		uni.setTabBarBadge({
			index:2,
			// 必须是字符串
			text:cartInfo.total + ''
		})
	}
	onShow(()=>{
		setBadge()
	})
	onHide(()=>{
		setBadge()
	})
	watch(()=>cartInfo.total,()=>{
		setBadge()
	})
}