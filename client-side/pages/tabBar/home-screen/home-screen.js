const app = getApp()
Page({
  data: {
    listProducts: []
  },
  onLoad() {
    if (!my.getStorageSync({ key: "accessToken" })) {
      my.navigateTo({
        url: "/pages/login/login"
      })
    }
  
    let {
      screenHeight,
      screenWidth
    } = my.getSystemInfoSync()

    this.setData({
      screenHeight,
      screenWidth
    })

    this.getData()
  },
  onShow() {
  
    let token = my.getStorageSync({
      key: "accessToken"
    })

    if (!token) {
      my.navigateTo({
        url: "/pages/login/login"
      })

    }

  },
  getData() {
    my.request({
      url: app.globalData.address + "/product",
      method: "get",
      dataType: "json",
      success: (res) => {
        console.log(res)
        this.setData({
          listProducts: res.data
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
  deleteData(e) {
    console.log('delete')
    let {
      id
    } = e.currentTarget.dataset
    console.log(id)
    my.request({
      url: app.globalData.address + `/product/${id}`,
      method: "DELETE",
      dataType: "json",
      headers: {
        "access_token": my.getStorageSync({
          key: "accessToken"
        }).data
      },
      success: (res) => {
        my.showToast({
          type: 'none',
          content: "Data has been deleted",
          duration: 2000,
          success: () => {
            this.getData()
          },
          fail: () => {

          },
          complete: () => {

          }
        });

      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {
        my.hideLoading();

      }
    })
  },
  logOut(){
    my.clearStorageSync();
    my.navigateTo({url:"/pages/login/login"})

  }
});
