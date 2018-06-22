// pages/history/history.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "https://cn.bing.com/az/hprichbg/rb/WorldRefugeeDay_ZH-CN5421237644_1080x1920.jpg",
    history: [
      '在多数时候，我们所看到的都不是事物的本来面目。',
      '曲调很古老。节拍很缓慢。歌声悲壮苍凉。坦荡荡的旷野上缓慢地爬行着爷爷的歌声，空气因歌声而起伏，没散尽的雾也在动。',
      '据说纹身洗深了留疤，洗浅了留印，是不是就像刻苦铭心爱过又不得不被毁掉的爱情',
      '孤单时，仍要守护心中的思念，有阴影的地方，必定有光',
      '时间的沙漏沉淀着无法逃离的过往,记忆的双手总是拾起那些明媚的忧伤。',
      '你知道吗?也许有些话,你是不经意地说出口,我却很认真地在难过。',
      '美如空山樱落，皓月当空',
      '见之不忘，思之如狂。但如果记忆被抹去，还有怎样的线索能让他们，找到彼此。',
      '确也知道那些轻薄的水蒸汽不能托住自己和梦想',
      '人在江湖，重重叠叠地身不由己。'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    const that = this;
    wx.getStorage({
      key: app.globalData.textKey,
      success: function (res) {
        that.setData({
          history: res.data
        })
      },
      fail: function (res) {
      },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  // 文字长按
  textLongTap: function (e) {
    const that = this;
    wx.setClipboardData({
      data: e.currentTarget.dataset.data,
      success: function (res) {
        that.showToast('文字已经复制');
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 提示Toast
  showToast: function (title) {
    wx.hideLoading()
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 2000,
      mask: true,
      success: function (res) {
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})