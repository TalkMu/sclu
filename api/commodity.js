import request from '../utils/request.js'

export async function add(data){
	return request({
		url:"/xzm/xzmCommodity",
		method:"post",
		data:data
	})
}
export async function getDetail(id){
	return request({
		url:"/xzm/xzmCommodity/"+id,
		method:"get",
	})
}
export async function getList(data){
	return request({
		url:"/xzm/xzmCommodity/appList",
		method:"get",
		params:data
	})
}