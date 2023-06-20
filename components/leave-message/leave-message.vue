<template>
	<view>
		<view class="message-list">
			<view class="message-item" v-for="(item,index) of list">
				<view class="leave">
					<image class="avatar" :src="item.user.avatarUrl"></image>
					<view class="detail">
						<view class="top">
							<text class="nick-name">{{item.user.nickName}}</text>
							<text class="mark" v-if="item.hasSeller">卖家</text>
							<text class="symbol">·</text>
							<text class="create-time">{{item.createTime}}</text>
							<text class="ip-territory">{{item.user.ipTerritory}}</text>
						</view>
						<view class="bottom">
							<text class="content">{{item.content}}</text>
						</view>
					</view>
					<view class="right">
						<uni-icons :type="item.hasLike?'hand-up-filled':'hand-up'" size="20" @click="onLeaveClick(item)"></uni-icons>
					</view>
				</view>
				<view class="reply-list" v-if="item.replyList">
					<view class="reply-item" v-for="(replyItem,replyIndex) of item.replyList">
						<image class="avatar" :src="replyItem.fromUser.avatarUrl"></image>
						<view class="detail">
							<view class="top">
								<text class="nick-name">{{replyItem.fromUser.nickName}}</text>
								<text class="mark" v-if="replyItem.hasSeller">卖家</text>
								<text class="symbol">·</text>
								<text class="create-time">{{replyItem.createTime}}</text>
								<text class="ip-territory">{{replyItem.fromUser.ipTerritory}}</text>
							</view>
							<view class="bottom">
								<view v-if="replyItem.toUser">
									回复<text style="font-weight: 600;color: #999;">{{replyItem.toUser.nickName}}</text>:
								</view>
								<text class="content">{{replyItem.content}}</text>
							</view>
						</view>
						<view class="right">
							<uni-icons :type="replyItem.hasLike?'hand-up-filled':'hand-up'" size="20" @click="onLeaveClick(replyItem)"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"leave-message",
		props: {
			list: {
				type: Array,
				default: [],
				required: true,
			}
		},
		data() {
			return {
				list: this.list
			};
		},
		methods:{
			onLeaveClick(item){
				item.hasLike = !item.hasLike
			}
		}
	}
</script>

<style lang="scss">
	.message-list {
		.message-item {
			padding: 10px 0px;
	
			.leave {
				display: flex;
				align-items: flex-start;
	
				.avatar {
					width: 30px;
					height: 30px;
					border-radius: 15px;
				}
	
				.detail {
					margin: 0px 10px;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
	
					.top {
						display: flex;
						align-items: center;
						color: #999;
	
						.nick-name {
							font-size: 16px;
							font-weight: 600;
						}
	
						.mark {
							color: #f7f7f7;
							font-size: 12px;
							background-color: #222222;
							padding: 2px 4px;
							margin-left: 5px;
							border-radius: 5px;
						}
	
						.symbol {
							margin: 0px 5px;
						}
	
						.create-time {
							font-size: 8px;
						}
	
						.ip-territory {
							border-radius: 5px;
							margin-left: 5px;
							font-size: 10px;
							background-color: #f7f7f7;
							padding: 3px;
						}
					}
	
					.bottom {
						.content {
							font-size: 14px;
						}
					}
				}
	
				.right {
					margin-right: 10px;
					text-align: right;
				}
			}
	
			.reply-list {
				margin-left: 40px;
	
				.reply-item {
					padding: 10px 0px;
					display: flex;
					align-items: flex-start;
	
					.avatar {
						width: 30px;
						height: 30px;
						border-radius: 15px;
					}
	
					.detail {
						margin: 0px 10px;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
	
						.top {
							display: flex;
							align-items: center;
							color: #999;
	
							.nick-name {
								font-size: 16px;
								font-weight: 600;
							}
	
							.mark {
								color: #f7f7f7;
								font-size: 12px;
								background-color: #222222;
								padding: 2px 4px;
								margin-left: 5px;
								border-radius: 5px;
							}
	
							.symbol {
								margin: 0px 5px;
							}
	
							.create-time {
								font-size: 8px;
							}
	
							.ip-territory {
								border-radius: 5px;
								margin-left: 5px;
								font-size: 10px;
								background-color: #f7f7f7;
								padding: 3px;
							}
						}
	
						.bottom {
							font-size: 14px;
							display: flex;
							align-items: center;
	
							.content {
							}
						}
					}
	
					.right {
						margin-right: 10px;
						text-align: right;
					}
				}
			}
		}
	}
</style>