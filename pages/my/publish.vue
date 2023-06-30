<template>
	<view class="container">
		<view class="nav top-nav" :class="[false?' top-nav':'']">
			<scroll-view class="tabs-wrapper" scroll-x="true">
				<view class="tab-list">
					<view v-for="(item,index) in tabs" :key="index" class="tab-item" @click="onChangeTab(index)">
						<view class="title" :class="[current==index?' title-active':'']">
							{{item}}
						</view>
						<view class="border-bottom" v-if="current==index">
							<view class="border-bottom-color">
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<swiper class="page-body" :style="{'height':swiperHeight+'px'}" :current="current" @change="onSwiperChange">
			<swiper-item class="swiper-item">
				<view class="swiper-item-content">
					<!-- <for-sale-commodity-item :item="item" v-for="(item,index) in forSaleCommodityData.list">

					</for-sale-commodity-item>

					<uni-load-more :status="forSaleCommodityData.loadingStatus" /> -->
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
					<view>A</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-content">B</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-content">C</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getMyList,
		remove as removeCommodity,
		update as downCommodity
	} from '@/api/commodity.js'
	export default {
		onPullDownRefresh() {
			this.onRefreshPage()
		},
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			console.log("滚动距离为：" + e.scrollTop);
			this.top = e.scrollTop
		},
		onLoad() {
			this.loadForSaleCommodityList();
		},
		data() {
			return {
				top: 0,
				current: 0,
				swiperHeight: 0,
				tabs: ["在卖", "草稿", "已下架"],
				forSaleCommodityData: {
					params: {
						pageNum: 1,
						pageSize: 10,
						totalPage: 99,
						status: '0',
					},
					list: [],
					loadingStatus: "more"
				}
			};
		},
		methods: {
			onRefreshPage() {
				this.forSaleCommodityData.params.pageNum = 1
				this.forSaleCommodityData.params.totalPage = 99
				this.forSaleCommodityData.list = [];
				this.loadForSaleCommodityList()
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			loadForSaleCommodityList() {
				const obj = this.forSaleCommodityData;
				obj.loadingStatus = "loading"
				if (obj.params.pageNum > obj.params.totalPage) {
					obj.loadingStatus = "no-more"
					return;
				}
				const that = this;
				getMyList(obj.params).then(res => {
					if (res.data.code == 200) {
						res.data.rows.forEach(item => {
							obj.list.push(item)
						})

						obj.params.totalPage = (res.data.total + obj.params.pageSize - 1) / obj.params.pageSize
						obj.params.pageNum++
						obj.loadingStatus = "more"
						that.getCurrentSwiperHeight(".swiper-item-content")
					}
				})
			},
			onChangeTab(index) {
				this.current = index
				this.getCurrentSwiperHeight(".swiper-item-content")
			},
			onSwiperChange(e) {
				this.current = e.detail.current
				this.getCurrentSwiperHeight(".swiper-item-content")
			},
			getCurrentSwiperHeight(element) {
				const current = this.current
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					this.swiperHeight = res[0][current].height;
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0px 10px;
		background-color: #fff;

		.top-nav {
			z-index: 99;
			position: fixed;
			background-color: #fff;
			top: 0px;
			left: 10px;
			right: 10px;
		}

		.nav {
			padding: 10px 0px;
			background-color: #fff;

			.tabs-wrapper {
				white-space: nowrap;
				overflow: hidden;
				flex: 1;

				.tab-list {
					display: flex;
					gap: 20px;

					.tab-item {
						color: #999;
						display: inline-block;
						height: 40px;
						text-align: center;

						.title {
							font-size: 16px;
							height: 30px;
							line-height: 30px;
						}

						.title-active {
							font-size: 18px;
							font-weight: bold;
							color: #222;
						}

						.border-bottom {
							height: 10px;
							display: flex;
							justify-content: center;
							align-items: center;

							.border-bottom-color {
								width: 20px;
								height: 2px;
								background-color: #fae441;
							}
						}


					}

				}

			}
		}

		.page-body {
			width: 100%;
			margin-top: 60px;
			flex: 1;

			.swiper-item {
				width: 100%;
			}
		}
	}
</style>