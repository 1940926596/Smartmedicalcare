<template>
	<view class="tekeout">
		<view class="left" >
			<view class="content-box" v-for="(item,index) in leftList" :key="index">
				<!-- 图片 -->
				<image class="img" :src="item.cover" mode="widthFix"></image>
			</view>
			
		</view>
		<view class="right" >
			<view class="content-box" v-for="(item,index) in rightList" :key="index" >
				<image  class="img" :src="item.cover" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				// 初始化左右栏
				leftList: [],
				rightList: [],
				// 初始化左右栏高度
				leftH: 0,
				rightH: 0,
				imgArr: [
					{
						cover: "../../static/info/acha.png"
					},
					{
						cover: "../../static/info/achb.png"
					},
					{
						cover: "../../static/info/achc.png"
					},
					{
						cover: "../../static/info/achd.png"
					},
					{
						cover: "../../static/info/ache.png"
					},
					{
						cover: "../../static/info/achf.png"
					},
					{
						cover: "../../static/info/achg.png"
					},
					{
						cover: "../../static/info/achh.png"
					}
				]
			}
		},
		onLoad(){
			this.list()
		},
		methods:{
			list(){
				const that = this
				let inde = 0;
				this.imgArr.forEach((res)=>{
					
					uni.getImageInfo({
						src: res.cover,
						success:(image)=>{
							
							// 计算图片渲染高度
							let showH = image.height * (750 / image.width);
							// 判断左右盒子高度
							if(that.leftH <= that.rightH){
								that.leftList.push(res)
								that.leftH += showH
							}else{
								that.rightList.push(res)
								that.rightH += showH
							}
						}
					})
				})
				
				// console.log("左边：",that.leftList)
				// console.log("右边：",that.rightList)
			}
		}
		
	}
</script>

<style scoped>
	.tekeout {
		padding: 0 15rpx;
		font-size: 14rpx;
		line-height: 24rpx;
	}
	.content-box{
		position: relative;
	}
	.left,.right{
		display: inline-block;
		width: 49%;
		vertical-align: top;
	}
	.left{
		margin-right: 2%;
	}
	.img{
		width: 100%;
		border-radius: 8rpx;
		/* background-color: #ffe5e5; */
	}
	.ying{
		position: absolute;
		top: 0;
		bottom: 4rpx;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.5);
		filter: alpha(opacity=60);
		border-radius: 8rpx;
	} 
	
</style>
