<template>
	<view class="container">
		<view class="search-wrapper">

			<view class="location">
				<text class="city">{{cityName}}</text>
				<uni-icons type="location-filled" size="20" color="#f79c40"></uni-icons>
			</view>
			<view class="search-group">
				<uni-icons type="search" size="20"></uni-icons>
				<input class="search-input" placeholder="请输入商品关键词" />
				<view class="search-btn">搜索</view>
			</view>
			<view class="category">
				<uni-icons type="bars" size="20"></uni-icons>
				<text>分类</text>
			</view>
		</view>
		<view class="category-wrapper">
			<uni-grid :column="4" :highlight="true" @change="change" :showBorder="false">
				<uni-grid-item v-for="(item, index) in categoryList" :index="index" :key="index">
					<view class="grid-item-box">
						<image :src="item.imgUrl"></image>
						<text class="text">{{item.name}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="commodity-wrapper">
			<view class="left-commodity-list">
				<commodity-item :list="leftCommodityList"></commodity-item>
			</view>
			<view class="right-commodity-list">
				<commodity-item :list="rightCommodityList"></commodity-item>
			</view>
		</view>
		<view class="tab-bar">
			<tm-tab-bar :currentPage="0"></tm-tab-bar>
		</view>
	</view>
</template>

<script>
	import CommodityItem from '@/components/commodity-item/commodity-item.vue'
	import {
		getList as getCommodityList
	} from '@/api/commodity.js'
	import {
		regeo
	} from '@/api/common.js'
	export default {
		components: {
			CommodityItem
		},
		onLoad() {
		},
		onShow() {
			const location = uni.getStorageSync("location");
			if(location != null){
				console.log("----------------"+location.city)
				this.cityName = location.city
			}
		},
		onReachBottom() {
			this.loadData()
		},
		onPullDownRefresh() {

			console.log('refresh');
			this.pageNum = 1
			this.leftCommodityList = [];
			this.rightCommodityList = [];
			this.loadData()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				totalPage: 99,
				cityName:"定位中",
				categoryList: [{
						name: "家具生活",
						imgUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b"
					},
					{
						name: "家用电器",
						imgUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b"
					},
					{
						name: "电子数码",
						imgUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b"
					},
					{
						name: "运动户外",
						imgUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b"
					},
					{
						name: "服饰鞋帽",
						imgUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b"
					},
					{
						name: "个护美妆",
						imgUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b"
					},
					{
						name: "办公用品",
						imgUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b"
					},
					{
						name: "其他分类",
						imgUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b"
					}
				],
				leftCommodityList: [],
				rightCommodityList: [],
			}
		},
		created() {
			console.log("index created")
			this.loadData()
		},
		methods: {
			
			loadData() {
				if (this.pageNum > this.totalPage) {
					uni.showToast({
						title: "暂无更多数据"
					})
					return;
				}
				const params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				getCommodityList(params).then(res => {
					if (res.data.code == 200) {
						const list = res.data.rows;
						this.totalPage = (res.data.total + this.pageSize - 1) / this.pageSize
						list.forEach((item, index) => {
							if ((index + 1) % 2 == 1) {
								this.leftCommodityList.push(item);
							} else {
								this.rightCommodityList.push(item);
							}
						})
						this.pageNum++
					}

				})

				console.log(this.leftCommodityList)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		gap: 10px;

		.search-wrapper {
			padding: 10px;
			height: 40px;
			display: flex;
			flex-direction: row;
			align-items: center;

			.location {
				font-size: 14px;
				display: flex;
				align-items: center;
			}

			.search-group {
				margin-left: 5px;
				flex: 1;
				padding: 5px 4px;
				height: 40px;
				border: 2px solid #fae441;
				border-radius: 30px;
				display: flex;
				font-size: 16px;
				align-items: center;

				.search-input {
					height: 30px;
					font-size: 14px;
					flex: 1;
				}

				.search-btn {
					text-align: center;
					height: 30px;
					line-height: 30px;
					width: 60px;
					font-weight: 600;
					font-size: 14px;
					background-color: #fae441;
					color: #222;
					border-radius: 30px;
				}
			}

			.category {
				margin-left: 10px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 12px;
			}
		}

		.category-wrapper {
			margin: 0px 10px;
			background-color: #f7f7f7;
			font-size: 12px;
			border-radius: 20px;
			overflow: hidden;

			.grid-item-box {
				flex: 1;
				// position: relative;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 15px 0;
				gap: 5px;

				image {
					width: 40px;
					height: 40px;
				}
			}
		}

		.commodity-wrapper {
			padding-bottom: 150px;
			margin: 0px 10px;
			display: flex;
			justify-content: space-between;
			gap: 10px;

			.left-commodity-list {
				width: 100%;

			}

			.right-commodity-list {
				width: 100%;
			}

		}
	}
</style>