import request from '../utils/request.js'

export async function add(data){
	return request({
		url:"/xzm/xzmCommodity/save",
		method:"post",
		data:data
	})
}
export async function update(data){
	return request({
		url:"/xzm/xzmCommodity",
		method:"put",
		data:data
	})
}
export async function getDetail(data){
	return request({
		url:"/xzm/xzmCommodity/detail",
		method:"get",
		params:data
	})
}
export async function getEditData(data){
	return request({
		url:"/xzm/xzmCommodity/getEditData",
		method:"get",
		params:data
	})
}

export async function getList(data){
	return request({
		url:"/xzm/xzmCommodity/appList",
		method:"get",
		params:data
	})
}

export async function getMyList(data){
	return request({
		url:"/xzm/xzmCommodity/appMyList",
		method:"get",
		params:data
	})
}

export async function remove(data){
	return request({
		url:"/xzm/xzmCommodity/"+data,
		method:"delete",
	})
}