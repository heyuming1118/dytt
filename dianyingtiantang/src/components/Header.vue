<template>
  <div class="header">
    <strong class="title">{{title}}</strong>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props:{
    title:{
      type:String,
      default:"电影天堂"
    }
  }
}
</script>
<style scoped>
  .header{
    width: 100%;
    height: 40px;
    background:rgb(255,20,147);
    text-align: center;
    line-height: 35px;
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .title{
    font: 18px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
    color: blanchedalmond;
  }
</style>