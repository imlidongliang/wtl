

Component({
  externalClasses: ['tag-class'],
  data: {},
  properties: {
    placeholder: {
      type: String,
      value: "目的地/关键词"
    }
  },
  methods: {
    toSearchPage: function () {
      wx.navigateTo({
        url: '/pages/search/search',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(data) {
            console.log(data)
          },
          someEvent: function(data) {
            console.log(data)
          }
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  }
})