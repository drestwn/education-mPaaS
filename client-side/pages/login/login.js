const app = getApp()

Page({
  data: {
    agreementModal: false
  },
  onLoad() {
    if (!my.getStorageSync({ key: "accessToken" })) {
      my.navigateTo({
        url: "/pages/load-screen/load-screen"
      })
    }
   },
  onShow() {
    if (!my.getStorageSync({ key: "accessToken" })) {
      my.navigateTo({
        url: "/pages/load-screen/load-screen"
      })
    }

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

        app.globalData.username = result.data.username

        my.switchTab({
          url: '/pages/tabBar/home-screen/home-screen'
        })


      },
      fail: (error) => {
        console.log(error);
        this.setData({ error: { message: error.data.message, status: true } })

      },
      complete: (result) => {

      }
    });


  },
  handleCloseToast() {
    this.setData({ error: { ...this.data.error, status: false } })
  }

});
