import request from '../utils/request.js'

export async function add(data){
	return request({
		url:"/xzm/commodityStar",
		method:"post",
		data:data
	})
}
export async function remove(data){
	return request({
		url:"/xzm/commodityStar/cancel",
		method:"delete",
		data:data
	})
}