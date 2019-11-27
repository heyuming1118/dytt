<template>
<div>
  <div class="city" ref="city_list">
    <Loading v-if="isLoading"/>
    <Scroller>
   <div id="city-list" ref="city_list">
    <div class="city-hot">
      <h4 class="bg-color">热门城市</h4>
      <ul class="clearfix">
        <li class="bg-color font-color" v-for='item in hotList' :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
      </ul>
    </div>
    <div class="city-sort" ref="city_sort">
      <div v-for="item in cityList" :key="item.index">
        <h4 class="bg-color">{{item.index}}</h4>
        <ul class="clearfix bg-ul-color">
          <li class="bg-color font-color font-li-color"  v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}</li>
        </ul>
      </div>
    </div>
  </div>
  </Scroller>
  </div>
  <div class="index">
      <ul>
        <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}} </li>
      </ul>
    </div>
</div>  
</template>
<script>
// import BScroll from 'better-scroll'

export default {
  name:"ctiy",
  data(){
    return {
      cityList:[],
      hotList:[],
      isLoading:true
    }
  },
  mounted(){
    //如果本地有保存数据，就用本地的数据
    var cityList = window.localStorage.getItem("cityList")
    var hotList = window.localStorage.getItem("hotList")
    if(cityList && hotList){
      this.cityList = JSON.parse(cityList) ;
      this.hotList = JSON.parse(hotList) ;
      this.isLoading = false;
    }else{
      //否则就重新发送请求
    this.axios.get('/api/cityList').then((res)=>{
      var msg = res.data.msg;
      if(msg === 'ok'){
        this.isLoading = false;
        var cities = res.data.data.cities;
        //[{index:'A',list:[{nm:'阿城',id:23}]}]
        var {cityList,hotList}=this.fromaCityList(cities)
        this.cityList = cityList;
        this.hotList = hotList;
        window.localStorage.setItem("cityList",JSON.stringify(cityList));
        window.localStorage.setItem("hotList",JSON.stringify(hotList))
      }
    })
    };
  },
  methods:{
    // 切换城市点击事件
    handleToCity(nm,id){
      this.$store.commit('city/CITY_INFO', {nm,id});
      window.localStorage.setItem("nowNM",nm);
      window.localStorage.setItem("nowId",id);
      this.$router.push("/movieList/NowPlay")
    },

    fromaCityList(cities){
      var cityList = [];
      var  hotList = [];
      //热门城市
      for(var i=0;i<cities.length;i++){
        if(cities[i].isHot===1){
          hotList.push(cities[i]);
        }
      }
      // console.log(hotList)
      for (var i=0;i<cities.length;i++){
        var firstLetter = cities[i].py.substring(0,1).toUpperCase();
        if(toCom(firstLetter)){//新添加
          cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
          // console.log(cityList)
        }else{//累加
          for(var j = 0;j<cityList.length;j++){
            if(cityList[j].index === firstLetter){
              cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
            }
          }
        }
      };
      cityList.sort((n1,n2)=>{
        if(n1.index > n2.index){
          return 1
        }else if(n1.index < n2.index){
          return -1
        }
      })
    function toCom(firstLetter){
      for(var i = 0;i<cityList.length;i++){
        if(cityList[i].index === firstLetter){
          return false
        }
      }
      return true;
    };
    // console.log(hotList)
    return {cityList,hotList}
    },
    //导航栏点击事件
   handleToIndex(e){
      this.$nextTick(()=>{
        var h4 = this.$refs.city_sort.getElementsByTagName("h4");
        // this.$refs.city_list.toScrollTop (-h4[e].offsetTop) ;
        // console.log(this.$refs.city_list.toScrollTop)
      })
      
      
   }
  }
}
</script>
<style scoped>
.city{height: 545px;}
#city-list{
  width: 95%;
  position: relative;
  /* top: 100px; */
}
.city-hot{
  height: 150px;
  border-bottom:0.5px solid #cc0099;
  background-image: url("../../public/image/4.jpg");
  background-size: cover;
  margin-top: 37px;
}
.bg-color{
  background-color: cadetblue;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color:#fee;
  
}
.clearfix{display: flex; flex-wrap: wrap; justify-content: space-around;}
.font-color{
  margin-top: 2px;
  width: 80px;
  background:rgba(0,0,0,0);
  border:1px solid rgb(247, 151, 8);
  color:#ddd;
}  
.font-color:hover{background:rgba(247, 151, 8, 0.4) ;}
.font-li-color{color:#000;}
.bg-ul-color{background:rgba(201, 197, 212,0.3);border-radius: 5px;}
.index{position: fixed;top: 12%; right: 0;width: 5%;text-align: center;}
.index li{
  margin-top:3px; 
}
.index li:hover{
  background-color: #16ec33;
  border-radius: 10px;
  color: rgb(233, 121, 16);
}
</style>