import {
	defineStore
} from "pinia"
import {
	ref,
	reactive,
	computed
} from "vue"
// 创造小仓库
export default defineStore("cart", () => {
	const data = reactive({
		cart: JSON.parse(uni.getStorageSync("cart") || "[]")
	})

	const saveCart = () => {
		uni.setStorageSync("cart", JSON.stringify(data.cart))
	}

	const addToCart = (value) => {
		console.log("Pinia-----商品添加方法被调用", value);
		const findResult = data.cart.find(x => x.goods_id === value.goods_id)
		if (!findResult) {
			data.cart.unshift(value)
		} else {
			findResult.goods_count++
		}

		console.log("调用结束 data为", data);
		saveCart()
	}
	const total = computed(() => {
		let c = 0
		data.cart.forEach(item => {
			c = c + item.goods_count
		})
		saveCart()
		return c
	})
	const updataGoodsState = (item) =>{
		const findResult = data.cart.find(x=>x.goods_id === item.goods_id)
		if(findResult) {
			findResult.goods_state = item.goods_state
			saveCart()
		}
	}
	const updataGoodsCount = (item) =>{
		const findResult = data.cart.find(x=>x.goods_id === item.goods_id)
		if(findResult) {
			findResult.goods_count = item.goods_count
			saveCart()
		}
	}
	const removeGoodsById = id =>{
		data.cart = data.cart.filter(item => item.goods_id !== id)
		saveCart()
	}
	const checkedCount = computed(()=>{
		return data.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
	})
	const updateAllGoodsState = newState =>{
		console.log(newState);
		data.cart.forEach(x => x.goods_state = newState)
		saveCart()
	}
	const log = () =>{
		console.log(checkedCount,total);
	}
	const checkedGoodsAmount = computed(()=>{
		return data.cart.filter(x => x.goods_state)
				.reduce((total,item)=>total +=item.goods_count * item.goods_price,0).toFixed(2)
	})
	return {
		data,
		addToCart,
		total,
		updataGoodsState,
		updataGoodsCount,
		removeGoodsById,
		checkedCount,
		updateAllGoodsState,
		log,
		checkedGoodsAmount

	}
})