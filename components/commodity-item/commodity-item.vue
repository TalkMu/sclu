<template>
	<view class="commodity-list">
		
		<view v-for="(item,index) of commodityList" class="commodity-item" @click="onCommodityItemClick">
			<image class="cover-img" :src="item.coverImgUrl" mode="widthFix"></image>
			<view class="detail-content">
				<view v-if="item.hasFreeShipping" class="left">
					<text class="free-shipping">包邮</text>
					<view class="symbol"></view>
				</view>
				<text class="commodity-content">{{item.content}}</text>
			</view>
			<view class="publish-time">
				<uni-icons class="time-icon" type="info" size="20"></uni-icons>
				<text class="time-text">{{item.createTime}}</text>
			</view>
			<!-- <view style="border: 1px solid red;">
				<view style="border: 1px solid red;">
					123
				</view>
			</view> -->
			<view class="price-info">
				<text class="symbol">￥</text>
				<text class="price">{{item.price}}</text>
				<text class="original-price">￥{{item.originalPrice}}</text>
				<text class="want">{{item.wantCount}}人想要</text>
			</view>
			<view class="user">
				<image class="avatar" :src="item.user.avatarUrl"></image>
				<text class="nick-name">{{item.user.nickName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "commodity-item",
		props: {
			list: {
				type: Array,
				default: [],
				required: true,
			}
		},
		data() {
			return {
				commodityList: this.list
			};
		},
		watch:{
			list: {
				handler(val) {
					this.commodityList = val
				}
			}
		},
		methods:{
			onCommodityItemClick(){
				uni.navigateTo({
					url:'/pages/commodity/commodity'
				})
			}
		}
	}
</script>

<style lang="scss">
	.commodity-list{
		.commodity-item {
			padding: 5px 0px;
			display: flex;
			flex-direction: column;
			gap: 5px;
		
			.cover-img {
				width: 100%;
			}
		
			.detail-content {
				font-size: 14px;
				height: 30px;
				line-height: 30px;
				display: flex;
		
				.left {
					display: flex;
					align-items: center;
		
					.free-shipping {
						color: #519fe7;
						font-weight: 600;
					}
		
					.symbol {
						margin: 0px 5px;
						width: 1px;
						background-color: #b0b0b0;
						height: 12px;
					}
		
				}
		
				.commodity-content {
					overflow: hidden;
					font-weight: 600;
					flex: 1;
				}
		
			}
		
			.publish-time {
				width:fit-content;
				// border: 1px solid red;
				border-radius: 10px;
				font-size: 14px;
				background-image: linear-gradient(to right, rgb(249, 248, 204),white);
				.time-icon{
					// border: 1px solid red;
				}
				.time-text{
					// border: 1px solid red;
				}
			}
		
			.price-info {
				height: 40px;
				display: flex;
				align-items: flex-end;
		
				.symbol {
					color: #f94504;
					font-size: 12px;
					font-weight: 600;
				}
		
				.price {
					color: #f94504;
					font-size: 26px;
					font-weight: 600;
				}
		
				.original-price {
					margin-left: 5px;
					font-size: 14px;
					color: #999;
					text-decoration: line-through;
				}
		
				.want {
					margin-left: 5px;
					font-size: 14px;
					color: #999;
				}
			}
		
			.user {
				height: 30px;
				display: flex;
				align-items: center;
		
				.avatar {
					width: 20px;
					height: 20px;
					border-radius: 10px;
				}
		
				.nick-name {
					overflow: hidden;
					margin-left: 5px;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
	
</style>