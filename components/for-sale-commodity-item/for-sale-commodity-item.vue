<template>
	<view class="commodity-item">
		<view class="item-top" @click="toCommodityDetailPage()">
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
				<button @click="onMoreClick()" :plain="true" class="more-btn" type="default">更多</button>
			</view>
			<view class="right-wrapper">
				<button :plain="true" class="plain-btn price-reduction-btn" type="default"
					@click="onPriceReductionClick">降价</button>
				<button :plain="true" class="plain-btn edit-btn" type="default" @click="onEditClick()">编辑</button>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMyList,
		remove as removeCommodity,
		update as downCommodity
	} from '@/api/commodity.js'
	export default {
		name: "for-sale-commodity-item",
		props: {
			item: {
				type: Object,
				default: null,
				required: true,
			}
		},
		data() {
			return {
				windowWidth: 0,
				topRightWidth: 120,
			};
		},
		methods: {
			onPriceReductionClick() {

			},
			onEditClick(item) {
				const params = {
					commodityId: this.item.id
				}
				uni.navigateTo({
					url: '/pages/commodity/add?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			onRemoveCommodity() {
				this.$refs.morePopupRef.close()
				const that = this;
				const commodityId = this.item.id
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
			onMoreClick() {
				this.$refs.morePopupRef.open()
			},
			toCommodityDetailPage() {
				const params = {
					commodityId: this.item.id
				}
				uni.navigateTo({
					url: '/pages/commodity/commodity?params=' + encodeURIComponent(JSON.stringify(params))
				})
			}
		}
	}
</script>

<style lang="scss">
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
</style>