<template>
	<view class="container">

		<form @submit="onSubmit" @reset="onFormReSet">
			<button open-type="chooseAvatar" class="avatar-wrapper" @chooseavatar="onChooseAvatar">
				<image :src="avatarUrl" class="avatar"></image>
			</button>
			<view class="describe">
				<text>点击可获取头像</text>
			</view>
			<view class="nick-name-wrapper">
				<input type="nickname" name="nickName" class="nick-name-input" placeholder="请输入昵称" v-model="nickName" />
			</view>
			<view class="submit-wrapper">
				<button type="primary" form-type="submit" class="submit-btn">注册</button>
				<button type="default" class="cancel-btn" @click="uni.navigateBack()">取消</button>
			</view>
		</form>

	</view>
</template>

<script>
	import {
		login
	} from '/api/user.js'
	export default {
		data() {
			return {
				avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
				nickName: "",
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
			onSubmit(e) {
				const params = {
					avatarUrl: this.avatarUrl,
					nickName: e.detail.value.nickName,
					code: "",
					appId: "wx63e671fedd368bc5",
					iv:"",
					encryptedData:"",
				}
				if(params.nickName == ""){
					uni.showToast({
						title: '请输入昵称',
						duration: 2000
					});
					return;
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
							login(params).then(res=>{
								console.log(JSON.stringify(res));
								const token = res.data.token
								uni.setStorageSync("token", token)
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
					hasLogin:true,
				})
				uni.navigateBack()
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

		.avatar-wrapper {
			padding: 0px;
			width: 100px !important;
			height: 100px !important;
			border-radius: 50px;

			.avatar {
				display: block;
				width: 100px;
				height: 100px;
				border-radius: 50px;

			}
		}

		.describe {
			margin-top: 10px;
			width: 100%;
			text-align: center;
			color: #999;
			font-size: 12px;
		}

		.nick-name-wrapper {
			margin-top: 20px;

			.nick-name-input {
				text-align: center;
				height: 40px;
				background-color: #f7f7f7;
				border-radius: 20px;
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