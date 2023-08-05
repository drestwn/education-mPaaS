const app = getApp()

Page({
  data: {
    listCategory: [],
    categoryId: 0
  },
  onLoad() {
    // return new Promise((resolve, reject) => {

    my.httpRequest({
      url: app.globalData.address + "/category",
      method: "Get",
      dataType: "json",
      timeout: 30000,
      success: (result) => {
        console.log(result.data.response, 'cat')
        this.setData({
          listCategory: result.data.response
        })
      },
      error: (error) => {
        console.log(error);
        this.setData({ error: { message: error.data.error, status: true } })
      },
      complete: () => {

      }
      // })

    })
    console.log(this.listCategory, 'ini2')

  },
  bindObjPickerChange(e) {
    console.log('picker2', e.detail.value);
    this.setData({

      categoryId: e.detail.value,
    });
  },
  submitHandler(e) {
    let { name,
      description,
      price,
      mainImg, imgUrl } = e.detail.value
    const categoryId = this.data.categoryId
    return new Promise((resolve, reject) => {

      my.httpRequest({
        url: app.globalData.address + "/createproduct",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access_token": my.getStorageSync({
            key: "accessToken"
          }).data
        },
        data: {
          name,
          description,
          price,
          mainImg,
          categoryId,
          imgUrl,
        },
        dataType: "json",
        timeout: 30000,
        success: (result) => {
          console.log(result)


        },
        error: (error) => {
          console.log(error);
          this.setData({ error: { message: error.data.error, status: true } })
        },
        complete: () => {

        }
      })
    })
  },
  handleCloseToast() {
    this.setData({ error: { ...this.data.error, status: false } })
  }
})