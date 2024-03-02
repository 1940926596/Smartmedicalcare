<template>
  <view class="container">
    <view class="texts">
      <text class="textName_name">
        入驻医生
      </text>
      <text class="textName_name1" @click="gotoMoreDoctor">
        >>>查看更多
      </text>
    </view>

    <view class="container_2">
      <DoctorOne v-for="(item, index) in doctor" :key="index" :name="item.doctorName" :id="item.doctorId"
                 :introduction="item.doctorShortIntroduction" :department="item.doctorDepartment"
                 :img="item.doctorImage"></DoctorOne>
    </view>

  </view>

</template>

<script setup>
import DoctorOne from "../../../components/doctor/doctorOne.vue";
import * as url from "url";
import {onMounted, reactive, ref} from "vue";
import {baseURL} from "../../../api/http";

const doctors = [
  {
    name: "常医生",
    introduction: "哈佛大学毕业，精通医术",
    age: 21,
    img: "../../static/doctor/userBack.png"
  }, {
    name: "常医生",
    introduction: "哈佛大学毕业，精通医术",
    age: 21,
    img: "../../static/doctor/img_1.png"
  }, {
    name: "常医生",
    introduction: "哈佛大学毕业，精通医术",
    age: 21,
    img: "../../static/doctor/img_2.png"
  }, {
    name: "常医生",
    introduction: "哈佛大学毕业，精通医术",
    age: 21,
    img: "../../static/doctor/userBack.png"
  }, {
    name: "常医生",
    introduction: "哈佛大学毕业，精通医术",
    age: 21,
    img: "../../static/doctor/img_1.png"
  }, {
    name: "常医生",
    introduction: "哈佛大学毕业，精通医术",
    age: 21,
    img: "../../static/doctor/img_2.png"
  }
]

//分页查询，只查询6个医生
let doctor = reactive([])

let x = ref(0)


onMounted(() => {
  x.value = 2;
  uni.request({
    url: baseURL + '/doctor/getDoctorList'
  }).then((res) => {
    for (let i = 0; i < 6; i++) {
      doctor.push({})
      doctor[i].doctorId = res.data[i].doctorId
      doctor[i].doctorName = res.data[i].doctorName
      doctor[i].doctorImage = res.data[i].doctorImage
      doctor[i].doctorGender = res.data[i].doctorGender
      doctor[i].doctorPhone = res.data[i].doctorPhone
      doctor[i].doctorCompany = res.data[i].doctorCompany
      doctor[i].doctorDepartment = res.data[i].doctorDepartment
      doctor[i].doctorStartTime = res.data[i].doctorStartTime
      doctor[i].doctorScore = res.data[i].doctorScore
      doctor[i].doctorPassword = res.data[i].doctorPassword
      doctor[i].doctorCreateTime = res.data[i].doctorCreateTime
      doctor[i].doctorShortIntroduction = res.data[i].doctorShortIntroduction
      doctor[i].doctorLongIntroduction = res.data[i].doctorLongIntroduction

      // const parts = doctor.doctorStartTime.split(" "); // 使用空格作为分隔符，拆分成字符串数组
      // doctor.doctorStartTime = parts[0]; // 获取数组的第一个元素

    }
  })
})

const gotoMoreDoctor = () => {
  uni.navigateTo({
    url: './doctorMoreInfoShow'
  })
}

</script>

<style scoped>

.container {
  margin-bottom: 10px;
}

.textName_name {
  font: 15px Georgia, "Times New Roman", Times, serif;
  font-weight: 900;
  margin-left: 10px;
}

.textName_name1 {
  font: 10px Georgia, "Times New Roman", Times, serif;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 900;
  margin-left: 10px;
}

.texts {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*border: 1px solid red;*/
}

.container_2 {
  width: 100%;
  /*border: 1px solid coral;*/
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  font: 10px Georgia, "Times New Roman", Times, serif;
}
</style>
