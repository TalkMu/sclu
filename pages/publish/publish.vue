<template>
	<view class="container">
		<view class="head-wrapper">
			<view class="title">
				<view>咸鱼二手，</view>
				<view>让沉睡的好物活起来。</view>
			</view>
			<view class="desc">闲置发布/社区面交/方便省心</view>
		</view>
		<uni-list class="list-wrapper">
			<uni-list-item class="uni-list-item" title="发布闲置" note="30s发布宝贝" showArrow
				thumb="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="lg" rightText=""
				clickable @click="publishCommodity" />
		</uni-list>
	</view>
</template>

<script>
	export default {
		props:{
			windowHeight:{
				typeof:Number,
				default: 0
			}
		},
		data() {
			return {
			};
		},
		methods: {
			publishCommodity() {
				const that = this;
				uni.navigateTo({
					url: "/pages/commodity/add",
					complete:function(){
						setTimeout(function(){
							that.$emit('closePublishPage')
						},1000)
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		height: 100vh;
		background-image: linear-gradient(to bottom, white,rgb(218, 211, 211),white);
		.head-wrapper {
			top: 20px;
			position: absolute;
			margin: 0 20px;

			.title {
				font-size: 26px;
			}

			.desc {
				margin-top: 20px;
				font-size: 16px;
				color: #4a4a4a;
			}
		}

		.list-wrapper {
			width: 85%;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 130px;

			.uni-list {
				border-radius: 10px;
				overflow: hidden;

				.uni-list-item {
					background-color: #fae441 !important;
				}
			}
		}

	}
</style>