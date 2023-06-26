<template>
	<view>
		<view class="message-list">
			<view class="tm-section">
				<view class="decoration"></view>
				<text class="title">全部留言</text>
			</view>
			<view class="input-column">
				<image class="avatar" :src="curUser.avatarUrl"></image>
				<input class="msg-input" placeholder="看对眼就留言,问问更多细节~" disabled="true" @click="onMsgInputClick" />
			</view>
			<view class="message-item" v-for="(item,index) of list">
				<view class="leave">
					<image class="avatar" :src="item.fromUser.avatarUrl"></image>
					<view class="detail" @click="onReply(item)">
						<view class="top">
							<text class="nick-name">{{item.fromUser.nickName}}</text>
							<text class="mark" v-if="item.hasSeller">卖家</text>
							<text class="symbol">·</text>
							<text class="create-time">{{item.createTime}}</text>
							<text class="ip-territory">{{item.fromUser.ipTerritory}}</text>
						</view>
						<view class="bottom">
							<text class="content">{{item.content}}</text>
						</view>
					</view>
					<view class="right">
						<uni-icons :type="item.hasLike?'hand-up-filled':'hand-up'" size="20" @click="onLeaveClick(item)"></uni-icons>
					</view>
				</view>
				<view class="reply-list" v-if="item.children">
					<view class="reply-item" v-for="(replyItem,replyIndex) of item.children">
						<image class="avatar" :src="replyItem.fromUser.avatarUrl"></image>
						<view class="detail" @click="onReply(replyItem)">
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
		<view class="comment-dialog" v-if="commentDialogVisible" :style="['bottom:'+keyBoardHeight+'px']">
			<input class="comment-input" @input="onCommentInput" @confirm="onCommentSubmit" @blur="commentDialogVisible = false" :adjust-position="false" @keyboardheightchange="onKeyBoardHeightChange" focus confirm-type="send" :placeholder="commentPlaceholder" />
			<button class="mini-btn comment-submit" type="primary" size="mini" @click="onCommentSubmit">发送</button>
		</view>
	</view>
</template>

<script>
	import {add,list} from '@/api/commodity_comment.js'
	import {handleTree} from '@/utils/tools.js'
	export default {
		name:"leave-message",
		props: {
			commodityId: {
				type: Number,
				default: null,
				required: true,
			}
		},
		mounted() {
			const userInfo = uni.getStorageSync("userInfo");
			this.curUser = {
				userId:userInfo.userId,
				avatarUrl:userInfo.avatarUrl
			}
			// 加载评论数据
			this.loadData();
		},
		data() {
			return {
				curUser:{
					userId:null,
					avatarUrl:null
				},
				content:null,
				selectCommentItem:null,
				commentPlaceholder:null,
				keyBoardHeight:null,
				commentDialogVisible:false,
				list: [{
					fromUser: {
						avatarUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b",
						nickName: "咸鱼用户",
						userId: 1,
						ipTerritory: "四川"
					},
					hasSeller: false,
					content: "宝贝还在吗？",
					createTime: "1个月前",
					hasLike: true,
					replyList: [{
							fromUser: {
								avatarUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b",
								nickName: "咸鱼用户222",
								userId: 3,
								ipTerritory: "四川"
							},
							content: "老板还有吗？",
							createTime: "1个月前",
							hasSeller: false,
							hasLike: false,
							toUser: {
								avatarUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b",
								nickName: "悦享家私",
								userId: 2,
								ipTerritory: "四川"
							},
						},
						{
							fromUser: {
								avatarUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b",
								nickName: "悦享家私",
								userId: 2,
								ipTerritory: "四川"
							},
							hasSeller: true,
							content: "在的，私聊！",
							createTime: "1个月前",
							hasLike: false,
							toUser: null
						}
					]
				}]
			};
		},
		methods:{
			loadData(){
				const params = {
					commodityId:this.commodityId
				}
				list(params).then(res=>{
					const data = handleTree(res.data.data)
					console.log(JSON.stringify(data))
					this.list = data;
				})
			},
			onCommentInput(event){
				const content = event.detail.value;
				this.content = content;
			},
			onCommentSubmit(event){
				const params = {
					fromId:this.curUser.userId,
					toId:null,
					content:this.content,
					commodityId:this.commodityId,
					parentId:null
				}
				if(this.selectCommentItem != null){
					params.toId = this.selectCommentItem.fromUser.userId
					params.parentId = this.selectCommentItem.parentId==null?this.selectCommentItem.id:this.selectCommentItem.parentId
				}
				add(params).then(res=>{
					if(res.data.code == 200){
						uni.showToast({
							title:'留言成功'
						})
						this.loadData();
					}
				})
			},
			onKeyBoardHeightChange(event){
				const item = event.detail
				this.keyBoardHeight = item.height
			},
			onMsgInputClick(){
				this.commentDialogVisible = true;
				this.selectCommentItem = null
				this.commentPlaceholder = '看对眼就留言，问问更多细节~'
			},
			onReply(item){
				this.selectCommentItem = item
				this.commentPlaceholder = '回复 '+ item.fromUser.nickName + ":"
				this.commentDialogVisible = true;
			},
			onLeaveClick(item){
				item.hasLike = !item.hasLike
			}
		}
	}
</script>

<style lang="scss">
	.message-list {
		.tm-section{
			display: flex;
			align-items: center;
			height: 20px;
			.decoration{
				width: 5px;
				height: 20px;
				background-color: #fae441;
			}
			.title{
				font-size: 16px;
				color: #222222;
				margin-left: 5px;
			}
		}
		
		.input-column {
			margin-top: 10px;
			padding: 10px 0px;
			display: flex;
			align-items: center;
		
			.avatar {
				width: 30px;
				height: 30px;
				border-radius: 15px;
			}
		
			.msg-input {
				padding: 0px 10px;
				background-color: #f7f7f7;
				flex: 1;
				margin: 0px 10px;
				font-size: 14px;
				height: 30px;
				line-height: 30px;
				border-radius: 15px;
			}
		}
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