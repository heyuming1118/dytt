<template>
  <div class="MovieList">
    <Header title="附近影院"></Header>
      <ul class="tabbar">
        <router-link tag="li" to="/movieList/city">{{ $store.state.city.nm}}</router-link>
        <router-link tag="li" to="/movieList/nowPlay">正在热映</router-link>
        <router-link tag="li" to="/movieList/morrow">即将上映</router-link>
        <router-link tag="li" to="/movieList/select">
          搜索
          </router-link>
      </ul>
     <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'movieList',
  components: {
   Header,
   Footer,
  }
}
</script>
<style scoped>

.tabbar{
  height: 40px;
  width: 100%;
  list-style: none;
  display: flex;
  position: fixed;
  top: 40px;
  z-index: 999;
  justify-content: space-around;
  padding-left: 0;
  border-bottom: 0.5px solid #cc0099;
  color: #666;
  background-color: #fff;
}
.tabbar li{
  flex:1;
  text-align: center;
  margin-top: 10px;
}
.tabbar li.router-link-active{
    color: #cc0099;
    border-bottom: 2px solid #cc6699;
  }
</style>