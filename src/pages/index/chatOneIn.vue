<template>
  <view class="container">
    <view class="container_1">

      <view class="container_5" ref="scrollContainer">
        <text class="text3">
          {{doctor.doctorName}}
        </text>
        <ChatInfo v-for="(item,index) in chats" :key="index" :send-or-give="item.sendOrGive"
                  :receiver_img="receiver_img" :context="item.content" :time="item.time"
                  :sender_img="sender_img"></ChatInfo>
      </view>

    </view>

    <view class="container_2">
      <text class="text1">
        输入 ▼：
      </text>

      <view class="container_3">
        <textarea class="container_4" v-model="context" :ref="scrollContainer"></textarea>
        <button class="btn" @click="sendMsg">
          发送
        </button>
      </view>

    </view>

  </view>
</template>
<script setup>

import {nextTick, onMounted, onUnmounted, reactive, ref, watchEffect} from "vue";
import {onLoad} from "@dcloudio/uni-app";
import {getDoctorById, sendSocketMsg} from "../../api/http";
import ChatInfo from "../../components/chat/chatInfo.vue";
import {getCurrentTime} from "../../api/utils";
import store from "../../store";
import {js} from "@dcloudio/uni-cli-shared/lib/preprocess/lib/regexrules";

//创建对话
let chat = {
  time: '',
  content: '',
  sendOrGive: ''
}

let context = ref('')

let chats = reactive([])

const sender_img = "../../static/img_1.png";
let receiver_img = ref('');
let sender_id = ''
let scrollContainer = ref(null);

onLoad((option) => {
  sender_id = option.sender_id
  console.log("hello")
})

const scrollToBottom = () => {
}

console.log("hello11")
const sendMsg = () => {
  if(context.value===''||context.value===null){
    uni.showModal({
      content:"不能发送空的消息"
    })
  }
  else {
    chat.content = context.value
    chat.time = getCurrentTime();
    chat.sendOrGive = false;
    // console.log(chat)
    chats.push({})
    let len = chats.length
    chats[len - 1].content = chat.content
    chats[len - 1].time = chat.time
    chats[len - 1].sendOrGive = chat.sendOrGive
    context.value = ''
    sendSocketMsg(doctor.doctorId, chat.content).then((res) => {

    })
  }
}

const getMsg = (res) => {
  // console.log(res)
  chat.content = res.message
  chat.time = getCurrentTime();
  chat.sendOrGive = true;
  // console.log(chat)
  chats.push({})
  let len = chats.length
  chats[len - 1].content = chat.content
  chats[len - 1].time = chat.time
  chats[len - 1].sendOrGive = chat.sendOrGive
  context.value = ''
}

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
  if(sender_id==="dominator"){
    doctor.doctorId="dominator"
    doctor.doctorName="官方消息"
    receiver_img.value = '../../static/logo.png'
  }
  else if(sender_id==="health"){
    doctor.doctorId="health"
    doctor.doctorName="健康推荐"
    receiver_img.value = '../../static/swiper/1.jpg'
  }
  else{
    console.log("hello")
    getDoctorById(sender_id).then((res) => {
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
      receiver_img.value = '../../static/doctor/' + doctor.doctorImage
      console.log(receiver_img.value)
    })
  }

  uni.connectSocket({
    url: 'ws://localhost:8080/websocket/' + store.state.user.old_id
  });
  uni.onSocketOpen(function (res) {
    console.log('WebSocket连接已打开！');
  });
  uni.onSocketError(function (res) {
    console.log('WebSocket连接打开失败，请检查！');
  });
  uni.onSocketMessage(function (res) {
    let json = JSON .parse (res.data);
    if(json.userId===doctor.doctorId){
      getMsg(json);
    }
  })
})

onUnmounted(() => {
  uni.closeSocket()
})

</script>

<style scoped>
.container {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  /*padding: 20px;*/
}

.container_1 {
  height: 70%;
  /*border: 1px solid red;*/
  padding: 10px;

}

.container_2 {
  height: 30%;
  /*border: 1px solid red;*/
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

}

.text1 {
  font: 15px Georgia, "Times New Roman", Times, serif;
}

.text3{
  font: 15px Georgia, "Times New Roman", Times, serif;
  align-self: flex-start;
  margin-left: 10px;
  margin-top: 10px;
}

.container_3 {
  width: 100%;
  /*border:1px solid aqua;*/
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.btn {
  height: 20%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-bottom: 20px;
}

.container_4 {
  width: 100%;
  height: 50%;
  resize: none;
  border: 1px solid silver;
  border-radius: 10px;
  padding: 5px;
  font: 15px Georgia, "Times New Roman", Times, serif;
}

.container_5 {
  height: 100%;
  width: 100%;
  border: 1px solid palegoldenrod;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
}


</style>
