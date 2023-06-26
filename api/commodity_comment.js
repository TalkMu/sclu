import request from '../utils/request.js'

export async function add(data){
	return request({
		url:"/xzm/commodityComment",
		method:"post",
		data:data
	})
}
export async function list(data){
	return request({
		url:"/xzm/commodityComment/appList",
		method:"get",
		params:data
	})
}