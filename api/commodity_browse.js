import request from '../utils/request.js'

export async function list(data){
	return request({
		url:"/xzm/commodityBrowse/appList",
		method:"get",
		params:data
	})
}
export async function remove(data){
	return request({
		url:"/xzm/commodityBrowse/"+data,
		method:"delete",
	})
}