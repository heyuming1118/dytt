module.exports =  {
  devServer:{ //开发环境的配置
    proxy :{  //反向代理
      '/api':{//代理接口
        target:'http://39.97.33.178',//代理目标
        changeOrigin:true   //是否改变反向代理的地址
      }
    }
  }
}