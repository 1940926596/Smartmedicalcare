<template>
  <view class="container_2" :style="{width:width*0.4+`px`}" @click="naviIntoDoc">

      <view class="page">
        <view class="image-list">

            <view class="image-content">
              <image :style="{width: width*0.4+`px`, height: width*0.4+`px`}" :src="`../../static/doctor/`+props.img"></image>
            </view>

        </view>
      </view>

    <view class="name">
      <text>{{ name }}</text>
      <text>科室：{{ department }}</text>
      <text style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis" >简介：{{ introduction }}</text>
    </view>

  </view>
</template>

<script setup>
import {windowWidth} from "../../api/height";
import {onMounted, ref} from "vue";
import {onLoad} from "@dcloudio/uni-app";

let width = windowWidth

const props = defineProps({
  id:String,
  name: String,
  department: String,
  introduction: String,
  img: String
})

const naviIntoDoc=()=>{
  // console.log("hello")
  uni.navigateTo({
    url:'./doctorOneInfo?doctorId='+props.id
  })
}

</script>

<style scoped>
.container_2 {
  border: 1px solid rgba(0,0,0,0.1);
  margin-top: 10px;
  border-radius: 2px;
  box-shadow: 0 0 2px 2px rgb(0 0 0 / 8%);
}

.name {
  /*border: 1px solid salmon;*/
  font: 10px Georgia, "Times New Roman", Times, serif;
  display: flex;
  flex-direction: column;
}

</style>
