import request from '../utils/request.js'

export async function regeo(data) {
	return request({
		url: "/common/regeo",
		method: "get",
		params: data
	})
}
export async function dictType(dictType) {
	return request({
		url: "/system/dict/data/type/"+dictType,
		method: "get",
	})
}