Page({
  data: {},
  onLoad() {

  },
  onShow() {

    setTimeout(() => {
      // if(my.getStorageSync({key:"accessToken"})){
      //   my.switchTab({
      //     url: '/pages/tabBar/home-screen/home-screen'
      //   });
      // }else{
        my.navigateTo({url:"/pages/login/login"})
      // }
  }, 2000);
  },

});
