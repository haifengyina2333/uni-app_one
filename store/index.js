// 初始化Pinia
import {createPinia} from "pinia"
let store = createPinia();
export const initPinia = (app) =>{
	app.use(store)
}