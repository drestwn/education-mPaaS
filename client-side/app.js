import jwtDecode  from "jwt-decode" 
App({
  globalData:{
    accessToken: "",
    address: "http://localhost:3000",
    addressUser:"https://dummyjson.com"
  },
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    my.showToast({
      url:"/pages/load-screen/load-screen"
    })
  },
  onLoad(){
    my.navigateTo({
      url:"/pages/login/login"
    })
    
  },
  onShow(options) {
    my.navigateTo({
      url:"/pages/load-screen/load-screen"
    })
    if (my.getStorageSync({ key: "accessToken" })) {
      my.switchTab({
        url: "/pages/tabBar/home-screen/home-screen"
      })
    }
    
  },
  refreshAccessToken(){
    return new Promise((resolve,reject) =>{

      let decoded = jwtDecode(my.getStorageSync({key:"accessToken"}).data)
    
      if(decoded.exp < Date.now()/1000){
        //IF THE ACCESSTOKEN EXPIRED, THIS CODE EXECUTE
        console.log("expired");

        my.httpRequest({
          url:  this.globalData.address + "/refreshaccesstoken",
          method:"GET",
          headers:{
            refresh_token: my.getStorageSync({key:"refreshToken"}).data,
            "content-type":"application/json",
            'ngrok-skip-browser-warning': 'true',

          },
          dataType:"JSON",
          timeout: 30000,
          success: (result)=>{
            //IF THE ACCESSTOKEN SUCCESSFULLY RENEWED, THIS CODE RUN
            console.log(" refresh token success");            
            my.setStorageSync({"key":"accessToken", data:result.data.accessToken})
            resolve("refreshed")
          },
          fail: (error) =>{
     
            my.showToast({
              content: error.data.message
            });
            reject(error)
          },
          complete:(result) =>{
  
          }
        })

      }else{
        console.log("refresh token still valid");
        resolve("fresh")
      }
    })
  }
})
