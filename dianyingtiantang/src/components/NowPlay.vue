<template>
<!-- <div id="now_play"> -->
  <div id="now-play" ref="now_play">
    <Loading v-if="isLoading" />
    <Scroller v-else :handleToScroll="handleToScroll"
    :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="por-down">{{pullDownMsg}}</li>
        <li class="flex border-bottom margin-bottom" v-for="item of movieList" :key="item.id">
        <img class=" img-wh" :src="item.img | setWH('118.160')" @tap="handleToDetail">
        <div class="flex-big">
          <strong class="font-title">{{item.nm}}</strong>
          <p class="font">观影评分：<span>{{item.sc}}</span></p>
          <p class="font">主演：<span>{{item.star}}</span></p>
          <p class="font">{{item.showInfo}}</p>
        </div>
        <div class="flex-small">
            <router-link class="button" tag="p" to="/ciList">购票
            </router-link>
            </div>
      </li>
      </ul>
    </Scroller>
  </div>
<!-- </div> -->
</template>

<script>
//移动端按动事件库
// import BScroll from "better-scroll"; 

export default {
  name:"nowPlay",
  data(){
    return {
      movieList:[],
      pullDownMsg:"",
      isLoading:true,
      prevCityId:-1
    }
  },
  //挂载后请求数据
  activated () {
    var cityId = this.$store.state.city.id;
    if (this.prevCityId === cityId){return;}
    this.isLoading = true;
    this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
       //console.log(res)
      var msg = res.data.msg;
      if(msg==="ok"){
        this.isLoading = false;
        this.movieList = res.data.data.movieList;
        this.prevCityId = cityId
        // console.log(msg)
        // this.$nextTick(()=>{
        //  var scroll=new BScroll(this.$refs.now_play,{
        //     tap:true,   //tap触发开关
        //     probeType:1  //1节流
        //   });

        //   scroll.on('scroll',(pos)=>{
        //     // console.log(222)
        //     if(pos.y>30){
        //       this.pullDownMsg='刷新中'
        //     }
        //   });

        //   scroll.on('touchEnd',(pos)=>{
        //     // console.log(333)
        //     this.axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
        //       var msg = res.data.msg;
        //       if(msg==='ok'){
        //         this.pullDownMsg='已经刷新';
        //         setTimeout(()=>{
        //           this.movieList = res.data.data.movieList;
        //           this.pullDownMsg=''
        //         },1000)
            //   }
            // });
          // })
        // });
        
      }
    })
  },
  methods:{
    handleToDetail(){
      console.log(111)
    },
    handleToScroll(pos){
      if(pos.y>30){
        this.pullDownMsg="正在更新中";
      }
    },
    handleToTouchEnd(pos){
      if(pos.y>30){
        this.axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
              var msg = res.data.msg;
              if(msg==='ok'){
                this.pullDownMsg='已经更新';
                setTimeout(()=>{
                  this.movieList = res.data.data.movieList;
                  this.pullDownMsg=''
                },1000)
              }
            });
      }
    }
  }
}
</script>
<style scoped>
 #now-play{ position: relative;top: 42px;height: 520px;} 
 .flex{ display: flex; }
 .border-bottom{border-bottom: 0.5px solid #eee;}
 .margin-bottom{margin-bottom: 15px;}
 .flex-small{flex: 0.5;}
 .img-wh{height: 120px; width: 78px;}
 .flex-big{flex: 1;}
 .font-title{color:#323;margin:5px;font-size: 18px;}
 .font{margin:5px;color:#666;font-size: 14px;}
 .button{
   width: 60px; height: 40px;
   border:1px solid #cc0099;
   border-radius: 15px;
   line-height: 40px;
   text-align: center;
   font: 18px;
   color:#fff;
   background-color: #cc0099;
   }
   .button:active{background-color: aliceblue;color:#000;}
</style>