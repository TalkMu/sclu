<template>
	<view class="container">
		<view class="commodity-wrapper">
			<view class="user-column">
				<view class="left">
					<image class="avatar" :src="user.avatarUrl"></image>
					<view class="content">
						<text class="nick-name">{{user.nickName}}</text>
						<view class="detail">
							<text>1小时前来过</text>
							<view class="symbol" v-if="user.location"></view>
							<text>{{user.location}}</text>
						</view>
					</view>
				</view>
				<view :class="['right',hasConcern?' active':'']" @click="onConcernChange">
					{{hasConcern?"已关注":"+ 关注"}}
				</view>
			</view>
			<view class="price-column">
				<view class="left">
					<view class="left-price">
						<text class="symbol">￥</text>
						<text class="price">{{price}}</text>
					</view>
					<text class="original-price" v-if="originalPrice">￥{{originalPrice}}</text>
					<text class="delivery-mode">{{deliveryMode}}</text>
				</view>
				<view class="right">
					<view class="fineness">{{fineness}}</view>
					<text class="browse">{{wantCount}}人想要 {{browseCount}}浏览</text>
				</view>
			</view>
			<view class="content-column">
				{{content}}
			</view>
			<view class="attribute-column">
				<view style="display: flex;overflow: auto;white-space: nowrap;">
					<view v-for="(item,index) of attributeList">
						<view class="attribute-item">
							<view class="attr-content">
								<text class="name">{{item.name}}</text>
								<text>{{item.value}}</text>
							</view>
							<view class="symbol" v-if="index+1!=attributeList.length"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="commodity-img-column">
				<view v-if="imgList.length == 1" class="img-column">
					<view class="img-row">
						<image :src="imgList[0]" @click="onPreviewImage(0)"></image>
					</view>
				</view>
				<view v-if="imgList.length == 2" class="img-column">
					<view class="img-row">
						<image :src="imgList[0]" @click="onPreviewImage(0)"></image>
					</view>
					<view class="img-row">
						<image :src="imgList[1]" @click="onPreviewImage(1)"></image>
					</view>
				</view>
				<view v-if="imgList.length == 3" class="img-column">
					<view class="img-row">
						<image :src="imgList[0]" @click="onPreviewImage(0)"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[1]" @click="onPreviewImage(1)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[2]" @click="onPreviewImage(2)"
							mode="aspectFill"></image>
					</view>
				</view>
				<view v-if="imgList.length == 4" class="img-column">
					<view class="img-row">
						<image :src="imgList[0]" @click="onPreviewImage(0)"></image>
					</view>
					<view class="img-row">
						<view style="width: 70%;">
							<image :style="{'height':imgGrid.twoThirds + 'px'}" :src="imgList[1]"
								@click="onPreviewImage(1)" mode="aspectFill">
							</image>
						</view>
						<view style="width: 30%;" class="img-column">
							<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[2]" @click="onPreviewImage(2)"
								mode="aspectFill"></image>
							<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[3]" @click="onPreviewImage(3)"
								mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view v-if="imgList.length == 5" class="img-column">
					<view class="img-row">
						<image :src="imgList[0]" @click="onPreviewImage(0)"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[1]" @click="onPreviewImage(1)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[2]" @click="onPreviewImage(2)"
							mode="aspectFill"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[3]" @click="onPreviewImage(3)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[4]" @click="onPreviewImage(4)"
							mode="aspectFill"></image>
					</view>
				</view>
				<view v-if="imgList.length == 6" class="img-column">
					<view class="img-row">
						<image :src="imgList[0]" @click="onPreviewImage(0)"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[1]" @click="onPreviewImage(1)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[2]" @click="onPreviewImage(2)"
							mode="aspectFill"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[3]" @click="onPreviewImage(3)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[4]" @click="onPreviewImage(4)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[5]" @click="onPreviewImage(5)"
							mode="aspectFill"></image>
					</view>
				</view>
				<view v-if="imgList.length == 7" class="img-column">
					<view class="img-row">
						<image :src="imgList[0]" @click="onPreviewImage(0)"></image>
					</view>
					<view class="img-row">
						<view style="width: 70%;">
							<image :style="{'height':imgGrid.twoThirds + 'px'}" :src="imgList[1]"
								@click="onPreviewImage(1)" mode="aspectFill">
							</image>
						</view>
						<view style="width: 30%;" class="img-column">
							<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[2]" @click="onPreviewImage(2)"
								mode="aspectFill"></image>
							<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[3]" @click="onPreviewImage(3)"
								mode="aspectFill"></image>
						</view>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[4]" @click="onPreviewImage(4)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[5]" @click="onPreviewImage(5)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[6]" @click="onPreviewImage(6)"
							mode="aspectFill"></image>
					</view>
				</view>
				<view v-if="imgList.length == 8" class="img-column">
					<view class="img-row">
						<image :src="imgList[0]" @click="onPreviewImage(0)"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[1]" @click="onPreviewImage(1)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[2]" @click="onPreviewImage(2)"
							mode="aspectFill"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[3]" @click="onPreviewImage(3)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[4]" @click="onPreviewImage(4)"
							mode="aspectFill"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[5]" @click="onPreviewImage(5)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[6]" @click="onPreviewImage(6)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[7]" @click="onPreviewImage(7)"
							mode="aspectFill"></image>
					</view>
				</view>
				<view v-if="imgList.length == 9" class="img-column">
					<view class="img-row">
						<image :src="imgList[0]" @click="onPreviewImage(0)"></image>
					</view>
					<view class="img-row">
						<image :src="imgList[1]" @click="onPreviewImage(1)"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[2]" @click="onPreviewImage(2)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[3]" @click="onPreviewImage(3)"
							mode="aspectFill"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[4]" @click="onPreviewImage(4)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.half + 'px'}" :src="imgList[5]" @click="onPreviewImage(5)"
							mode="aspectFill"></image>
					</view>
					<view class="img-row">
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[6]" @click="onPreviewImage(6)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[7]" @click="onPreviewImage(7)"
							mode="aspectFill"></image>
						<image :style="{'height':imgGrid.third + 'px'}" :src="imgList[8]" @click="onPreviewImage(8)"
							mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="vicinity-wrapper">

		</view>
		<view class="leave-message-wrapper">
			<view class="message-total">
				<view class="divider"></view>
				<text class="divider-text">{{leavelist?leavelist.length:0}}条留言</text>
				<view class="divider"></view>
			</view>
			<view class="input-column">
				<image class="avatar" :src="user.avatarUrl"></image>
				<input class="msg-input" placeholder="看对眼就留言,问问更多细节~" disabled="true" @click="onMsgInputClick" />
			</view>
			<leave-message :list="leavelist"></leave-message>
		</view>
		<view class="homepage-wrapper">

		</view>
		<view class="recommend-wrapper">

		</view>
		<view class="bottom-nav-wrapper">
			<view class="nav">
				<view class="left-btn-list">
					<view class="btn-item">
						<uni-icons type="redo" size="25"></uni-icons>
						<text>分享</text>
					</view>
					<view class="btn-item">
						<uni-icons type="chat" size="25"></uni-icons>
						<text>留言</text>
					</view>
					<view class="btn-item" @click="onStarClick">
						<uni-icons :type="hasStar?'star-filled':'star'" size="25" :color="hasStar?'#fae441':''"></uni-icons>
						<text>收藏</text>
					</view>
				</view>
				<view class="right-btn-list">
					<view class="want-btn-item" hover-class="want-btn-item-hover">
						<uni-icons type="weixin" size="30"></uni-icons>
						<text>我想要</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import LeaveMessage from '@/components/leave-message/leave-message.vue'
	export default {
		components: {
			LeaveMessage
		},
		onShow() {
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.contentWidth = res.windowWidth - 20;
					that.imgGrid = {
						half: that.contentWidth / 2, //一半
						twoThirds: that.contentWidth / 3 * 2, //三分之二
						third: that.contentWidth / 3 //三分之一
					}
				}
			})
		},
		data() {
			return {
				contentWidth: 0, //内容宽度
				imgGrid: {
					half: 0, //一半
					twoThirds: 0, //三分之二
					third: 0 //三分之一
				},
				user: {
					nickName: "咸鱼用户",
					location: "成都 金牛区",
					avatarUrl: "../../static/logo.png"
				},
				hasConcern: true,
				hasStar:false,
				price: 30,
				originalPrice: 1500,
				fineness: "几乎全新",
				wantCount: 10,
				browseCount: 371,
				deliveryMode: "包邮|自提",
				content: "阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶",
				attributeList: [{
						name: "品牌",
						value: "力顶三水水水水"
					},
					{
						name: "成色",
						value: "几乎全新"
					},
					{
						name: "鞋码",
						value: "37"
					}
				],
				imgList: [
					"https://img0.baidu.com/it/u=677049855,3088468346&fm=253&fmt=auto&app=138&f=JPEG?w=893&h=500",
					"https://img0.baidu.com/it/u=2907827215,3626437672&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
					"https://img0.baidu.com/it/u=2907827215,3626437672&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
					"https://img0.baidu.com/it/u=2191797810,1155915308&fm=253&fmt=auto&app=138&f=JPEG?w=758&h=500",
				],
				leavelist: [{
					user: {
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

			}
		},
		methods: {
			onStarClick(){
				this.hasStar = !this.hasStar
			},
			onPreviewImage(index) {
				uni.previewImage({
					urls: this.imgList,
					current: index,
					loop: true
				})
			},
			onConcernChange() {
				this.hasConcern = !this.hasConcern;
				if (this.hasConcern) {
					uni.showToast({
						title: '关注成功',
						duration: 1000
					});
				} else {
					uni.showToast({
						title: '取消关注成功',
						duration: 1000
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		// padding-bottom: calc(env(safe-area-inset-bottom) + 50px);

	}

	.container {

		// margin: 10px 10px;
		color: #222222;
		// padding: 10px 10px calc(env(safe-area-inset-bottom) + 60px) 10px;
		// padding-top: 10px;
		padding-bottom: calc(env(safe-area-inset-bottom) + 50px);
		display: flex;
		flex-direction: column;
		gap: 3px;

		.commodity-wrapper {
			background-color: #fff;
			padding: 10px;
			display: flex;
			flex-direction: column;
			gap: 10px;

			.user-column {
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: flex-start;

					.avatar {
						width: 60px;
						height: 60px;
						border-radius: 30px;
					}

					.content {
						margin-top: 10px;
						margin-left: 10px;

						.nick-name {
							font-size: 18px;
							font-weight: 500;
						}

						.detail {
							margin-top: 5px;
							font-size: 12px;
							color: #999;
							display: flex;
							align-items: center;

							.symbol {
								margin: 0px 2px;
								width: 1px;
								background-color: #f7f7f7;
								height: 10px;
							}
						}
					}
				}

				.right {
					text-align: center;
					line-height: 40px;
					width: 80px;
					height: 40px;
					border-radius: 20px;
					font-size: 14px;
					font-weight: 600;
					color: #222222;
					background-color: #f7f7f7;
				}

				.active {
					color: #999;
				}

			}

			.price-column {
				height: 50px;
				display: flex;
				justify-content: space-between;
				// border: 1px solid red;
				align-items: flex-end;

				.left {
					display: flex;
					align-items: flex-end;

					.left-price {
						color: #f94504;
						display: flex;
						align-items: flex-end;

						.symbol {
							font-size: 12px;
						}

						.price {
							font-size: 26px;
							font-weight: 600;
						}
					}

					.original-price {
						margin-left: 5px;
						font-size: 12px;
						color: #999;
						text-decoration: line-through;
					}

					.delivery-mode {
						margin-left: 5px;
						font-size: 12px;
					}
				}

				.right {
					text-align: right;

					.fineness {
						font-size: 16px;
						font-weight: 600;
						text-decoration: underline;
						text-decoration-color: #fae441;
						text-decoration-thickness: 3px;
					}

					.browse {
						color: #999;
						font-size: 12px;
					}
				}
			}

			.content-column {}

			.attribute-column {
				height: 50px;
				font-size: 12px;
				width: 100%;
				overflow: hidden;

				.attribute-item {
					height: 50px;
					display: flex;
					justify-content: center;
					align-items: center;

					.attr-content {
						height: 50px;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: space-around;

						.name {
							color: #999;
						}
					}
				}

				.symbol {
					margin: 0px 10px;
					width: 1px;
					background-color: #f7f7f7;
					height: 40px;
				}
			}

			.commodity-img-column {
				border-radius: 10px;
				overflow: hidden;

				.img-column {
					display: flex;
					flex-direction: column;
					gap: 1px;
				}

				.img-row {
					display: flex;
					flex-direction: row;
					gap: 1px;
				}

				image {
					display: block;
					margin: 0px;
					width: 100%;
				}

			}
		}

		.bottom-nav-wrapper {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			left: var(--window-left);
			right: var(--window-right);
			/* #endif */
			bottom: 0;
			background-color: #fff;
			padding-bottom: env(safe-area-inset-bottom);

			.nav {
				height: 50px;
				display: flex;
				align-items: center;

				.left-btn-list {
					height: 100%;
					width: 40%;
					display: flex;
					align-items: center;
					font-size: 12px;
					color: #999;

					.btn-item {
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
					}
				}

				.right-btn-list {
					height: 100%;
					width: 60%;
					text-align: center;

					.want-btn-item {
						background-color: #fae441;
						margin: 5px 10px;
						border-radius: 20px;
						height: 40px;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.want-btn-item-hover {
						background-color: #f5df40;
					}
				}
			}

		}

		.leave-message-wrapper {
			padding: 10px;
			background-color: #fff;
			.message-total {
				width: 100%;
				display: flex;
				align-items: center;
			
				.divider {
					width: 35%;
					height: 1px;
					border-top: 1px #999 dashed;
					margin: 0;
					vertical-align: middle;
				}
			
				.divider-text {
					text-align: center;
					width: 30%;
					color: #999;
					font-size: 16px;
				}
			}
			
			.input-column {
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
		}

		
	}
</style>