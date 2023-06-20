import request from '../utils/request.js'

export async function login(data){
	return request({
		url:"appletLogin",
		method:"post",
		data:data
	})
}
export async function getPhoneNumber(data){
	return request({
		url:"appletGetPhoneNumber",
		method:"post",
		data:data
	})
}