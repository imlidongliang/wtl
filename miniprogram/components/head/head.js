Component({
  data: {
    statusBarHeight: '20px',
    titleHeight: '40px'
  },
  properties: {
    title: {
      type: String,
      value: ""
    },
    back: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    back: function () {
      wx.navigateBack({
        delta: 1
      })
      
    },
     setToolBar: function () {
      const that = this
      wx.getSystemInfo({
        success (res) {
          console.log(res)
          const statusBarHeight =  res.statusBarHeight
          let menuBtnInfo = wx.getMenuButtonBoundingClientRect()
          const top = menuBtnInfo.top
          const paddingY = top - statusBarHeight
          const titleHeight =  menuBtnInfo.height +( paddingY * 2)

          console.log(menuBtnInfo, titleHeight, paddingY)
          
          that.setData({
            statusBarHeight: statusBarHeight + 'px',
            titleHeight: titleHeight + 'px'
          })
        }
      })
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setToolBar()
    }
  }
})