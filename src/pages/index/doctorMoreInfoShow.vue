<template>

  <view class="container">
    <view class="container_1">
      <view style="margin-left: 5px" @click="searchDoctor">
        🔍
      </view>
      <form>
        <input  class="input" v-model="inputs"
               :style="{height:height*0.03+`px`,width:windowWidth*0.7+`px`}" placeholder="请按照名字搜索" placeholder-style="font-size:26rpx;color:#ACACAC;"/>
      </form>
      <text class="text1" @click="()=>{inputs=''}">取消</text>
    </view>


    <view class="container_2">
      <DoctorOne v-for="(item, index) in doctorList.slice(0,a)" :key="index" :name="item.doctorName" :id="item.doctorId"
                 :introduction="item.doctorShortIntroduction" :department="item.doctorDepartment"
                 :img="item.doctorImage"></DoctorOne>
    </view>

    <view class="bottom">

      <div class="load-more mr-bottom" v-if="a<doctorList.length" @click='()=>{a=a+2}'>点击加载更多</div>
      <div class="load-more mr-bottom" v-else>没有更多了</div>
    </view>
    <ScuGive/>
  </view>


</template>

<script setup>

import {onLoad} from "@dcloudio/uni-app";
import {onMounted, reactive, ref, watch} from "vue";
import {windowHeight, windowWidth} from "../../api/height";
import {baseURL} from "../../api/http";
import ScuGive from "../../components/tail/scuGive.vue";
import DoctorOne from "../../components/doctor/doctorOne.vue";
import {search} from "@dcloudio/uni-stacktracey/lib/source-map/lib/binary-search";

const height = windowHeight;

let inputs = ref();

let a = ref(4);

const searchDoctor = () => {
  searchInputChange(inputs.value)
}

//分页查询，只查询6个医生
let doctor = reactive([

])

let x = ref(0)

onMounted(() => {
  x.value = 2;
  uni.request({
    url: baseURL + '/doctor/getDoctorList'
  }).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
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
    }
    searchInputChange('')
  })
})

let doctorList=reactive([])
const searchInputChange = (value) => {
  // 若未输入值，则展示所有数据
  if (null === value || undefined === value ||value==='') {
    doctorList = doctor;
    inputs.value='all'
    inputs.value=''

  } else {
    doctorList = []; // 结果列表置空
    let regStr = '';
    // 初始化正则表达式
    for (let i = 0; i < value.length; i++) {
      regStr = regStr + '(' + value[i] + ')([\\s]*)'; //跨字匹配
    }
    let reg = new RegExp(regStr);
    for (let i = 0; i < doctor.length; i++) {
      let name = doctor[i].doctorName; //按照名字匹配
      let regMatch = name.match(reg);
      if (null !== regMatch) {// 将匹配的数据放入结果列表中
        doctorList.push(doctor[i]);
      }
    }
  }
  inputs.value=''
  a.value=4
}

</script>

<style scoped>


.container {
  /*border: 1px solid red;*/
  width: 100%;
}

.container_1 {
  /*border: 1px solid red;*/
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}


.input {
  border-radius: 50px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  text-indent: 0px;
  padding-left: 10px;
  font: 15px Georgia, "Times New Roman", Times, serif;
  background-color: rgba(0, 0, 0, 0.01);
}

.pcs{

}

.text1 {
  font: 15px Georgia, "Times New Roman", Times, serif;
}

.container_2 {
  border-top: 20px;
  width: 100%;
  /*border: 10px solid coral;*/
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

}

.bottom {
  width: 100%;
  /*margin-bottom: 20px;*/
}

.load-more {
  font: 10px Georgia, "Times New Roman", Times, serif;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

}
</style>
