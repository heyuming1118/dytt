<template>
  <div id="morrow">
    <Loading v-if="isLoding"/>
    <Scroller v-else>
      <ul>
          <li class="flex border-bottom margin-bottom" v-for="item in comingList" :key="item.id">
          <img class="img-wh" :src="item.img | setWH('128.160')">
          <div class="flex-big">
            <strong class="font-title">{{item.nm}}</strong>
            <p class="font"><span>{{item.wish}}</span>人想看</p>
            <p class="font">主演：<span>{{item.star}}</span></p>
            <p class="font">播放日期：{{item.rt}}</p>
          </div>
          <div class="flex-small">
            <router-link tag="p" to="" class="button">
               预定
               </router-link>
            </div>
        </li>
      </ul>
        
    </Scroller>
    
  </div>
</template>
<script>
export default {
  name:"morrow",
  data(){
    return {
      comingList:[],
      isLoding:true
    }
  },
  activated(){
    var cityId = this.$store.state.city.id;
    if (this.prevCityId === cityId){return;}
    this.isLoading = true;
    this.axios.get("/api/movieComingList?cityId="+cityId).then((res)=>{
      console.log(res)
      var msg = res.data.msg;
      if(msg === "ok"){
        this.isLoding = false;
        this.comingList = res.data.data.comingList;
        this.prevCityId = cityId;
      }
    })
  }
}
</script>
<style scoped>
 #morrow{
  position: relative;top: 42px;height: 520px;
 }   
.flex{ display: flex; }
 .border-bottom{border-bottom: 0.5px solid #eee;}
 .margin-bottom{margin-bottom: 15px;}
 .img-wh{height: 120px; width: 78px;}
 .flex-small{flex: 0.5;}
 .flex-big{flex: 1;}
 .font-title{color:#323;margin:5px;font-size: 18px;}
 .font{margin:5px;color:#666;font-size: 14px;}
 .button{
   width: 60px; height: 40px;
   border:1px solid #5500ff;
   border-radius: 15px;
   line-height: 40px;
   text-align: center;
   font: 18px;
   color:#fff;
   background-color: #5500ff;
   }
   .button .router-link-active{background-color: aliceblue;color:#000;}
</style>