<template>
	<view>
		商品列表
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			const data = JSON.parse(decodeURIComponent(option.params));
			this.status = data.status
			//this.loadData()
		},
		data() {
			return {
				params:{
					pageNum: 1,
					pageSize: 10,
					totalPage: 99,
					status:null,
				}
			};
		},
		methods:{
			loadData(){
				if (this.pageNum > this.totalPage) {
					uni.showToast({
						title: "���޸�������"
					})
					return;
				}
				list(this.params).then(res=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">

</style>