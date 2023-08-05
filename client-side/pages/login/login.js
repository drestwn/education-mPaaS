const app = getApp()

Page({
  data: {
    agreementModal: false,
    website:"https://www.google.com"
  },
  onLoad() {
    
   },
  onShow() {
    // if (my.getStorageSync({ key: "accessToken" })) {
    //   my.switchTab({
    //     url: "/pages/tabBar/home-screen/home-screen"
    //   })
    // }

  },
  submitHandler(e) {
    let { email, password } = e.detail.value

    my.httpRequest({
      url: app.globalData.address + '/login/admin',
      headers: {},
      method: 'post',
      data: {
        email,
        password
      },
      timeout: 30000,
      dataType: "JSON",
      success: (result) => {

        my.setStorageSync({ key: "accessToken", data: result.data.access_token })
        my.setStorageSync({ key: "refreshToken", data: result.data.refreshToken })

        app.globalData.email = result.data.email

        my.switchTab({
          url: '/pages/tabBar/home-screen/home-screen'
        })


      },
      fail: (error) => {
        console.log(error);
        this.setData({ error: { message: error.data.error, status: true } })
      },
      complete: (result) => {

      }
    });


  },
  handleCloseToast() {
    this.setData({ error: { ...this.data.error, status: false } })
  },
  toWebsite(e){
    let page= this.data. website
    my.navigateTo({
      url: "/pages/webview-menu/webview-menu?page=" + page
    })
    console.log("yea")
  }

});
