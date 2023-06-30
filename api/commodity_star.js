import request from '../utils/request.js'

export async function add(data){
	return request({
		url:"/xzm/commodityStar",
		method:"post",
		data:data
	})
}
export async function cancel(data){
	return request({
		url:"/xzm/commodityStar/cancel",
		method:"delete",
		data:data
	})
}
export async function remove(data){
	return request({
		url:"/xzm/commodityStar/"+data,
		method:"delete",
	})
}
export async function list(data){
	return request({
		url:"/xzm/commodityStar/appList",
		method:"get",
		params:data
	})
}