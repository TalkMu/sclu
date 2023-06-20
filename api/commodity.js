import request from '../utils/request.js'

export async function add(data){
	return request({
		url:"xzm/xzmCommodity/add",
		method:"post",
		data:data
	})
}