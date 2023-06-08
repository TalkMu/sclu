<template>
	<view class="container">
		<Home v-if="currentPage == 0"></Home>
		<Category v-if="currentPage == 1"></Category>
		<Task v-if="currentPage == 3"></Task>
		<My v-if="currentPage == 4"></My>
		<view class="tabbar">
			<tab-bar :current-page="currentPage" @changePage="changePage"></tab-bar>
		</view>

		<uni-popup ref="popup" background-color="#000" :safe-area="false">
			<view class="publish-popup">
				<view class="publish-page">
					<Publish @closePublishPage="closePublishPage"></Publish>
				</view>
				<view class="close-btn" @click="closePublishPage">
					<uni-icons type="closeempty" size="30"></uni-icons>
				</view>
				
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import TabBar from '@/components/tabbar/tabbar.vue'
	import Home from '@/pages/index/index.vue'
	import My from '@/pages/my/my.vue'
	import Task from '@/pages/task/task.vue'
	import Category from '@/pages/category/category.vue'
	import Publish from '@/pages/publish/publish.vue'
	export default {
		components: {
			TabBar,
			Home,
			My,
			Task,
			Category,
			Publish
		},
		data() {
			return {
				currentPage: 0,
			}
		},
		methods: {
			changePage(item, index) {
				if (!item.bulge) {
					this.currentPage = index;
				} else {
					this.$refs.popup.open('bottom')
				}

			},
			closePublishPage() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.tabbar{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: white;
			height: calc(80px + env(safe-area-inset-bottom));
		}
		.publish-popup {
			background-color: aquamarine;
			// padding-top: env(safe-area-inset-bottom);
			width: 100%;
			.publish-page {
				
			}
			.close-btn {
				left: 50%;
				transform: translateX(-50%);
				position: absolute;
				text-align: center;
				width: 50px;
				border-radius: 25px;
				height: 50px;
				line-height: 50px;
				bottom: 20px;
				background-color: #fae441;
			}
		}
	}
</style>