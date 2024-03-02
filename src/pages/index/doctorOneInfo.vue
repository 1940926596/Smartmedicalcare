<template>
  <view class="container">
    <view class="container_1">
      <image :src="image" class="image"
             :style="{height:height*0.3+`px`,width:height*0.3+`px`}"></image>
      <view class="container_2">

        <text class="text1">医生姓名：{{ doctor.doctorName }}</text>
        <text class="text1">医生性别：{{ doctor.doctorGender }}</text>
        <text class="text1">医生从业时间：{{ doctor.doctorCreateTime }}</text>
        <text class="text1">医生部门：{{ doctor.doctorDepartment }}</text>
        <text class="text1">医生得分：{{ doctor.doctorScore }}</text>
      </view>
    </view>
    <view class="container_3" :style="{width:width+`px`}"></view>
    <view class="text2">
      标签：{{ doctor.doctorShortIntroduction }}
    </view>
    <view class="container_3" :style="{width:width+`px`}"></view>
    <view class="text2">
      介绍：{{ doctor.doctorLongIntroduction }}
    </view>
    <view class="container_3" :style="{width:width+`px`}"></view>

    <view style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 20px">
      <view v-if="!isReserve" class="yes" @click="reserve">
        我想预约
      </view>
      <view v-else class="yes">
        已预约
      </view>
    </view>

    <ScuGive/>

  </view>
</template>

<script setup>

import {windowHeight, windowWidth} from "../../api/height";
import {onLoad, onReady, onShow} from "@dcloudio/uni-app";
import {baseURL, getReserveInfo, reserveDoctor} from "../../api/http";
import {onMounted, reactive, ref, toRef, toRefs} from "vue";
import ScuGive from "../../components/tail/scuGive.vue";
import {getRandomNum} from "../../api/utils";
import store from "../../store";

let width = windowWidth;
let height = windowHeight;

let image=ref('')

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

let x = ref(0)

let isReserve = ref(false)

onLoad((option) => {
  doctor.doctorId = option.doctorId
})

onMounted(() => {
  x.value = 2;
  uni.request({
    url: baseURL + '/doctor/getDoctorById?doctorId=' + doctor.doctorId
  }).then((res) => {
    doctor.doctorId = res.data.doctorId
    doctor.doctorName = res.data.doctorName
    doctor.doctorImage = res.data.doctorImage
    doctor.doctorGender = res.data.doctorGender
    doctor.doctorPhone = res.data.doctorPhone
    doctor.doctorCompany = res.data.doctorCompany
    doctor.doctorDepartment = res.data.doctorDepartment
    doctor.doctorStartTime = res.data.doctorStartTime
    doctor.doctorScore = res.data.doctorScore
    doctor.doctorPassword = res.data.doctorPassword
    doctor.doctorCreateTime = res.data.doctorCreateTime
    doctor.doctorShortIntroduction = res.data.doctorShortIntroduction
    doctor.doctorLongIntroduction = res.data.doctorLongIntroduction

    // doctor=res.data

    image.value="/static/doctor"+'/'+doctor.doctorImage
    const parts = doctor.doctorCreateTime.split(" "); // 使用空格作为分隔符，拆分成字符串数组
    doctor.doctorCreateTime = parts[0]; // 获取数组的第一个元素

    getReserveInfo(store.state.user.old_id).then((res) => {
      // console.log(res)
      for (let i = 0; i < res.length; i++) {
        if(res[i].dealDoctorId===doctor.doctorId){
          isReserve.value=true
        }
      }
    })

  })

})

const reserve = () => {
  uni.showModal({
    title: '确认预约',
    content: '确认预约后，医生将会将你列入他的监护范围时间为1年，你将可以在用户界面得到该医生信息，在聊天界面与医生开启聊天',
    success: function (res) {
      if (res.confirm) {
        // console.log('用户点击确定');
        reserveDoctor(getRandomNum(), store.state.user.old_id, doctor.doctorId)
        uni.navigateBack()
        uni.showToast({
          title: '预约成功',
          //将值设置为 success 或者直接不用写icon这个参数
          icon: 'success',
          //显示持续时间为 2秒
          duration: 2000
        })
      } else if (res.cancel) {
        // console.log('用户点击取消');
      }
    }
  });
}

</script>

<style scoped>
.container {
  width: 100%;
  /*border: 1px solid aqua;*/
}

.container_1 {
  display: flex;
}

.container_2 {
  display: flex;
  justify-content: center;
  flex-direction: column;
  left: 0;
  font: 15px Georgia, "Times New Roman", Times, serif;
  font-weight: 500;
}

.text1 {
  margin-top: 5px;
}

.text2 {
  display: flex;
  justify-content: center;
  flex-direction: column;
  left: 0;
  font: 15px Georgia, "Times New Roman", Times, serif;
  font-weight: 500;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.container_3 {
  height: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  /*border: 1px solid aqua;*/
  /*width: 100%;*/
  margin-top: 10px;
}

.yes {
  width: 30%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.1);
  /*border-radius: 50%;*/
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  font: 20px Georgia, "Times New Roman", Times, serif;
}
</style>

