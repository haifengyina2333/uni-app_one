import {defineStore} from "pinia"
import {ref,reactive} from "vue"
// 创造小仓库
let usedemoStore = defineStore("demo",()=>{
	let demo_data = ref(1000000)
	
	return {
		demo_data
	}
})

export default usedemoStore