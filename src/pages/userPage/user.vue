<template>
  <view class="container">
    <image src="../../static/userBack.png" class="img"
           :style="{height:windowHeight*0.3+`px`,width:windowWidth+`px`}"></image>

    <view class="container_1" :style="{height:windowHeight*0.3+`px`}">

      <view class="container_2">
        <view class="cycle" :style="{height:windowHeight*0.1+`px`,width:windowHeight*0.1+`px`}"></view>

        <view v-if="store.state.user.old_id===''" class="text1" @click="weiChatLogin"> 未登录 点此登录</view>

        <view v-else>
          <view class="text6" style="width: 75px;overflow: hidden; white-space: nowrap;text-overflow: ellipsis">
            {{ store.state.user.old_name }}
          </view>
        </view>

      </view>
    </view>

    <view class="container_3">
      <view class="text2">
        <view style="margin-bottom: 5px">{{ doctorNum }}</view>
        <view>我的医生</view>
      </view>
      <view class="text2" @click="gotoClass">
        <view style="margin-bottom: 5px">14</view>
        <view>我的课程</view>
      </view>
      <view class="text2" @click="gotoCollection">
        <view style="margin-bottom: 5px">6</view>
        <view>我的收藏</view>
      </view>
      <view class="columeLine"></view>
      <view class="text2">
        <view style="margin-bottom: 5px">￥ 000</view>
        <view>我的账户</view>
      </view>
    </view>

    <Segment/>


    <view class="container_4">
      <text class="text3">必备工具</text>

      <view class="container_5">
        <view class="text4">
          <image src="../../static/user/achieve.png" class="img1" @click="gotoAchievement"></image>
          <text class="text5">我的成就</text>
        </view>

        <view class="text4" @click="gotoPrize">

          <image src="../../static/user/gift.png" class="img1" @click="gotoPrize"></image>

          <text class="text5">我的奖品</text>
        </view>

        <view class="text4">
          <image src="../../static/user/account.png" class="img1" @click="changeAccount"></image>

          <text class="text5">账号设置</text>
        </view>
      </view>
    </view>

    <ScuGive/>
  </view>
</template>

<script setup>
import {windowHeight, windowWidth} from "../../api/height";
import store from "../../store";
import Segment from "../../components/segment.vue";
import ScuGive from "../../components/tail/scuGive.vue";
import {onMounted, ref} from "vue";
import {addOldPeople, baseURL, getReserveInfo} from "../../api/http";
import {getCurrentTime} from "../../api/utils";

const AppId = 'wx370e8cd190743008';
const AppSecret = 'fd4bb6ad1f54a6f2ddabd224c1da8244';
const doctorNum = ref(0);

const register = () => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '确认登录',
      content: '登陆后，你将可以和使用该健康平台',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          resolve(true)
        } else if (res.cancel) {
          console.log('用户点击取消');
          resolve(false)
        }
      }
    });
  })

}

const gotoClass = () => {
  uni.navigateTo({
    url: './class'
  })
}


const gotoCollection = () => {
  uni.navigateTo({
    url: './collection'
  })
}

const gotoPrize=()=>{
  uni.navigateTo({
    url: './prize'
  })
}

const gotoAchievement=()=>{
  uni.navigateTo({
    url: './achievement'
  })
}


const weiChatLogin = () => {
  register().then((res) => {

    if (res) {
      let sessionId = ''
      let openid = ''

      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          let code = loginRes.code; // 获取登录凭证 code
          // 发送 code 到服务器端进行登录验证或获取用户信息等操作
          let url =
              "https://api.weixin.qq.com/sns/jscode2session?appid=" +
              AppId +
              "&secret=" +
              AppSecret +
              "&js_code=" +
              code +
              "&grant_type=authorization_code";
          uni.request({
            url: url,
            success: (res) => {
              sessionId = res.data.session_key
              openid = res.data.openid
              uni.setStorage({
                key: 'old_id',
                data: openid,
                success: function () {
                  addOldPeople(openid)
                }
              });

            },
            fail: () => {

            }
          })
        },
        fail: function (error) {
          console.log(error)
        }
      });

    }
  })
}

// 根据openid的定义，openid是用户在同一个小程序下的唯一表示，即同一个用户在不同的小程序下的openid是不同的
// 所以当你的appid变化之后，用户的openid就会发生变化，但当你的aapid不变AppSecret时openid是不会变的。

onMounted(() => {
  uni.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.log(res)
    }
  })

  if (store.state.isLogin) {
    getReserveInfo(store.state.user.old_id).then((res) => {
      doctorNum.value = res.length;
    })
  }


})

const changeAccount = () => {
  uni.navigateTo({
    url: './userAccount'
  })
}

</script>

<style scoped>
.container {

}

.container_1 {
  /*border:1px solid aqua;*/
  /*background-image: url("../../static/userBack.png");*/
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 50px;
  position: relative;
}

.container_2 {
  /*border: 2px solid red;*/
  display: flex;
  align-items: center;
  justify-content: center;
}

.cycle {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background: url("../../static/img_1.png") no-repeat;
  background-size: 100% 100%;
}

.text1 {
  margin-left: 20px;
  color: white;
  font: 15px Georgia, "Times New Roman", Times, serif;
}

.img {
  position: absolute;
  z-index: -1;
}

.container_3 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.text2 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  display: flex;
  /*border: 1px solid red;*/
  align-items: center;
  flex-direction: column;
}

.columeLine {
  border-left: 2px solid rgba(0, 0, 0, 0.1);
  height: 20px;
}

.container_4 {
  /*border: 1px solid red;*/
  padding-top: 10px;
}

.text3 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}

.container_5 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.text4 {
  /*border: 1px solid coral;*/
  width: 20%;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.img1 {
  height: 30px;
  width: 30px;
}

.text5 {
  margin-top: 5px;
  font: 15px Georgia, "Times New Roman", Times, serif;
}

.text6 {
  margin-left: 20px;
  color: white;
  font: 15px Georgia, "Times New Roman", Times, serif;
}
</style>
