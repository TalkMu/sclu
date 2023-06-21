import request from '../utils/request.js'

export async function userHasExist(data){
	return request({
		url:"/appletHasExist",
		method:"GET",
		params:data
	})
}

export async function getToken(data){
	return request({
		url:"/appletLogin",
		method:"post",
		data:data
	})
}
export async function getInfo(){
	return request({
		url:"/getInfo",
		method:"get",
	})
}
export async function getPhoneNumber(data){
	return request({
		url:"/appletGetPhoneNumber",
		method:"post",
		data:data
	})
}