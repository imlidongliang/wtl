const app = getApp();
const globalData = app.globalData
const title = globalData.title || "无它旅"

Component({
  data: {
    system: 'ios',
    statusBarHeight: '20px',
    paddingRight: '93px',
    width: '',
    justifyContent: ''
  },
  properties: {
    title: {
      type: String,
      value: title
    },
    loading: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    show: {
      type: Boolean,
      value: true
    },
    back: {
      type: Boolean,
      value: false
    },
    textAlign: {
      type: String,
      value: ''
    },
    loadingSize: {
      type: String,
      value: ''
    },
    loadingPosition: {
      type: String,
      default: ''
    }
  },
  options: {
    addGlobalClass: true,
  },
  methods: {
    setStyle() {
      const that = this
      console.log(this.data.show)
      wx.getSystemInfo({
        success(res) {
          const statusBarHeight = res.statusBarHeight
          const width = res.safeArea.width
          let menuBtnInfo = wx.getMenuButtonBoundingClientRect()
          const pattern = /ios/ig
          const system = !!(res.system).match(pattern) ? 'ios' : 'android'
          const paddingRight = menuBtnInfo.width + (width - menuBtnInfo.right)
          const textAlign = that.data.textAlign
          let loadingPosition = that.data.loadingPosition

          const justifyContent = textAlign == 'left' ? 'flex-start' : (textAlign == 'right' ? 'flex-end' : 'center')
          loadingPosition = loadingPosition == 'right' || (that.data.back && justifyContent == 'flex-start') ? '1' : ''

          that.setData({
            system: system,
            statusBarHeight: statusBarHeight + 'px',
            paddingRight: paddingRight + 'px',
            width: width - paddingRight + 'px',
            justifyContent: justifyContent,
            loadingPosition: loadingPosition
          })
        }
      })
    },

    back: function () {
      wx.navigateBack({
        delta: 1
      })

    },
  },
  attached() {
    this.setStyle()
  }
})