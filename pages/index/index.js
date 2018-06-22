//index.js
//获取应用实例
const app = getApp()
import HttpRequest from '../../utils/http.js';
const baseUrl = 'https://cn.bing.com';
const baseEnd = '_1080x1920.jpg';

Page({
  data: {
    src: '',
    images: [],
    content: '',
    title: ''
  },
 
  onLoad: function () {
    
  },
  onShow: function (){


  },
  onReady: function () {
    this.imageRequest();
    this.textRequest();
  },
  // 请求图片
  imageRequest: function () {
    HttpRequest.request({
      url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8',
      data: {
      },
      success: (result) => {
        const count = Math.floor(Math.random() * 8);
        
        this.setData({
          src: baseUrl + result.data.images[count].urlbase + baseEnd,
          images: result.data.images
        })
      },
      fail: (error) => {
      },
      complete: () => {
      }
    })
  },
  // 请求文字
  textRequest: function () {
    const that = this;
    HttpRequest.request({
      url: 'https://api.lwl12.com/hitokoto/v1?encode=realjson',
      data: {
      },
      success: (result) => {
        this.setData({
          content: result.data.text,
          title: result.data.source
        });
        that.saveText(result.data.text, result.data.source);
        wx.setNavigationBarTitle({
          title: result.data.source ? '《' + result.data.source + '》' : '壁言'
        });
      },
      fail: (error) => {
      },
      complete: () => {
      }
    })
  },
  // 本地保存文本
  saveText: function (content, title) {
    let obj = { content: content, title: title };
    wx.getStorage({
      key: app.globalData.textKey,
      success: function (res) {
        let array = res.data;
        array.push(obj);
        wx.setStorage({
          key: app.globalData.textKey,
          data: array,
        })
      },
      fail: function (res) { 
        wx.setStorage({
          key: app.globalData.textKey,
          data: [obj],
        })
      },
      complete: function (res) { },
    })
  },
  // 图片点击
  imageTap:function(){
    this.textRequest();

    const count = Math.floor(Math.random() * 8);
    this.setData({
      src: baseUrl + this.data.images[count].urlbase + baseEnd,
    })
  },
  // 跳转到下一个页面
  textViewTap: function () {
    // 历史页面
    wx.navigateTo({
      url: '../history/history',
    })
  },
  // 文字长按
  textLongTap: function () {
    const that = this;
    wx.setClipboardData({
      data: this.data.content,
      success: function (res) {
        that.showToast('文字已经复制');
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 图片长按
  imageLongTap: function () {
    wx.showLoading({
      title: '正在保存图片',
      mask: true,
      success: function (res) {
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    
    const that = this;
    wx.getImageInfo({
      src: this.data.src,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: function (res) {
            that.showToast('图片保存到相册');
          },
          fail: function (res) {
            console.log(res)
           },
          complete: function (res) { 
            wx.hideLoading()
          },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: '壁言',
      desc: this.data.content,
      path: '/pages/index/index'
    }
  },
  // 提示Toast
  showToast: function (title){
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
