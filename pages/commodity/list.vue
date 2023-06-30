<template>
	<view class="container">
		<uni-swipe-action>
			<view class="commodity-list">
				<uni-swipe-action-item v-for="(item,index) in list" :right-options="options"
					@click="onSwipeClick($event,item)">
					<view @click="onCommodityItemClick(item)" class="commodity-item">
						<view class="item-left">
							<image :src="item.mainCoverUrl" mode="aspectFill" class="main-cover-img"></image>
						</view>
						<view class="item-right" :style="{'width':itemRightWidth+'px'}">
							<view class="content">{{item.content}}</view>
							<view class="price-wrapper">
								<text class="price">￥{{item.price}}</text>
								<text class="want-count">{{item.wantCount}}人想要</text>
							</view>
							<view class="user-wrapper">
								<image class="avatar" mode="aspectFill" :src="item.user.avatarUrl"></image>
								<text class="nick-name">{{item.user.nickName}}</text>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</view>


		</uni-swipe-action>
		<uni-load-more :status="status" />
	</view>
</template>

<script>
	import {
		list as getStarList,
		remove as removeStar
	} from '@/api/commodity_star.js'
	import {
		list as getBrowseList,
		remove as removeBrowse
	} from '@/api/commodity_browse.js'
	export default {
		onReachBottom() {
			this.loadData()
		},
		onPullDownRefresh() {
			this.params.pageNum = 1
			this.params.totalPage = 99
			this.list = [];
			this.loadData()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(option) {
			if (option.params == null) {
				return
			}
			const data = JSON.parse(decodeURIComponent(option.params));
			console.log("参数：" + JSON.stringify(data))
			this.params.status = data.status
			// this.params.status = 'star'
			this.list = []
			this.loadData()
			this.windowWidth = uni.getSystemInfoSync().windowWidth
			this.itemRightWidth = this.windowWidth - 150
		},
		data() {
			return {
				status: 'more',
				title: '',
				windowWidth: 0,
				itemRightWidth: 0,
				params: {
					pageNum: 1,
					pageSize: 10,
					totalPage: 99,
					status: null,
				},
				list: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: 'red'
					}
				}]
			};
		},
		methods: {
			removeStar(id) {
				const params = [id]
				removeStar(params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "删除成功"
						})
					}
				})
			},
			removeBrowse(id) {
				const params = [id]
				removeBrowse(params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "删除成功"
						})
					}
				})
			},
			onSwipeClick(e, item) {
				const that = this;
				if (e.position === 'right' && e.content.text === '删除') {
					this.list.map((p, index) => {
						if (p.id == item.id) {
							console.log("======" + that.params.status)
							switch (that.params.status) {
								case 'star':
									that.removeStar(item.id);
									break;
								case 'browse':
									that.removeBrowse(item.id);
									break
								default:
									break
							}
							that.list.splice(index, 1);
						}
					})
				}
			},
			onCommodityItemClick(item) {
				const params = {
					commodityId: item.commodityId
				}
				uni.navigateTo({
					url: '/pages/commodity/commodity?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			loadData() {
				this.status = "loading"
				if (this.params.pageNum > this.params.totalPage) {
					this.status = "no-more"
					return;
				}
				switch (this.params.status) {
					case 'star':
						this.loadStarList();
						break;
					case 'browse':
						this.loadBrowseList();
						break
					default:
						break
				}
			},
			loadStarList() {
				const that = this;
				getStarList(this.params).then(res => {
					if (res.data.code == 200) {
						res.data.rows.forEach(item => {
							that.list.push(item)
						})

						that.params.totalPage = (res.data.total + that.params.pageSize - 1) / that.params.pageSize
						that.params.pageNum++
						that.status = "more"
					}

				})
			},
			loadBrowseList() {
				const that = this;
				getBrowseList(this.params).then(res => {
					if (res.data.code == 200) {
						res.data.rows.forEach(item => {
							that.list.push(item)
						})
						that.params.totalPage = (res.data.total + that.params.pageSize - 1) / that.params.pageSize
						that.params.pageNum++
						that.status = "more"
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0px 10px;
		padding-bottom: 50px;

		.commodity-list {
			display: flex;
			flex-direction: column;
			gap: 5px;

			.commodity-item {
				background-color: #fff;
				border-radius: 10px;
				padding: 5px 10px;
				height: 100px;
				display: flex;
				align-items: center;

				.item-left {
					width: 100px;

					.main-cover-img {
						width: 100px;
						height: 100px;
						border-radius: 10px;
						display: block;
					}
				}

				.item-right {
					margin-left: 10px;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 100px;

					.content {
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}

					.price-wrapper {
						.price {
							color: #f94504;
							font-size: 18px;
							font-weight: 600;
						}

						.want-count {
							margin-left: 10px;
							font-size: 12px;
						}
					}

					.user-wrapper {
						display: flex;
						align-items: center;
						gap: 5px;

						.avatar {
							width: 20px;
							height: 20px;
							border-radius: 10px;
						}

						.nick-name {
							font-size: 12px;
							color: #9e9e9e;
						}
					}
				}
			}
		}


	}
</style>