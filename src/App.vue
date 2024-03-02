<script>
import {getOldPeopleById} from "./api/http";

export default {

  onLaunch: function () {
    uni.getStorage({
      key: 'old_id',
      success: function (res) {

        getOldPeopleById(res.data,0)
      },
      fail:function (){
        console.log("未登录")
      }
    });
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}

</script>

<style>
/*每个页面公共css */
page{
  height: 100%;
  width: 100%;
  margin:0;
}

</style>
