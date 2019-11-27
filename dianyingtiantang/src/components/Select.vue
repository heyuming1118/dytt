<template>
  <div id="select">
    <van-search placeholder="请输入搜索关键词" v-model="message" />
    <p class="font margin">影片/主演/剧情</p>
    <hr>
    <div class="flex border-bottom margin-bottom" v-for="item in moviesList" :key="item.id">
      <img class=" img-wh" :src="item.img | setWH('118.160')">
      <div class="flex-big">
        <strong class="font-title">{{item.nm}}</strong>
         <p class="font">{{item.enm}}</p>
        <p class="font">观影评分：{{item.sc}}</p>
        <p class="font">剧情：{{item.cat}}</p>
        <p class="font">上映日期：{{item.rt}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'Select',
  data(){
    return {
      message:"",
      moviesList:[]
    }
  },
  methods:{
      //axios请求防抖
    canerlRequest(){
      if(typeof this.source === "function"){
        this.source("终止请求")
      }
    }
  },
  watch:{
    message(newVal){
      //调用方法
      this.canerlRequest();

      this.axios.get("/api/searchList?cityId=10&kw=" + newVal,{
        //请求终止的方法
        cancelToken:new this.axios.CancelToken((c)=>{
          // console.log("防抖了嘛？")
          this.source = c;
        })
      }).then((res)=>{
        // console.log(res)
        var msg = res.data.msg;
        var movies = res.data.data.movies;
        if(msg && movies){
          this.moviesList = res.data.data.movies.list
        }
      }).catch((err)=>{
        if(this.axios.isCancel(err)){
          console.log("没有找到相关电影",err.message);
        }else{
          console.log(err)
        }
      })
    }
  }
}
</script>
<style scoped>
 #select{
  position: relative;
  top: 50px;
 } 
 .flex{ display: flex; }
 .border-bottom{border-bottom: 0.5px solid #eee;}
 .margin-bottom{margin-bottom: 15px;}
 .flex-small{flex: 0.5;}
 .img-wh{height: 120px; width: 78px;}
 .flex-big{flex: 1;}
 .font-title{color:#323;margin:5px;font-size: 18px;}
 .font{margin:5px;color:#666;font-size: 14px;}
 .margin{
   margin-left: 20px;
 }
</style>