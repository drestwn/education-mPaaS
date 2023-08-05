const app = getApp()
Page({
  data: {
    listUsers: [],
    usermodal: false,
    isLoading: false
  },
  onLoad() {
    this.setData({
      isLoading: true
    })
    let {
      screenHeight,
      screenWidth
    } = my.getSystemInfoSync()

    this.setData({
      screenHeight,
      screenWidth
    })

    this.getUserData()

  },
  onShow() {
    this.setData({
      isLoading: false
    })
  },
  getUserData() {
    
    my.request({
      url: app.globalData.addressUser + "/users/?limit=10",
      method: "get",
      dataType: "json",
      success: (res) => {
        console.log(res.data.users)
        this.setData({
          listUsers: res.data.users
        })
      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {
        my.hideLoading();

      }
    })
  },
  getUserDetail(e) {
    console.log('detail')
    let {
      id
    } = e.currentTarget.dataset
    console.log(id, 'detailid')
    my.navigateTo({
      url: "/pages/detail/detail?id=" + id
    })

  },
  handleCloseToast() {
    this.setData({ error: { ...this.data.error, status: false } })
  }
});
