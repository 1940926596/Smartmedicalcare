<template>
  <view class="container" :style="{height:height*0.1+`px`}" @click="chatIn">
    <view class="left">
      <image v-if="props.type===2" :src="image" class="img1"></image>
      <image v-if="props.type===1" src="../../static/logo.png" class="img1"></image>
      <image v-if="props.type===3" src="../../static/swiper/1.jpg" class="img1"></image>
    </view>

    <view class="middle">

      <view class="middle_container">
        <text v-if="type===2" class="middle_text1"
              style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis;">
          {{ doctor.doctorName }}
        </text>
        <text v-if="type===1" class="middle_text1"
              style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis;">
          官方消息
        </text>
        <text v-if="type===3" class="middle_text1"
              style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis;">
          健康推送
        </text>
        <view class="middle_text3">
          <text class="middle_text4" v-if="props.type===1">官方</text>
          <text class="middle_text4" v-if="props.type===2">医生</text>
          <text class="middle_text4" v-if="props.type===3">健康推送</text>
        </view>
      </view>

      <text v-if="props.type===2" class="middle_text2"
            style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis">
        你好啊{{ store.state.user.old_name }}，我是，{{ doctor.doctorName }}
      </text>

      <text v-if="props.type===1" class="middle_text2"
            style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis">
        这里是官方消息哦
      </text>

      <text v-if="props.type===3" class="middle_text2"
            style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis">
        这里是健康推送哦
      </text>

    </view>

    <view class="right" v-if="type===2">
      <!--      <text class="time">time</text>-->
      <text class="time" style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis">{{ props.time }}</text>
    </view>
    <view class="right" v-if="type===1">
      <!--      <text class="time">time</text>-->
      <text class="time" style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis">0-0-0 0:0:0</text>
    </view>
    <view class="right" v-if="type===3">
      <!--      <text class="time">time</text>-->
      <text class="time" style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis">0-0-0 0:0:0</text>
    </view>
  </view>
</template>

<script setup>

import {windowHeight, windowWidth} from "../../api/height";
import store from "../../store";
import {onMounted, reactive, ref} from "vue";
import {getDoctorById} from "../../api/http";
import {getTimeStr} from "../../api/utils";

const width = windowWidth;
const height = windowHeight;

const props = defineProps({
  sender_id: String,
  type: Number,
  img: String,
  time: String
})

let image = ref('')

const chatIn = () => {
  uni.navigateTo({
        url: './chatOneIn?sender_id=' + props.sender_id
      }
  )
}

let chatTime = ref()

let doctor = reactive({
  doctorId: '',
  doctorName: '',
  doctorImage: '',
  doctorGender: '',
  doctorPhone: '',
  doctorCompany: '',
  doctorDepartment: '',
  doctorStartTime: '',
  doctorScore: 0,
  doctorPassword: '',
  doctorCreateTime: '',
  doctorShortIntroduction: '',
  doctorLongIntroduction: ''
})

onMounted(() => {
  if (props.type === 2) {
    image.value = props.img
    chatTime.value = props.time
  }

  if (props.type === 2) {
    getDoctorById(props.sender_id).then((res) => {
      doctor.doctorId = res.doctorId
      doctor.doctorName = res.doctorName
      doctor.doctorImage = res.doctorImage
      doctor.doctorGender = res.doctorGender
      doctor.doctorPhone = res.doctorPhone
      doctor.doctorCompany = res.doctorCompany
      doctor.doctorDepartment = res.doctorDepartment
      doctor.doctorStartTime = res.doctorStartTime
      doctor.doctorScore = res.doctorScore
      doctor.doctorPassword = res.doctorPassword
      doctor.doctorCreateTime = res.doctorCreateTime
      doctor.doctorShortIntroduction = res.doctorShortIntroduction
      doctor.doctorLongIntroduction = res.doctorLongIntroduction
      // doctor=res
    })
  }

})

</script>

<style scoped>
.container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 2px;
}

.left {
  width: 12%;
  /*border: 1px solid rgba(0, 0, 0, 0.1);*/
  height: 70%;
  border-radius: 50%;
  margin-left: 20px;
}

.middle {
  width: 50%;
  /*border: 1px solid rgba(0, 0, 0, 0.1);*/
  height: 70%;
  display: flex;
  justify-content: center;
  /*align-items: flex-start;*/
  flex-direction: column;
}

.right {
  width: 12%;
  /*border: 1px solid rgba(0, 0, 0, 0.1);*/
  height: 70%;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  flex-direction: column;
}

.img1 {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.time {
  font: 10px Georgia, "Times New Roman", Times, serif;
}

.middle_text1 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  /*margin-bottom: 2px;*/
  width: 75px;
  /*border: 1px solid aqua;*/
}

.middle_text2 {
  margin-top: 2px;
  font: 12px Georgia, "Times New Roman", Times, serif;
}

.middle_container {
  display: flex;
  /*border: 1px solid coral;*/
  justify-content: flex-start;
  align-items: center;
}

.middle_text3 {
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 122, 253, 0.1);
  border-radius: 5px;
  padding: 3px;
}

.middle_text4 {
  font: 10px Georgia, "Times New Roman", Times, serif;
  color: rgb(0, 122, 253);
}
</style>
