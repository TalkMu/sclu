<template>
	<view class="container">
		<view class="page-content">
			<view class="head-wrapper">
				<view class="head-left" @click="onLogin">
					<image class="avatar" :src="user.avatarUrl"></image>
					<text class="nickName">{{user.nickName}}</text>
				</view>
				<view class="head-right" @click="exit" v-if="user.hasLogin">
					<uni-icons custom-prefix="iconfont" type="icon-exit2" size="30"></uni-icons>
				</view>
			</view>
			<view class="grid-wrapper">
				<view class="grid-list">
					<view class="item">
						<text class="number">20</text>
						<text>收藏</text>
					</view>
					<view class="item">
						<text class="number">350</text>
						<text>足迹</text>
					</view>
					<view class="item">
						<text class="number">12</text>
						<text>关注</text>
					</view>
					<view class="item">
						<text class="number">55</text>
						<text>粉丝</text>
					</view>
				</view>
			</view>
			<!-- <view class="divider"></view> -->
			<!-- <view class="transaction-wrapper">
				<view class="title-wrapper">
					<text class="title">我的交易</text>
					<text class="totalIncome">在咸鱼赚了{{transactionData.totalIncome}}元</text>
				</view>
				<view class="grid-list">
					<view class="grid-item" v-for="(item,index) of transactionGridList" :key="index">
						<image :src="item.iconPath"></image>
						<text>{{item.text}}</text>
					</view>
				</view>
			</view> -->
			<view class="list-wrapper">
				<uni-list>
					<tm-list-item title="我的发布" showArrow clickable :extra-icon="extraIcon.fabu" @click="toMyPublishPage" />
					<tm-list-item title="意见反馈" showArrow :extra-icon="extraIcon.fankui" open-type="feedback" />
					<tm-list-item title="联系客服" showArrow :extra-icon="extraIcon.kefu" open-type="contact" />
					<tm-list-item title="清除缓存" showArrow clickable :extra-icon="extraIcon.qingchuhuancun"
						@click="onClearCache" />
					<tm-list-item title="分享应用" showArrow clickable :extra-icon="extraIcon.fenxiang" open-type="share"
						/>
				</uni-list>
			</view>	
		</view>
		<view class="tab-bar">
			<tm-tab-bar :currentPage="2"></tm-tab-bar>
		</view>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '自定义分享标题',
				path: '/pages/index/index'
			}
		},
		data() {
			return {
				user: {
					avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
					nickName: "请点击登录",
					hasLogin: false,
				},
				transactionData: {
					totalIncome: 13205.25
				},
				transactionGridList: [{
						iconPath: "/static/logo.png",
						text: "我发布的 38",
					},
					{
						iconPath: "/static/logo.png",
						text: "我卖出的 217",
					},
					{
						iconPath: "/static/logo.png",
						text: "我买到的 3",
					},
					{
						iconPath: "/static/logo.png",
						text: "我发布的 38",
					}
				],
				extraIcon: {
					fabu: {
						color: '#2f2f2f',
						size: '25',
						type: 'icon-fabu',
						customPrefix: 'iconfont'
					},
					qingchuhuancun: {
						color: '#2f2f2f',
						size: '25',
						type: 'icon-qingchuhuancun',
						customPrefix: 'iconfont'
					},
					kefu: {
						color: '#2f2f2f',
						size: '25',
						type: 'icon-kefu',
						customPrefix: 'iconfont'
					},
					fankui: {
						color: '#2f2f2f',
						size: '25',
						type: 'icon-fankui',
						customPrefix: 'iconfont'
					},
					fenxiang: {
						color: '#2f2f2f',
						size: '25',
						type: 'icon-fenxiang',
						customPrefix: 'iconfont'
					}
				}
			};
		},
		onShow() {
			this.initPage();
		},
		methods: {
			toMyPublishPage(){
				const params = {
					status:'my'
				}
				uni.navigateTo({
					url:'/pages/commodity/list?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			onClearCache() {
				// 同步清空本地缓存
				uni.clearStorageSync();
				this.initUserInfo();
				uni.showToast({
					title: "清除成功"
				})
			},
			exit() {
				// 同步清空本地缓存
				uni.clearStorageSync();
				this.initUserInfo();
				uni.showToast({
					title: "退出成功"
				})
			},
			onLogin() {

				if (!this.user.hasLogin) {
					const hasRegister = uni.getStorageSync("hasRegister");
					if (hasRegister) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					} else {
						uni.navigateTo({
							url: '/pages/login/register'
						})
					}
				}
			},
			initPage() {
				const userInfo = uni.getStorageSync("userInfo");
				if (userInfo != null && userInfo != '') {
					console.log("登录成功")
					this.user = {
						hasLogin: true,
						avatarUrl: userInfo.avatarUrl,
						nickName: userInfo.nickName
					}
				} else {
					console.log("未登录")
					this.initUserInfo()
				}
			},
			initUserInfo() {
				this.user = {
					hasLogin: false,
					avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
					nickName: "请点击登录"
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.page-content {
			margin: 0px 10px;
			display: flex;
			flex-direction: column;
			gap: 10px;

			.head-wrapper {
				height: 80px;
				display: flex;
				align-items: center;

				.head-left {
					flex: 1;
					display: flex;
					align-items: center;

					.avatar {
						display: block !important;
						width: 60px;
						height: 60px;
						border-radius: 30px;
					}

					.nickName {
						font-size: 18px;
						font-weight: 600;
						margin-left: 10px;
					}
				}

				.head-right {
					margin-right: 20px;
				}

			}

			.grid-wrapper {
				background-color: #fff;
				border-radius: 20px;
				overflow: hidden;
				padding: 5px 0px;
				font-size: 14px;

				.grid-list {
					display: flex;
					flex-direction: row;
					height: 60px;
					width: 100%;
					align-items: center;
					justify-content: space-around;

					.item {
						height: 60px;
						display: flex;
						flex-direction: column;
						text-align: center;
						justify-content: center;

						.number {
							font-size: 18px;
							font-weight: 700;
							margin-bottom: 3px;
						}
					}
				}
			}

			.divider {
				margin: 10px 0px;
				border-top: 1px solid #e3e3e3;
			}

			.transaction-wrapper {
				.title-wrapper {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						font-size: 16px;
						font-weight: 500;
					}

					.totalIncome {
						color: #808080;
					}
				}

				.grid-list {
					margin-top: 10px;
					display: flex;
					justify-content: space-between;

					.grid-item {
						display: flex;
						flex-direction: column;
						align-items: center;

						image {
							width: 40px;
							height: 40px;
						}

						text {
							margin-top: 5px;
							font-size: 12px;
						}
					}
				}
			}

			.list-wrapper {
				border-radius: 20px;
				overflow: hidden;

				.cell-btn {
					padding: 0 10px 0 15px;
					border: 0;
					font-size: 14px;
					height: 50px;
					width: 100%;
					display: flex;
					align-items: center;

					.item-left {
						display: flex;
						align-items: center;
						flex: 1;

						.title {
							margin-left: 10px;
						}
					}

					.item-right {
						display: flex;
						align-items: center;
					}
				}
			}
		}

	}
</style>