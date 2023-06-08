<template>
	<view class="container">
		<view class="head-wrapper">
			<image class="avatar" :src="user.avatarUrl"></image>
			<text class="nickName">{{user.nickName}}</text>
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
				<view class="item">
					<text class="number">2</text>
					<text>帖子</text>
				</view>
			</view>
		</view>
		<view class="divider"></view>
		<view class="transaction-wrapper">
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
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					avatarUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ffc2d272d-3899-4af7-a6b0-bcb640b9cdd2%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1688310495&t=80ff26ebd558193e55104ec8390d8659",
					nickName: "咸鱼用户",

				},
				transactionData:{
					totalIncome:13205.25
				},
				transactionGridList:[
					{
						iconPath:"/static/logo.png",
						text:"我发布的 38",
					},
					{
						iconPath:"/static/logo.png",
						text:"我卖出的 217",
					},
					{
						iconPath:"/static/logo.png",
						text:"我买到的 3",
					},
					{
						iconPath:"/static/logo.png",
						text:"我发布的 38",
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	.container {
		margin: 20px 20px;
		.head-wrapper {
			height: 60px;
			display: flex;
			line-height: 60px;
			.avatar {
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
		.grid-wrapper{
			margin-top: 20px;
			font-size: 14px;
			.grid-list{
				display: flex;
				flex-direction: row;
				height: 60px;
				width: 100%;
				align-items: center;
				justify-content: space-between;
				.item{
					height: 60px;
					display: flex;
					flex-direction: column;
					text-align: center;
					justify-content: center;
					.number{
						font-size: 18px;
						font-weight: 700;
						margin-bottom: 3px;
					}
				}
			}
		}
		.divider{
			margin: 10px 0px;
			border-top: 1px solid #e3e3e3;
		}
		.transaction-wrapper{
			.title-wrapper{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title{
					font-size: 16px;
					font-weight: 500;
				}
				.totalIncome{
					color: #808080;
				}
			}
			.grid-list{
				margin-top: 10px;
				display: flex;
				justify-content: space-between;
				.grid-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					image{
						width: 40px;
						height: 40px;
					}
					text{
						margin-top: 5px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>