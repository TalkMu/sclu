<template>
	<view class="container">
		<view class="logo-wrapper">
			<image :src="logoUrl" class="logo"></image>
		</view>
		<view class="submit-wrapper">
			<button type="primary" class="submit-btn" @click="onSubmit()">微信一键登录</button>
			<button type="default" class="cancel-btn" @click="uni.navigateBack()">取消</button>
		</view>

	</view>
</template>

<script>
	import {
		getToken,getInfo
	} from '/api/user.js'
	export default {
		data() {
			return {
				logoUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b",
			};
		},
		onLoad() {

		},
		methods: {
			getLoginCode(){
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
			},
			onSubmit() {
				const appId = this.$appId;
				const params = {
					code: "",
					appId: appId,
					iv:"",
					encryptedData:"",
				}
				const that = this;
				uni.getUserProfile({
					desc:"用于完善会员资料",
					success: function(infoRes) {
						console.log('用户信息：' + JSON.stringify(infoRes));
						params.iv = infoRes.iv
						params.encryptedData = infoRes.encryptedData
						that.getLoginCode().then((code)=>{
							params.code = code;
							getToken(params).then(res=>{
								console.log(JSON.stringify(res));
								const token = res.data.token
								uni.setStorageSync("token", token)
								getInfo().then(res=>{
									const userInfo = res.data.user
									uni.setStorageSync("userInfo",{
										avatarUrl:userInfo.avatar,
										nickName:userInfo.nickName,
										hasLogin:true,
									})
									uni.navigateBack()
								})
							})
						})
						
					},
					fail:function(err){
						console.log('用户信息err：' + JSON.stringify(err));
					}
				})
				uni.setStorageSync("userInfo",{
					avatarUrl:params.avatarUrl,
					nickName:params.nickName,
				})
				
			},
			onFormReSet() {},
			onChooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl;
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 50px 20px 0px 20px;
		background-color: #fff;

		.logo-wrapper {
			text-align: center;
			display: flex;
			justify-content: center;
			.logo {
				display: block;
				width: 100px;
				height: 100px;
				border-radius: 50px;

			}
		}
		.submit-wrapper {
			margin-top: 40px;

			.submit-btn {
				color: #fff;
				background-image: linear-gradient(to right, #19b5bb, #0060b5);
			}

			.cancel-btn {
				margin-top: 10px;
			}
		}

	}
</style>