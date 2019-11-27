<template>
  <div class="home">
    <Header title="电影天堂"></Header>
        <van-swipe :autoplay="3000" style="height:180px">
          <van-swipe-item>
            <img class="show" src="../../public/image/1.jpg">
          </van-swipe-item>
          <van-swipe-item>
            <img class="show" src="../../public/image/2.jpg">
          </van-swipe-item>
          <van-swipe-item>
            <img class="show" src="../../public/image/3.jpg">
          </van-swipe-item>
          <van-swipe-item>
            <img class="show" src="../../public/image/0.jpg">
          </van-swipe-item>
          <!-- <van-swipe-item v-for="(image, index) of images" :key="index">
          <img v-lazy="image" /> 
          </van-swipe-item>-->
        </van-swipe>
     <div class="hr"><p>高分电影</p></div>
     <div class="movie">
       <div class="movie-list">
         <div><img src="../../public/image/555.jpg"></div>
         <p class="font-style">撒娇女人最好命</p>
         <p class="font-style font-small">周迅学撒娇搞定pidfadhfuaugfuugdgfgafasgu</p>
       </div>
     </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
   Header,
   Footer
  },
  data(){
    return {
      images:[
      ]
    }
  }
}
</script>
<style scoped>
.show{height: 180px;width: 100%;}
.movie{display: flex; flex-wrap: wrap;padding: 3px;}
.movie-list{width:30%;margin:5px;}
.movie-list img{  width: 100%;border-radius: 5px;}
.hr{font-size: 22px;color: darkred;border-left: 2px solid cyan;} 
.font-style{font-size: 14px;margin:5px;}
.font-small{font-size:12px;color: #666;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
  
  


</style>
