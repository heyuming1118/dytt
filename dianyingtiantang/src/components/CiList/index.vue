<template>
  <div>
   <Header title="影院地址"></Header>
     <div class="box" ref="box">
       <Loading v-if="isLoading"/>
       <Scroller v-else>
      <ul>
          <li class="box-li " v-for="item in cinemaList" :key="item.id">
            <div>
              <h4 class="margin title">{{item.nm}}</h4>
              <p class="margin"><span class="color-red">{{item.sellPrice}}</span><span  class="font">元起</span></p>
            </div>
            <div class="font">
              <span>{{item.addr}}</span>
              <span class="margin-left">{{item.distance}}</span>
            </div>
            <ul class="label">
              <li v-for="(card,key) in item.tag" :key="key" v-show="card===1">{{key | formatCard}}</li>
              </ul>
            </li>
          </ul>
          </Scroller>
      </div>
        <router-link class="btn" to="movieList/nowPlay">返回</router-link>
    
   <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// import BScroll from 'better-scroll'
export default {
  name:"ciList",
  components: {
   Header,
   Footer
  },
  data(){
    return {
      cinemaList:[],
      isLoading:true,
      prevCityId:-1
    }
  },
  
  activated(){
    var cityId = this.$store.state.city.id;
    if (this.prevCityId === cityId) {return;}
    this.isLoading = true;
    this.axios.get("/api/cinemaList?cityId=" + cityId).then((res)=>{
      // console.log(res)
      var msg = res.data.msg;
      if(msg === "ok"){
        this.isLoading = false;
        this.cinemaList = res.data.data.cinemas;
        // window.localStorage.setItem()
        this.prevCityId = cityId;
      }
    })
  },
  filters: {
    formatCard(key){
      var card = [
        // {key:"allwRefund",value:"退票"},
        {key:"endorse",value:"改签"},
        {key:"sell",value:"优惠卷"},
        {key:"snack",value:"小吃"}
      ];
      for(var i = 0 ; i < card.length; i ++){
        if(card[i].key === key){
          return card[i].value;
        }
      }
      return "";
    }
  },
}
</script>
<style scoped>
 .box{position: relative;top: 0px;height: 520px;}
 .box-li{
   border-bottom:1px solid #740f0f;
   padding:5px;
 }
 .margin{margin:5px 0;}
 .title{font-size: 18px}
 .font{font-size: 14px;color:#666}
 .color-red{color:rgb(228, 58, 28)}
 .margin-left{position: absolute;right: 3px;}
 .label{display: flex;}
 .label>li{
   border:1px solid rgb(235, 231, 11);
   border-radius: 5px;
   padding: 2px;
   color: rgb(235, 131, 11);
   margin-left: 3px;
   margin-top: 3px;
   }
   .btn{
     position: fixed;
     top: 0px;
     display: block;
     height: 40px;
     width: 60px;
     z-index: 1000;
     /* border:1px solid #fff; */
     text-align: center;
     line-height: 40px;
     background: rgb(69, 165, 230);
     color: antiquewhite;
     font-size: 18px;
     }
</style>