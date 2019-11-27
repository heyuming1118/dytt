<template>
  <div class="footer">
    <ul>
      <router-link tag="li" to="/Home">
        <i class="iconfont icon-liebiaodaohang_yingshi"></i>
        <p>电影</p>
      </router-link>
      <router-link tag="li" to="/movieList">
      <i class="iconfont icon-huaban-"></i>
        <p>影院</p>
      </router-link>
      <router-link tag="li" to="/personal">
        <i class="iconfont icon-gerenzhongxin"></i>
        <p>我的</p>
      </router-link>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'Footer',
  components: {
   
  }
}
</script>
<style scoped>
 .footer{
   width: 100%;
   height: 60px;
   position: fixed;
   bottom: 0;
   left: 0;
 }
  .footer ul{
    display: flex;
    list-style: none;
    padding-left: 0;
    background-color: aliceblue;
    border-top: 1px solid #cc0099;
    padding: 5px;
  }
  .footer ul li{
    flex: 1;
    text-align: center;
  }
  .footer ul li.router-link-active{
    color: #cc0099;
  }
  .footer ul li p{
    font-size: 14px;
    margin-top: 5px;
  }
</style>