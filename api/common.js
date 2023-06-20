import request from '../utils/request.js'


export async function uploadFile(data) {
	return request({
		url: "common/upload",
		method: "post",
		headers: {
			"content-type": "multipart/form-data"
		},
		data: data
	})
}

export async function uploadFiles(data) {
	return request({
		url: "common/uploads",
		method: "post",
		data: data
	})
}