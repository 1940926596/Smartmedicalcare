<template>
  <view class="content">
    <div class="head" :style="{height:windowHeight1-51+`px`}">
      <Home v-if="store.state.pageIndex===1"></Home>
      <Chat v-if="store.state.pageIndex===2"></Chat>
      <User v-if="store.state.pageIndex===3"></User>
    </div>
    <Tail class="tail" ></Tail>
  </view>
</template>

<script setup>

import {windowHeight, windowWidth} from "../../api/height";
import store from "../../store";
import Home from "../homePage/home.vue";
import User from "../userPage/user.vue";
import Chat from "../chatPage/chat.vue";
import Tail from "../../components/tail/tail.vue";

let windowHeight1=windowHeight;

</script>

<style>
.content {
  height: 100%;
  width: 100%;
  /*border:0px solid seashell;*/
}
.tail{
  position: absolute;
  position: fixed;
  bottom:0;
  width: 100%
}
.head{
  width: 100%;
  /*border: 1px solid aqua;*/
  overflow-y: scroll;
}

</style>
