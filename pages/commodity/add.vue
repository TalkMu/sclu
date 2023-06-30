<template>
	<view class="container">
		<form>
			<view class="commodity-body">
				<view class="commodity-content-wrapper">
					<textarea class="commodity-content" name="content" type="text" v-model="form.content"
						placeholder="宝贝名称、描述,如品牌型号、入手渠道、转手原因..." maxlength="1000"></textarea>
					<uni-file-picker mode="grid" @delete="pickerDelete" :auto-upload="false" @select="selectImage"
						@progress="uploadProgress" @success="uploadSuccess" limit="9" title="" v-model="form.imgList"
						fileMediatype="image"></uni-file-picker>

					<view class="location" @click="chooseLocation">
						<uni-icons type="location" size="16"
							color="#a5a5a5"></uni-icons>{{form.location?form.location.name:"请选择定位"}}<uni-icons type="forward" size="12"
							color="#a5a5a5"></uni-icons>
					</view>
				</view>
				<view class="commodity-attr-wrapper">
					<uni-list>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon.category" title="分类">
							<template v-slot:footer>
								<uni-data-picker v-model="form.categoryModel.value" v-slot:default="{data, error, options}"
									ref="categoryDataPicker" :localdata="categoryOptions" popup-title="商品类别"
									@nodeclick="onCategoryOptionsClick" @change="onCategoryOptionsChange">
									<text style="font-size: 12px;color: #999;">{{form.categoryModel.text}}</text>
								</uni-data-picker>
							</template>
						</uni-list-item>
						<uni-list-item @click="onPriceSectionClick" clickable :show-extra-icon="true" showArrow
							:extra-icon="icon.price" title="价格">
							<template v-slot:footer>
								<text style="color: red;">￥{{form.price?form.price:"0.00"}}</text>
							</template>
						</uni-list-item>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon.fineness" title="成色">
							<template v-slot:footer>
								<picker @change="bindFinenessPickerChange" :value="form.finenessModel.value"
									:range="finenessOptions" range-key="dictLabel">
									<text style="font-size: 12px;color: #999;">{{form.finenessModel.text}}</text>
								</picker>
							</template>
						</uni-list-item>
						<uni-list-item @click="onDeliveryModeSectionClick" clickable :show-extra-icon="true" showArrow
							:extra-icon="icon.deliveryMode" title="发货方式">
							<template v-slot:footer>
								<text style="font-size: 12px;color: #999;">{{form.deliveryMode.text}}</text>
							</template>
						</uni-list-item>
					</uni-list>
				</view>
				<view>
					<button type="default" class="publish-btn" @click="onSumbit">发布</button>
				</view>
			</view>

		</form>

		<uni-popup ref="pricePopup" class="pricePopup" :safe-area="false">
			<view class="content">
				<view class="top-section">
					<view>可以设<text class="fan-price">『粉丝价』</text>啦！快去给你的粉丝专属优惠吧！</view>
				</view>
				<uni-section title="商品价格" type="line" titleFontSize="20px">
					<view class="price-item">
						<text>价格</text>
						<input class="uni-input" type="digit" placeholder="￥0.00" v-model="form.price" />
					</view>
					<view class="price-item">
						<text>原价</text>
						<input class="uni-input" type="digit" placeholder="￥0.00" v-model="form.originalPrice" />
					</view>
				</uni-section>
				<view class="btn-section">
					<button type="default" class="price-submit-btn" @click="onPriceSubmit">确定</button>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="deliveryModePopup" class="deliveryModePopup" :safe-area="false"
			@change="deliveryModePopupChange">
			<view class="content">
				<view class="head">
					<text class="title">选择发货方式</text>
					<view class="icon-close" @click="onDeliveryModeSubmit">
						<uni-icons type="closeempty" size="14"></uni-icons>
					</view>
				</view>
				<view class="body">
					<view class="row">
						<text class="label">邮寄</text>
						<text :style="{'color':form.deliveryMode.price>0?'#000':'#999'}">￥</text>
						<input class="uni-input" type="digit" placeholder="0.00" v-model="form.deliveryMode.price" />
						<switch color="#fae441" :checked="form.deliveryMode.mailChecked" @change="mailChange" />
					</view>
					<view class="row">
						<text class="label">自提</text>
						<view style="width: 100%;"></view>
						<switch color="#fae441" :checked="form.deliveryMode.selfPickupChecked"
							@change="selfPickupChange" />
					</view>
				</view>
				<view class="footer">
					<button type="default" class="price-submit-btn" @click="onDeliveryModeSubmit">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		list as getCategoryList
	} from '/api/commodity_category.js'
	import {
		add,getEditData
	} from '@/api/commodity.js'
	import {
		handleTree
	} from '@/utils/tools.js'
	import {
		dictType
	} from '@/api/common.js'
	export default {
		onShow() {
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.bottomHeight = res.safeAreaInsets.bottom + 20
				}
			});
			this.loadCommodityCategory()
			this.loadCommodityFineness()
		},
		onLoad(option) {
			if (option.params == null) {
				return
			}
			const data = JSON.parse(decodeURIComponent(option.params));
			const commodityId = data.commodityId;
			// 查询商品详情
			this.loadCommodityEditData(commodityId);
			
		},
		data() {
			return {
				bottomHeight: 0,
				icon: {
					category: {
						color: '#000',
						size: '22',
						type: 'icon-money-red-packet-fill',
						customPrefix: 'iconfont'
					},
					price: {
						color: '#000',
						size: '22',
						type: 'icon-money-red-packet-fill',
						customPrefix: 'iconfont'
					},
					fineness: {
						color: '#000',
						size: '22',
						type: 'icon-money-red-packet-fill',
						customPrefix: 'iconfont'
					},
					deliveryMode: {
						color: '#000',
						size: '22',
						type: 'icon-money-red-packet-fill',
						customPrefix: 'iconfont'
					}
				},
				form: {
					id: null,
					content: null,
					imgList: [],
					location: {
						name: "请选择地址",
						detail: null,
						latitude: null,
						longitude: null,
					},
					categoryModel: {
						value: null,
						text: "请选择",
					},
					price: null,
					originalPrice: null,
					finenessModel: {
						value: null,
						text: "请选择"
					},
					deliveryMode: {
						price: null,
						mailChecked: true,
						selfPickupChecked: false,
						text: "请选择"
					}
				},
				categoryOptions: [],
				finenessOptions: []
			};
		},
		methods: {
			bindFinenessPickerChange(e) {
				const selectItem = this.finenessOptions[e.detail.value]
				this.form.finenessModel = {
					value: selectItem.dictValue,
					text: selectItem.dictLabel
				}
			},
			loadCommodityFineness() {
				dictType("xzm_commodity_fineness").then(res => {
					if (res.data.code == 200) {
						this.finenessOptions = res.data.data
					}
				})
			},
			loadCommodityEditData(commodityId) {
				const params = {
					id: commodityId,
				}
				getEditData(params).then(res => {
					if (res.data.code == 200) {
						this.form = res.data.data
					}
				})
			},
			renameKey(arr) {
				if (arr == null || arr.length == 0) {
					return [];
				}
				const that = this
				return arr.map(item => {
					const data = {
						value: item.id,
						text: item.name,
						children: []
					};
					if (item.children != null && item.children.length != 0) {
						data.children = that.renameKey(item.children);
					}
					return data;
				})
			},
			loadCommodityCategory() {
				const that = this;
				getCategoryList().then(res => {
					that.categoryOptions = that.renameKey(handleTree(res.data.rows));
				})
			},
			selectImage(e) {
				const that = this;
				const tempFiles = e.tempFiles;
				for (let i = 0; i < tempFiles.length; i++) {
					this.uploadImg(tempFiles[i].url).then(res=>{
						that.form.imgList.push(res)
						console.log("imgList:"+JSON.stringify(that.form.imgList))
					})
					
				}

			},
			pickerDelete(e) {
				this.form.imgList.map((item, i) => {
					if (item.url == e.tempFilePath) {
						this.form.imgList.splice(i, 1)
					}
				})
			},
			uploadProgress(e) {
				console.log('上传进度：', e)
			},
			uploadSuccess(e) {
				console.log('上传成功：', e)
			},
			uploadImg(fileUrl) {
				const that = this;
				return new Promise((resolve, reject) => {
					const _that = that;
					uni.uploadFile({
						url: that.$baseUrl + "/common/upload",
						filePath: fileUrl,
						name: "file",
						success: (res) => {
							const result = JSON.parse(res.data)
							const params = {
								url:result.url,
								name:result.fileName,
								extname:result.extname
							}
							resolve(params)
						}
					})
				})
			},
			// uploadImg() {
			// 	const that = this;
			// 	const len = this.form.imgList.length
			// 	const arr = [];
			// 	return new Promise((resolve, reject) => {
			// 		const _that = that;
			// 		for (let i = 0; i < that.form.imgList.length; i++) {
			// 			uni.uploadFile({
			// 				url: that.$baseUrl + "/common/upload",
			// 				filePath: this.form.imgList[i].url,
			// 				name: "file",
			// 				success: (res) => {
			// 					const result = JSON.parse(res.data)
			// 					arr.push({
			// 						url:result.url,
			// 						name:result.fileName,
			// 						extname:result.extname
			// 					})
			// 					if (arr.length == len) {
			// 						resolve(arr)
			// 					}
			// 				}
			// 			})
			// 		}

			// 	})
			// },
			onSumbit() {
				const obj = this.form;
				const params = {
					id:obj.id,
					content: obj.content,
					imgList: obj.imgList,
					location: {
						name: obj.location.name,
						detail: obj.location.detail,
						latitude: obj.location.latitude,
						longitude: obj.location.longitude
					},
					categoryModel: obj.categoryModel,
					price: obj.price,
					originalPrice: obj.originalPrice,
					finenessModel: obj.finenessModel,
					deliveryMode: obj.deliveryMode
				}
				console.log("onSubmit:" + JSON.stringify(params));
				add(params).then(res => {
					const data = res.data;
					console.log("add-commodity-res:" + JSON.stringify(res));
					if (data.code == 200) {
						const params = {
							commodityId: data.data
						}
						uni.redirectTo({
							url: "/pages/commodity/commodity?params=" + JSON.stringify(params)
						})
					}
				})
			},
			onDeliveryModeSubmit() {
				this.$refs.deliveryModePopup.close()
			},
			mailChange(e) {
				this.form.deliveryMode.mailChecked = e.detail.value;
			},
			selfPickupChange(e) {
				this.form.deliveryMode.selfPickupChecked = e.detail.value;
			},
			deliveryModePopupChange() {
				const obj = this.form.deliveryMode;
				let text = "邮寄";
				if (obj.mailChecked && obj.selfPickupChecked) {
					if (obj.price == null || obj.price <= 0) {
						text = "包邮/自提"
					} else {
						text = "运费￥" + obj.price + "/自提"
					}
				} else if (obj.mailChecked) {
					if (obj.price == null || obj.price <= 0) {
						text = "包邮"
					} else {
						text = "运费￥" + obj.price
					}
				} else if (obj.selfPickupChecked) {
					text = "自提"
				} else {
					text = "无需发货";
				}
				this.form.deliveryMode.text = text;
			},
			onPriceSubmit() {
				this.$refs.pricePopup.close()
			},
			onPriceSectionClick() {
				this.$refs.pricePopup.open('bottom')
			},
			onFinenessSectionClick() {
				const that = this;
				uni.showActionSheet({
					itemList: that.finenessOptions,
					success: function(res) {
						that.form.finenessModel = that.finenessOptions[res.tapIndex];
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			onDeliveryModeSectionClick() {
				this.$refs.deliveryModePopup.open("bottom")
			},
			onCategoryOptionsClick(node) {
				this.form.categoryModel.value = node.value
			},
			onCategoryOptionsChange(e) {
				const arr = e.detail.value;
				const text = arr.map(p => p.text).join("/")
				this.form.categoryModel.text = text;
			},
			chooseLocation() {
				const that = this;
				// 发起授权请求
				uni.authorize({
					// 授权权限
					scope: 'scope.userLocation',
					success() {
						// 打开地图选择位置
						uni.chooseLocation({
							success(res) {
								console.log('位置名称：' + res.name);
								console.log('详细地址：' + res.address);
								console.log('纬度：' + res.latitude);
								console.log('经度：' + res.longitude);
								that.form.location = {
									name: res.name,
									detail: res.address,
									latitude: res.latitude,
									longitude: res.longitude
								}
							}
						});
					},
					fail(e) {
						console.log(e);
						let errMsgTit = '';
						if (e.errMsg === 'authorize:fail 系统错误，错误码：-12006,auth deny') {
							errMsgTit = '你已拒绝授权，是否跳转至设置页面开启权限';
						}
						uni.showModal({
							title: '提示',
							content: `${errMsgTit}`,
							success(res) {
								if (res.confirm) {
									// 获取设置页面权限信息
									uni.getSetting({
										success(res) {
											console.log(res.authSetting);
											// 判断是否开启获取位置权限
											if (!res.authSetting['scope.userLocation']) {
												// 如果没有开启，点击确认后打开设置页面
												uni.openSetting({});
											}
										}
									});
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		// padding-bottom: constant(safe-area-inset-bottom);
		// padding-bottom: env(safe-area-inset-bottom);
	}

	.uni-list-item__container {
		align-items: center;
	}

	.uni-list {
		.uni-border-top {
			border: 0px;
		}

		.uni-border-bottom {
			border: 0px;
		}
	}

	.container {
		margin: 10px 10px;
		padding-bottom: 50px;

		.commodity-body {
			display: flex;
			flex-direction: column;
			gap: 10px;

			.commodity-content-wrapper {
				padding: 10px 10px;
				border-radius: 10px;
				background-color: #fff;

				.commodity-content {
					width: 100%;
					height: 200px;
					margin-bottom: 10px;
				}

				.location {
					margin: 10px 0px;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					background-color: #fafafa;
					height: 30px;
					font-size: 12px;
					color: #a5a5a5;
					border-radius: 10px;
					padding: 0px 5px;
				}
			}

			.commodity-attr-wrapper {
				border-radius: 10px;
				overflow: hidden;
				background-color: #fff;
			}

			// .cu-list {
			// 	.cu-item {
			// 		border-bottom: 1px solid #f5f5f5;
			// 		padding-left: 0px !important;
			// 	}
			// }

			.publish-btn {
				margin-top: 20px;
				background-color: #fae441;

			}

			// .file-picker__box-content {
			// 	border-radius: 10px !important;
			// }

		}

		.deliveryModePopup {
			.content {
				padding-bottom: 50px;
				border-radius: 15px 15px 0 0;
				overflow: hidden;
				position: relative;
				background-color: #fff;

				.head {
					margin-top: 20px;
					text-align: center;

					.title {
						height: 30px;
					}

					.icon-close {
						position: absolute;
						right: 20px;
						top: 20px;
						border: 1px solid #f0f0f0;
						width: 20px;
						height: 20px;
						line-height: 20px;
						border-radius: 10px;
					}
				}

				.body {
					margin: 20px 20px;

					.row {
						display: flex;
						border-bottom: 1px solid #f5f5f5;
						height: 60px;
						line-height: 60px;
						align-items: center;

						.label {
							width: 60px;
							font-size: 16px;
						}

						input {
							width: 100%;
							height: 60px;
						}
					}
				}

				.footer {
					margin-top: 20px;

					button {
						width: 90%;
						height: 40px;
						border-radius: 20px;
						background-color: #fae441;
						color: #454545;
					}
				}
			}
		}

		.pricePopup {
			.content {
				padding-bottom: 50px;
				border-radius: 15px 15px 0 0;
				overflow: hidden;
				background-color: #fff;

				.top-section {
					background-color: #333333;
					text-align: center;
					height: 50px;
					line-height: 50px;
					color: #fafafa;
					font-size: 14px;

					.fan-price {
						color: #fae441;
					}
				}

				.price-item {
					height: 60px;
					line-height: 60px;
					border-bottom: 1px solid #f5f5f5;
					color: #6e6e6e;
					display: flex;
					align-items: center;
					padding: 5px 10px;

					text {
						width: 60px;
						font-size: 16px;
					}

					input {
						width: 100%;
						height: 60px;
					}
				}

				.btn-section {
					margin-top: 20px;

					.price-submit-btn {
						width: 90%;
						height: 40px;
						border-radius: 20px;
						background-color: #fae441;
						color: #454545;
					}
				}

				.safe-area-height {
					height: 34px;
				}

			}
		}
	}
</style>