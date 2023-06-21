import request from '../utils/request.js'

export async function list(data){
	return request({
		url:"/xzm/xzmCommodityCategory/list",
		method:"get",
		params:data
	})
}