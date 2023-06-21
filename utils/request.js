const BASE_URL = "http://home.koolss.com:9090"

export default async function request(options){
  const { url, data, method = 'GET',params} = options
  let {header} = options
  if(header == null || header == ''){
	  header = {
		  'Authorization':'',
		  'content-type':'application/x-www-form-urlencoded'
	  }
  }
  const token = uni.getStorageSync("token");
  if(token != null && token != ''){
	  header['Authorization'] = token
  }
  
  if (method.toUpperCase() == 'POST' && 
  data != null && 
  data != '') {
    header['content-type'] = 'application/json'
  }
  const url_full = BASE_URL + url;
  console.log("请求路径：%s",url_full)
  return uni.request({
    url:url_full,
    method,
    data: data?data:params,
    header:header
  }).then(async (res) => {
	  if(res.data.code == 401){
		  const hasRegister = uni.getStorageSync("hasRegister");
		  if(hasRegister){
			  uni.navigateTo({
			  	url:'/pages/login/login'
			  })
		  }else{
			  uni.navigateTo({
			  	url:'/pages/login/register'
			  })
		  }
		  
	  }else{
		  return res
	  }
    
  }).catch((err) => {
    return err;
  })
}