Component({
  data: {},
  properties: {},
  externalClasses: ['tag-class'],
  methods: {
    follow() {
      console.log('收藏')
      wx.showToast({
        title: '收藏',
        icon: 'none',
        duration: 2000
      })
    },
    toCommentPage() {
      console.log('评论页')
      wx.showToast({
        title: '评论页',
        icon: 'none',
        duration: 2000
      })
    },
    share() {
      console.log('分享')
      wx.showToast({
        title: '分享',
        icon: 'none',
        duration: 2000
      })
    }
  },

  attached() {
    console.log(1)
  }
})