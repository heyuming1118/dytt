<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll"; 

export default {
  name:"scoller",
  props:{
    handleToScroll:{
      type:Function,
      default:function(){}
    },
    handleToTouchEnd:{
      type:Function,
      default:function(){}
    }
  },
  mounted(){
    var scroll=new BScroll(this.$refs.wrapper,{
            tap:true,   //tap触发开关
            probeType:1,  //1节流
            click:true   //允许router-link生效
          });
          scroll.on("scroll",(pos)=>{
            this.handleToScroll(pos)
          });
          scroll.on("touchEnd",(pos)=>{
            this.handleToTouchEnd(pos)
          });
  }
}
</script>
<style scoped>
.wrapper{height: 100%;}
</style>