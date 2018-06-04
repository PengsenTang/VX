//index.js
//获取应用实例
const app = getApp()
var Session = require('../../session');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  
  withOpenid: function () {
    wx.request({
      url: 'https://www.wantcu.top/users/test',
      method: 'POST',
      data: {
        code: '???'
      },
      header: {
        'content-type': 'application/json',
        'Cookie':Session.get()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  //页面跳转函数
  newHighlight:function(){
    wx.navigateTo({
      url: '../highlight/highlight',
    })
  },
  queryHighlight: function () {
    wx.navigateTo({
      url: '../query/query',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
