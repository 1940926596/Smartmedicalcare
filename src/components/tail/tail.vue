<template>
  <view class="container">
    <view class="container1" @click="()=>{isHomeSelect = true;isChatSelect = false;isUserSelect = false;store.commit('setPageId', 1);}">
      <!--    首页     -->
      <img v-if="!isHomeSelect" src="/static/tail/home.png"
           style="height: 20px;width: 20px"/>
      <img v-if="isHomeSelect" src="../../static/tail/home_selected.png"
           style="height: 20px;width: 20px"/>
      <text class="font1">首页</text>
    </view>
    <view class="container2" @click="()=>{isChatSelect = true;isUserSelect = false;isHomeSelect = false;store.commit('setPageId', 2);}">
      <!--  聊天界面    -->
      <image v-if="!isChatSelect" src="../../static/tail/chat.png" style="height: 20px;width: 20px"/>
      <image v-if="isChatSelect" src="../../static/tail/chat_selected.png" style="height: 20px;width: 20px"/>
      <text class="font1">聊天</text>
    </view>
    <view class="container3" @click="()=>{isUserSelect = true;isChatSelect = false;isHomeSelect = false;store.commit('setPageId', 3);}">
      <!--  个人信息    -->
      <image v-if="!isUserSelect" src="../../static/tail/user.png" style="height: 20px;width: 20px"/>
      <image v-if="isUserSelect" src="../../static/tail/user_selected.png" style="height: 20px;width: 20px"/>
      <text class="font1">用户</text>
    </view>
  </view>

</template>

<script setup>

import {windowHeight} from "../../api/height";
import {ref, watch} from "vue";
import store from "../../store";

let height = windowHeight;
let pageIndex = ref(1);
let isHomeSelect = ref(true)
let isChatSelect = ref(false)
let isUserSelect = ref(false)

const changeHomeSelect = () => {
  console.log("hello")
  isHomeSelect = true;
  isChatSelect = false;
  isUserSelect = false;
  store.commit('setPageId', 1);
}

const changeChatSelect = () => {
  console.log("hello")
  isChatSelect = true;
  isHomeSelect = false;
  isUserSelect = false;
  store.commit('setPageId', 1);
}

const changeUserSelect = () => {
  console.log("hello")
  isUserSelect = true;
  isChatSelect = false;
  isHomeSelect = false;
  console.log(isUserSelect)
  store.commit('setPageId', 1);
}


watch(pageIndex, function (value,oldValue) {
  console.log(value)
  console.log(oldValue)
  console.log("pageChange")
})


</script>

<style scoped>
.container {
  height: 50px;
  width: 100%;
  /*border: 1px solid red;*/
  border-top: 1px solid rgba(0,0,0,0.1);
  /*border-top-left-radius: 5px;*/
  /*border-top-right-radius: 5px;*/
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.container1 {
  /*border: 2px solid red;*/
  width: 20%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container2 {
  /*border: 2px solid red;*/
  width: 20%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container3 {
  /*border: 2px solid red;*/
  width: 20%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.font1 {
  font: 10px Georgia, "Times New Roman", Times, serif;
  font-weight: bold;
  margin-top: 5px;
}

</style>
