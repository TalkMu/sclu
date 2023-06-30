<template>
	<view class="container">
		<uni-segmented-control :current="currentTabIndex" :values="tabItems" @clickItem="onClickTabItem" styleType="text"
			activeColor="#fae441"></uni-segmented-control>

		<view class="commodity-list" v-show="currentTabIndex === 0 || currentTabIndex === 1 || currentTabIndex === 2">
			<view v-for="(item,index) in list" class="commodity-item">
				<view class="item-top" @click="toCommodityDetailPage(item)">
					<view class="left-wrapper">
						<image :src="item.mainCoverUrl" mode="aspectFill"></image>
					</view>
					<view class="right-wrapper" :style="{'width':topRightWidth+'px'}">
						<view class="content">{{item.content}}</view>
						<text class="price">￥{{item.price}}</text>
						<view class="detail">
							<text>收藏{{item.collectCount}} · 浏览{{item.browseCount}} · 想要{{item.wantCount}}</text>
						</view>
					</view>
				</view>
				<view class="item-bottom">
					<view class="left-wrapper">
						<button @click="onMoreClick(item)" :plain="true" class="more-btn" type="default">更多</button>
					</view>
					<view class="right-wrapper">
						<button :plain="true" class="plain-btn price-reduction-btn" type="default"
							@click="onPriceReductionClick">降价</button>
						<button :plain="true" class="plain-btn edit-btn" type="default"
							@click="onEditClick(item)">编辑</button>

					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingStatus" />
		<uni-popup class="more-popup" ref="morePopupRef" type="bottom" :safe-area="false">
			<view class="group-btn">
				<button :plain="true" class="base-btn share-btn" open-type="share">分享</button>
				<button :plain="true" class="base-btn down-btn" @click="onDownCommodity">下架</button>
				<button :plain="true" class="base-btn remove-btn" @click="onRemoveCommodity">删除</button>
				<button :plain="true" class="base-btn cancel-btn" @click="onCancelClick">取消</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getMyList,
		remove as removeCommodity,
		update as downCommodity
	} from '@/api/commodity.js'
	export default {
		onReachBottom() {
			this.loadData()
		},
		onPullDownRefresh() {
			this.onRefreshPage()
		},
		onLoad() {
			this.initPage();
		},

		data() {
			return {
				currentTabIndex: 0,
				tabItems: [
					"在卖", "草稿", "已下架"
				],
				selectItem: null,
				loadingStatus: 'more',
				windowWidth: 0,
				topRightWidth: 0,
				params: {
					pageNum: 1,
					pageSize: 10,
					totalPage: 99,
					status: '0',
				},
				list: []
			};
		},
		methods: {
			onClickTabItem(e) {
				if (this.currentTabIndex != e.currentIndex) {
					this.currentTabIndex = e.currentIndex;
				}
			},
			initPage() {
				this.windowWidth = uni.getSystemInfoSync().windowWidth
				this.topRightWidth = this.windowWidth - 150
				this.list = []
				this.loadData()
			},
			onRefreshPage() {
				this.params.pageNum = 1
				this.params.totalPage = 99
				this.list = [];
				this.loadData()
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			onPriceReductionClick() {

			},
			onEditClick(item) {
				const params = {
					commodityId: item.id
				}
				uni.navigateTo({
					url: '/pages/commodity/add?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			onRemoveCommodity() {
				this.$refs.morePopupRef.close()
				const that = this;
				const commodityId = this.selectItem.id
				uni.showModal({
					title: '',
					content: '确定要删除这个宝贝吗？',
					success: function(res) {
						if (res.confirm) {
							const params = {}
							removeCommodity(commodityId).then(res => {
								if (res.data.code == 200) {
									uni.showToast({
										title: "删除成功"
									})
									that.list.map((item, index) => {
										if (item.id == commodityId) {
											that.list.splice(index, 1)
										}
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			onDownCommodity() {
				this.$refs.morePopupRef.close()
				const that = this;
				const params = {
					id: this.selectItem.id,
					status: 1
				}
				uni.showModal({
					title: '',
					content: '确定要下架这个宝贝吗？',
					success: function(res) {
						if (res.confirm) {
							downCommodity(params).then(res => {
								if (res.data.code == 200) {
									uni.showToast({
										title: "下架成功"
									})
									that.list.map((item, index) => {
										if (item.id == commodityId) {
											that.list.splice(index, 1)
										}
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			onCancelClick() {
				this.$refs.morePopupRef.close()
			},
			onMoreClick(item) {
				this.selectItem = item
				this.$refs.morePopupRef.open()
			},
			toCommodityDetailPage(item) {
				const params = {
					commodityId: item.id
				}
				uni.navigateTo({
					url: '/pages/commodity/commodity?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			loadData() {
				this.loadingStatus = "loading"
				if (this.params.pageNum > this.params.totalPage) {
					this.loadingStatus = "no-more"
					return;
				}
				const that = this;
				getMyList(this.params).then(res => {
					if (res.data.code == 200) {
						res.data.rows.forEach(item => {
							that.list.push(item)
						})

						that.params.totalPage = (res.data.total + that.params.pageSize - 1) / that.params.pageSize
						that.params.pageNum++
						that.loadingStatus = "more"
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 10px 20px;
		background-color: #fff;

		.commodity-list {
			display: flex;
			flex-direction: column;
			gap: 2px;

			.commodity-item {
				background-color: #fff;
				border-radius: 10px;
				padding: 10px 0px;
				display: flex;
				flex-direction: column;
				gap: 10px;

				.item-top {
					height: 100px;
					display: flex;
					align-items: center;
					gap: 10px;

					.left-wrapper {
						image {
							width: 100px;
							height: 100px;
							border-radius: 10px;
							display: block;
						}
					}

					.right-wrapper {
						height: 100px;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.content {
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}

						.price {
							color: #f94504;
							font-size: 18px;
							font-weight: 600;
						}

						.detail {
							color: #999;
							font-size: 14px;
						}
					}
				}

				.item-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left-wrapper {
						display: flex;

						.more-btn {
							color: #999;
							padding: 0;
							width: auto;
							height: 40px;
							line-height: 40px;
							border: 0px;
							border-radius: 20px;
							font-size: 16px;
						}
					}

					.right-wrapper {
						display: flex;
						gap: 10px;

						.plain-btn {
							color: #333;
							font-weight: bold;
							padding: 0;
							width: 60px;
							height: 40px;
							line-height: 40px;
							border: 1px solid #e8e8e8;
							border-radius: 20px;
							font-size: 16px;
						}

						.price-reduction-btn {}

						.edit-btn {}
					}
				}
			}
		}

		.more-popup {
			.group-btn {
				border-radius: 15px 15px 0 0;
				overflow: hidden;
				background-color: #fff;
				padding-bottom: env(safe-area-inset-bottom);
				padding-top: 20px;

				.base-btn {
					border: 0px;
					padding: 10px 0px;
					font-size: 16px;
					font-weight: 600;
				}

				.cancel-btn {
					color: #999;
				}
			}
		}
	}

</style>