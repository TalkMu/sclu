const BASE_URL = "http://home.koolss.com:8080/"

export default async function request(options){
  const { url, data, method = 'GET',params} = options
  let {header} = options
  if(header == null || header == ''){
	  header = {
		  'Authorization':''
	  }
  }
  const token = uni.getStorageSync("token");
  if(token != null && token != ''){
	  header['Authorization'] = token
  }
  
  if (header != '' && 
  header != null && 
  method === 'POST' && 
  data != null && 
  data != '' && 
  header['content-type'] != '') {
    header['content-type'] = 'application/json'
  }
  const url_full = BASE_URL + url;

  return uni.request({
    url:url_full,
    method,
    data: data?data:params,
    header
  }).then(async (res) => {
	  if(res.data.code == 401){
		  uni.navigateTo({
		  	url:'/pages/login/login'
		  })
	  }else{
		  return res
	  }
    
  }).catch((err) => {
    return err;
  })
}