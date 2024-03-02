<template>
  <view style="height: 50%">
    <swiper :indicator-dots="true" :autoplay="true"
            :interval="3000" :duration="1000"
            indicatorcolor="rgba(255,255,255,0.1)"
            indicator-active-color="white"
            class="swiper" style="height: 100%">

      <swiper-item>
        <view class="swiper-item">
          <img src="/static/swiper/3.jpg"
               style="height: 100%;width:100%"/>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">
          <img src="/static/swiper/1.jpg"
               style="height: 100%;width:100%"/>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">
          <img src="/static/swiper/2.jpg"
               style="height: 100%;width:100%"/>
        </view>
      </swiper-item>

    </swiper>

    <Segment></Segment>

    <HealthShow></HealthShow>

    <Segment></Segment>

    <DoctorShow></DoctorShow>

    <view class="textName" style="margin-top: 10px">
      <img src="../../static/logo.png" style="height: 50px;width:80px"/>
      <text class="textName_name">
        SCU 提供技术支持
      </text>

    </view>



  </view>

</template>

<script setup>

import DoctorShow from "./InfoShow/doctorShow.vue";
import HealthShow from "./InfoShow/healthShow.vue";
import {windowWidth} from "../../api/height";
import Segment from "../../components/segment.vue";
import {onMounted, ref} from "vue";
const width=windowWidth

let a=ref(0)
const x=()=>{return 1}

onMounted(()=>{
  a.value=x()
})

</script>

<style scoped>
.textName{
  height:20%;
  display: flex;
  justify-content: center;
  align-items: center;
  /*border:1px solid aqua;*/
}
.textName_name{
  font: 10px Georgia, "Times New Roman", Times, serif;
  font-weight: 600;
  margin-left: 10px;
}

.swiper-item{
  height:100%;
  width: 100%;
}
.container_1{
  height: 5px;
  background-color: rgba(0,0,0,0.1);
  margin-top: 10px;
}
</style>
