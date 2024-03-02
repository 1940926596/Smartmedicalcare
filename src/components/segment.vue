<template>
  <view class="container_1" :style="{width:width+`px`}"></view>
</template>

<script setup>

import {windowWidth} from "../api/height";
const width=windowWidth

</script>

<style scoped>
.container_1{
  height: 5px;
  background-color: rgba(0,0,0,0.1);
  /*border: 1px solid aqua;*/
  /*width: 100%;*/
  /*margin-top: 10px;*/
}
</style>
