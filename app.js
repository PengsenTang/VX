//app.js
var Session = require('./session');

App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSetting({
      
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var rescode = res.code;
        wx.request({
          url: 'https://www.wantcu.top/users/login',
          method:'POST',
          data: {
            code:res.code
          },
          success:res=>{
            data = res.header
            //Capital 
            if(data.hasOwnProperty('set-cookie')){
              console.log(data['set-cookie'])
              Session.set(data['set-cookie'])
            }
            else if (data.hasOwnProperty('Set-Cookie')) {
              console.log(data['Set-Cookie'])
              Session.set(data['Set-Cookie'])
            }
            else{
              wx.vibrateLong({
                success:res=>{
                console.log("something wrong with the login")
                }
              })
            }
                       
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})