import request from '../utils/request.js'

export async function regeo(data) {
	return request({
		url: "/common/regeo",
		method: "get",
		params: data
	})
}