<template>
  <view class="container">
    <view class="text1">
      完善个人资料
    </view>

    <view class="container_1">

      <view class="text2">
        <view v-if="!isChange">
          姓名：{{ oldPeople.old_name }}
        </view>
        <view v-else style="display: flex;">
          姓名：
          <form>
            <input class="input" v-model="oldPeople.old_name"
                   style="border: 1px solid rgba(0,0,0,0.1)"/>

          </form>
        </view>
      </view>

      <view class="text2">
        <view v-if="!isChange">
          年龄：{{ oldPeople.old_age }}
        </view>
        <view v-else style="display: flex;">
          年龄：
          <form>
            <input class="input" v-model="oldPeople.old_age"
                   style="border: 1px solid rgba(0,0,0,0.1)"/>

          </form>
        </view>
      </view>

      <view class="text2">
        <view v-if="!isChange">
          性别：{{ oldPeople.old_gender }}
        </view>
        <view v-else style="display: flex;">
          性别：
          <view>
            <radio-group name="sex" @change="radioChange">
              <label>性别：</label>
              <label>
                <radio value="男" :checked="oldPeople.old_gender==='男'"/>
                <text>男</text>
                <radio value="女" :checked="oldPeople.old_gender==='女'"/>
                <text>女</text>
              </label>
            </radio-group>
          </view>
        </view>
      </view>

      <view class="text2">
        <view v-if="!isChange">
          电话：{{ oldPeople.old_phone }}
        </view>
        <view v-else style="display: flex;">
          电话：
          <form>
            <input class="input" v-model="oldPeople.old_phone"
                   style="border: 1px solid rgba(0,0,0,0.1)"/>
          </form>
        </view>
      </view>

      <view class="text2">
        <view v-if="!isChange">
          家庭住址：{{ oldPeople.old_address }}
        </view>
        <view v-else style="display: flex;">
          家庭住址：
          <form>
            <input class="input" v-model="oldPeople.old_address"
                   style="border: 1px solid rgba(0,0,0,0.1)"/>
          </form>
        </view>
      </view>

    </view>
    <view class="text2">
      <view v-if="!isChange">
        不舒服区域：{{ oldPeople.old_uncomfortable_area }}
      </view>
      <view v-else style="display: flex;">
        不舒服区域：
        <form>
          <input class="input" v-model="oldPeople.old_uncomfortable_area"
                 style="border: 1px solid rgba(0,0,0,0.1)"/>
        </form>
      </view>

    </view>
    <view class="text2">
      <view v-if="!isChange">
        详细描述：{{ oldPeople.old_information_description }}
      </view>
      <view v-else style="display: flex;">
        详细描述：
        <form>
          <input class="input" v-model="oldPeople.old_information_description"
                 style="border: 1px solid rgba(0,0,0,0.1)"/>
        </form>
      </view>
    </view>

    <view class="container_2">
      <button class="text3" @click="changeStatus">
        <view v-if="!isChange">
          修改信息
        </view>
        <view v-else>
          确认修改
        </view>
      </button>
    </view>

  </view>
</template>

<script setup>
import store from "../../store";
import {onMounted, reactive, ref} from "vue";
import {updatePeople} from "../../api/http";

let isChange = ref(false)

const changeStatus = () => {
  if (isChange.value) {
    changeInfo()
  }
  isChange.value = !isChange.value
}

const changeInfo = () => {
  uni.showModal({
    title: '确认修改',
    content: '你的信息将会被修改',
    success: function (res) {
      if (res.confirm) {
        oldPeople1.oldId =oldPeople.old_id
        oldPeople1.oldName =oldPeople.old_name
        oldPeople1.oldAge =oldPeople.old_age
        oldPeople1.oldGender =oldPeople.old_gender
        oldPeople1.oldAddress =oldPeople.old_address
        oldPeople1.oldPhone =oldPeople.old_phone
        oldPeople1.oldCreateTime=oldPeople.old_create_time
        oldPeople1.oldUncomfortableArea =oldPeople.old_uncomfortable_area
        oldPeople1.oldInformationDescription =oldPeople.old_information_description
        store.commit('setOld', oldPeople1)
        updatePeople();
        uni.navigateBack();

        uni.showToast({
          title: '修改成功',
          //将值设置为 success 或者直接不用写icon这个参数
          icon: 'success',
          //显示持续时间为 2秒
          duration: 2000
        })

      } else if (res.cancel) {
        console.log('用户点击取消');

      }
    }
  });
}


const oldPeople = reactive({
  old_id: '',
  old_name: '',
  old_age: '',
  old_gender: '',
  old_address: '',
  old_phone: '',
  old_create_time: '',
  old_uncomfortable_area: '',
  old_information_description: ''
})

const oldPeople1 = {
  oldId: '',
  oldName: '',
  oldAge: '',
  oldGender: '',
  oldAddress: '',
  oldPhone: '',
  oldCreateTime: '',
  oldUncomfortableArea: '',
  oldInformationDescription: ''
}

onMounted(() => {
  if (store.state.isLogin) {
    oldPeople.old_id = store.state.user.old_id
    oldPeople.old_name = store.state.user.old_name
    oldPeople.old_age = store.state.user.old_age
    oldPeople.old_gender = store.state.user.old_gender
    oldPeople.old_address = store.state.user.old_address
    oldPeople.old_phone = store.state.user.old_phone
    oldPeople.old_create_time = store.state.user.old_create_time
    oldPeople.old_uncomfortable_area = store.state.user.old_uncomfortable_area
    oldPeople.old_information_description = store.state.user.old_information_description
  }
})

const radioChange = (value) => {
  oldPeople.old_gender = value.detail.value
}

</script>

<style scoped>
.container {
  padding: 20px;
  /*width: 100%;*/

}

.text1 {
  font: 15px Georgia, "Times New Roman", Times, serif;

}

.text2 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
  /*border: 1px solid red;*/
}

.text3 {
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font: 15px Georgia, "Times New Roman", Times, serif;
}

.container_1 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /*border: 1px solid aqua;*/
  flex-direction: column;
}

.container_2 {
  display: flex;
  justify-content: center;
  align-items: center;
  /*border: 1px solid aqua;*/
  flex-direction: column;

  margin-top: 20px;

}

.input {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 13px;
}
</style>
