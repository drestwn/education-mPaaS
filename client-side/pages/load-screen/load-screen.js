Page({
  data: {},
  onLoad() {

  },
  onShow() {

    // if(!my.getStorageSync({key:"accessToken"})){
    setTimeout(() => {

      // my.switchTab({ url: "/pages/tabBar/home-screen/home-screen" })
      my.navigateTo({url:'/pages/login/login'})

    }, 2000);

  },
  
});
