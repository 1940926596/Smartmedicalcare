<template>
  <view class="container" :style="{width:windowWidth*0.8+`px`}" v-if="!props.sendOrGive">
    <image :src="props.sender_img" class="container_1"></image>
    <view class="container_2">
      <text style="background-color:silver;border-radius: 10px;padding: 10px">
        {{ context }}
      </text>
    </view>

  </view>

  <view class="container_end" :style="{width:windowWidth*0.8+`px`}" v-if="props.sendOrGive">

    <view class="container_2_end">
      <text style="background-color:deepskyblue; border-radius: 10px;padding: 10px">
        {{ context }}
      </text>
    </view>
    <image :src="props.receiver_img" class="container_1"></image>

  </view>

</template>

<script setup>


import {windowWidth} from "../../api/height";
import {onMounted} from "vue";

const props = defineProps({
  context: String,
  sender_img: String,  //发送者就是自己
  receiver_img: String,    //接收者是医生
  sendOrGive: Boolean
  //false 发送  //true 接受
})

const width = windowWidth

onMounted(() => {

})

</script>

<style scoped>
.container {
  /*border: 1px solid red;*/
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
}

.container_end {
  margin-top: 20px;
  /*border: 1px solid red;*/
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  /*border: 1px solid red*/
}

.container_1 {
  height: 25px;
  width: 25px;
  border-radius: 50px;
  align-self: flex-start;
}

.container_2 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-left: 20px;
  margin-top: 2px;
  border-radius: 2px;
  width: 60%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.container_2_end {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-right: 20px;
  margin-top: 2px;
  border-radius: 2px;
  width: 60%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  /*border: 1px solid deeppink;*/
}


</style>
