const app = getApp()
Page({
  data: {
    url: "",
    score: 0,
    webView: {},
    flag: false,
    flagFetch: false
  },
  onLoad(query) {
    this.setData({
      url: query.page
    })

    this.webViewContext = my.createWebViewContext("web-view-1")

  },
  onMessage(e) {
    let {
      message,
      score
    } = e.detail

    if (message == "Loading data") {

      if (!this.data.flagFetch) {
        console.log(e);
        app.refreshAccessToken()

          .then((result) => {

            this.webViewContext.postMessage({
              'sendToWebView': my.getStorageSync({
                key: "accessToken"
              }).data
            })

            this.setData({ flagFetch: true })
          })

          .catch((error) => {
            console.log(error);
            app.logOut()
          })
      }
    } else if (message == "Hello from game") {
      this.setData({
        score: score
      })

      app.refreshAccessToken()
        .then((result) => {
          this.webViewContext.postMessage({
            'sendToWebView': my.getStorageSync({
              key: "accessToken"
            }).data
          })
          this.setData({
            flag: true
          })
        })
        .catch((error) => {
          app.logOut()
        })



    }

  },


});