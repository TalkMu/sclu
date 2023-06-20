<template>
	<view class="container">
		<view class="tabbar-list">
			<view class="tabbar-item" v-for="(item, index) in tabBar.list" @click="changeItem(item,index)">
				<view class="item-top" :class="[item.bulge ? ' bulge' : '']">
					<uni-icons :color="currentItem == index || item.bulge ? '#fae441' : ''" custom-prefix="iconfont"
						:type="currentItem == index ? item.selectedIconPath : item.iconPath"
						:size="item.bulge ?'60':'30'">
					</uni-icons>
				</view>
				<view class="item-bottom">
					<text>{{ item.text }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tm-tab-bar",
		props: {
			currentPage: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				currentItem: this.currentPage,
				tabBar: {
					list: [{
							iconPath: "icon-home",
							selectedIconPath: "icon-homefill",
							pagePath: "/pages/index/index",
							text: "首页",
							bulge: false
						}, {
							iconPath: "icon-circle",
							selectedIconPath: "icon-circlefill",
							pagePath: "/pages/category/category",
							text: "分类",
							bulge: false
						},
						{
							iconPath: "icon-roundaddfill",
							selectedIconPath: "icon-roundaddfill",
							pagePath: "/pages/publish/publish",
							text: "",
							bulge: true
						}, {
							iconPath: "icon-money-red-packet",
							selectedIconPath: "icon-money-red-packet-fill",
							pagePath: "/pages/task/task",
							text: "赚钱",
							bulge: false
						},
						{
							iconPath: "icon-my",
							selectedIconPath: "icon-myfill",
							pagePath: "/pages/my/my",
							text: "我的",
							bulge: false
						}
					]
				}
			};
		},
		watch: {
			currentPage: {
				handler(val) { // 
					this.currentItem = val
					const _this = this
					uni.setNavigationBarTitle({ // 设置顶部bar的标题
						title: _this.tabBar.list[val].text
					})
				}
			}
		},
		methods: {
			changeItem(item, index) {
				if(item.bulge){
					uni.navigateTo({
						url:item.pagePath
					})
				}else{
					uni.switchTab({
						url:item.pagePath
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	view {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	page {
	}

	.container {
		width: 100%;
		color: #515151;
		background-color: #ffffff;
		padding-bottom: env(safe-area-inset-bottom);
		.tabbar-list {
			height: 80px;
			display: flex;
			.tabbar-item {
				height: 80px;
				width: 20%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-align: center;
				.item-top {
					padding: 2px;
					text-align: center;
					width: 80rpx;
					height: 80rpx;
					image {
						border-radius: 50%;
						width: 100%;
						height: 100%;
					}
				}

				.item-bottom {
					font-size: 10px;
					width: 100%;
				}

				.bulge {
					flex-shrink: 0;
					width: 150rpx;
					height: 150rpx;
					position: absolute;
					top: -20px;
					left: calc(50% - 74rpx);
					border-radius: 50%;
					background-color: #ffffff;
				}
			}

			.publish-list {
				background-color: #ffffff;
				width: 100%;
				height: 200px;
			}
		}

	}
</style>