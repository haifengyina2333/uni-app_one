export default {
	baseUrl: "",
	Timeout: null,
	/* 一般需要需要重写下面两个方法 */
	// 请求发送前的相关代码
	beforeRequest: () => {
		console.log("请求执行前")

	},
	afterRequest: (res) => {
		console.log("请求执行后")
		return res
	},
	// 内部使用的方法
	_request(httpurl, params, type) {
		if (!params) params = {}
		this.beforeRequest();
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.baseUrl + httpurl,
				method: type,
				timeout: this.Timeout || 3000,
				data: params,
				header: {
					// Bearer eyJhbGciOiJIUzl1NilsInR5cCl6lkpXVCJ
// 9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MZAwNzks
// ImV4cCl6MTAwMTU2NDCZMDA30HO.YPt-
// XeLnjV-
// _1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo
					Authorization: `BearereyJhbGciOiJIUzl1NilsInR5cCl6lkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MZAWNzksImV4cCl6MTAwMTU2NDCZMDA3OHO.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo`
				},
				success: (res) => {
					resolve(this.afterRequest(res));
				},
				fail: (error) => {
					reject(error);
				},
			});
		});
	},
	get: function(httpurl, params) {
		return this._request(httpurl, params, "GET")
	},
	post: function(httpurl, params) {
		return this._request(httpurl, params, "POST")

	}
}