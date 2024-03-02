<template>
  <view class="container">
    <view class="texts">
      <text class="textName_name">
        健康知识
      </text>
      <text class="textName_name1" @click="gotoMoreInfo">
        >>>查看更多
      </text>
    </view>

    <view class="news">
      <view class="news_i">
        <image src="../../static/health/old.png" mode="scaleToFill" class="size"></image>
        <view>
          <navigator url="/pages/message/message" class="titlea" style="font-size: 25px;text-align:center;font-family:'Times New Roman', Times, serif;">老年人必须知道的那些健康知识</navigator>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup>
const gotoMoreInfo = () => {
  uni.navigateTo({
    url: './healthMoreInfoShow?doctorId=1'
  })
}
</script>

<style scoped>
.container{
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.textName_name {
  font: 15px Georgia, "Times New Roman", Times, serif;
  font-weight: 900;
  margin-left: 10px;

}
.textName_name1 {
  font: 10px Georgia, "Times New Roman", Times, serif;
  color: rgba(0,0,0,0.65);
  font-weight: 900;
  margin-left: 10px;
}

.texts{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*border: 1px solid red;*/
  margin-bottom: 10px;
}

.titlea{
  width: 100%;
  height: 100%;
  background-color: white;
  font-family: Pacifico;
}

.titleb{
  width: 100%;
  height: 100%;
  background-color: white;
}

.titlec{
  width: 100%;
  height: 180rpx;
  background-color: white;
}

.size{
  width: 100%;
  height: 500rpx;
}

.info{
  background-color: rgba(0,0,0,0.1);
  height: 43rpx;
}

</style>
