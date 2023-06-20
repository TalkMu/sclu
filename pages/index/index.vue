<template>
	<view class="container">
		<view class="search-wrapper">
			<view class="location">
				<text class="city">成都</text>
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
			<tm-tab-bar  :currentPage="0"></tm-tab-bar>
		</view>
	</view>
</template>

<script>
	import CommodityItem from '@/components/commodity-item/commodity-item.vue'
	export default {
		components: {
			CommodityItem
		},
		onReachBottom() {
			this.loadData()
		},
		onPullDownRefresh() {

			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		data() {
			return {
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
				for (var i = 1; i <= 10; i++) {
					const item = {
						coverImgUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b",
						content: (this.leftCommodityList.length+this.rightCommodityList.length + 1) + "特价处理苹果原装充电器",
						hasFreeShipping: true,
						createTime: "一周内发布",
						price: 30,
						originalPrice: 50,
						wantCount: 5,
						user: {
							nickName: "咸鱼用户",
							avatarUrl: "https://pic1.zhimg.com/v2-dcb4723cec102a710ff5fed1251012a1_xs.jpg?source=172ae18b"
						}
					}
					
					if (i % 2 == 1) {
						this.leftCommodityList.push(item);
					} else {
						this.rightCommodityList.push(item);
					}

				}
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