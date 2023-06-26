<template>
	<view class="tm-list-item" :hover-class="(!clickable && !link)? '' : 'tm-list-item--hover'">
		<button :open-type="openType" plain="true" class="item-btn" @click="onClick">
			<view class="item-left">
				<uni-icons :custom-prefix="extraIcon.customPrefix" :type="extraIcon.type" :size="extraIcon.size"
					:color="extraIcon.color"></uni-icons>
				<text class="title">{{title}}</text>
			</view>
			<uni-icons v-if="showArrow || link" :size="16" class="item-right" color="#bbb" type="arrowright" />
		</button>
	</view>
</template>

<script>
	export default {
		name: "tm-list-item",
		emits: ['click'],
		props: {
			openType: {
				type: String,
				default: null
			},
			title: {
				type: String,
				default: ''
			},
			showArrow: {
				type: [Boolean, String],
				default: false
			},
			link: {
				type: [Boolean, String],
				default: false
			},
			clickable: {
				type: Boolean,
				default: false
			},
			extraIcon: {
				type: Object,
				default () {
					return {
						type: '',
						color: '#000000',
						size: 20,
						customPrefix: ''
					};
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onClick() {
				if (this.clickable || this.link) {
					this.$emit('click', {
						data: {}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	$tm-bg-color-hover:#f1f1f1;
	.tm-list-item {
		.item-btn {
			padding: 0 10px 0 15px;
			border: 0;
			font-size: 14px;
			height: 50px;
			width: 100%;
			display: flex;
			align-items: center;

			.item-left {
				display: flex;
				align-items: center;
				flex: 1;

				.title {
					margin-left: 10px;
				}
			}

			.item-right {
				display: flex;
				align-items: center;
			}
		}

	}

	.tm-list-item--hover {
		background-color: $tm-bg-color-hover !important;
	}
</style>