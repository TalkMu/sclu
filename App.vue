<script>
	import {userHasExist} from '@/api/user.js'
	import {regeo} from '@/api/common.js'
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			uni.hideTabBar();
			this.userHasExist();
			this.authorizeLocation();
		},
		onLoad() {
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			authorizeLocation() {
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() {
						that.getLocation()
					},
					complete() {
						that.getLocation()
					}
				})
			},
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						const params = {
							longitude: res.longitude,
							latitude: res.latitude
						}
						regeo(params).then(res => {
							uni.setStorageSync("location", res.data.data)
						})
			
					}
				});
			},
			userHasExist(){
				const appId = this.$appId;
				this.getCode().then(res=>{
					const params = {
						code:res,
						appId:appId
					}
					userHasExist(params).then(res=>{
						if(res.data.code == 200){
							uni.setStorageSync("hasRegister",res.data.data);
						}
					})
				})
			},
			getCode(){
				return new Promise((resolve, reject)=>{
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
							console.log(res.provider)
							if (~res.provider.indexOf('weixin')) {
								uni.login({
									provider: 'weixin',
									success: function (loginRes) {
										console.log(JSON.stringify(loginRes));
										resolve(loginRes.code)
									},
									fail:function(err){
										console.log(err)
									}
								});
							}
						},
						fail: function(err) {
							console.log(err)
						}
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "@/static/iconfont.css";
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	
	// 主色调
	$xzm-main-bg-color:#fae441;

	// 设置整个项目的背景色
	page {
		background-color: #f7f7f7;
		// background-color: #f90c0c;
		color: #222222;
		// padding-bottom: constant(safe-area-inset-bottom);
		// padding-bottom: env(safe-area-inset-bottom);
		// padding-bottom: 34px;

	}
	view{
		// background-color: #fff;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	.tab-bar{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: white;
	}

</style>