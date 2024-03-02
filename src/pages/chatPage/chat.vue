<template>
  <view class="container">

    <view>
      <text class="text1">聊天室</text>
    </view>
    <view class="container_1">

      <picker @change="bindPickerChange" :value="page" :range="array">
        <view class="uni-input">{{ array[page] }} ▼</view>
      </picker>

      <view class="container_3">
        <ChatOne v-if="page===0||page===1" :type="1" sender_id="dominator"></ChatOne>
        <ChatOne v-if="page===0||page===3" :type="3" sender_id="health"></ChatOne>
        <ChatOne v-for="(item, index1) in doctor" :key="index1" :sender_id="item.doctorId" :type="2"
                 v-if="page===0||page===2" :img="`../../static/doctor/`+item.doctorImage"
                 :time="dealTime[index1]"></ChatOne>
      </view>

    </view>
    <ScuGive/>

  </view>
</template>

<script setup>
import ScuGive from "../../components/tail/scuGive.vue";
import {onMounted, reactive, ref, watch} from "vue";
import ChatOne from "../../components/chat/chatOne.vue";
import {getDoctorById, getReserveInfo} from "../../api/http";
import store from "../../store";

let array = reactive(['全部消息', '官方消息', '医生消息', '健康推送'])

let page = ref(0)

let dealTime = reactive([])

let doctor = reactive([])

let changes=ref(1);

const bindPickerChange = (e) => {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  store.commit('setChatIndex', e.detail.value)
  const x = e.detail.value
  store.commit('setChatIndex', x)
  changes.value=changes.value+1
}

watch(changes, (value, oldValue, onCleanup) => {
  if (store.state.chatIndex == 0){
    page.value = 0
  }
  if (store.state.chatIndex == 1){
    page.value = 1
  }

  if (store.state.chatIndex == 2){
    page.value = 2
  }

  if (store.state.chatIndex == 3){
    page.value = 3
  }
})

onMounted(() => {
  if (store.state.isLogin) {
    getReserveInfo(store.state.user.old_id).then((res) => {
      for (let i = 0; i < res.length; i++) {
        console.log(111)
        dealTime.push(res[i].dealCreateTime)
      }
      for (let i = 0; i < res.length; i++) {
        console.log(222)
        getDoctorById(res[i].dealDoctorId).then((res1) => {
          doctor.push(res1)
        })
      }
    })
  }

})


</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}

.text1 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  font-weight: 700;
  margin-top: 10px;
  margin-left: 10px;
}

.container_1 {
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 5px 5px rgb(0 0 0 / 8%);
  height: 80%;
  width: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}

.container_2 {
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /*border: 1px solid red;*/
}

.uni-input {
  font: 15px Georgia, "Times New Roman", Times, serif;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}

.container_3 {
  margin-left: 10px;
  margin-right: 10px;
  /*width: 100%;*/
  /*border: 1px solid moccasin;*/
}

</style>
