// pages/preview/preview.wxml.js

var Session = require('../../session');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoPath: '',
    uploadUrl: 'https://www.wantcu.top/highlight/newHighlight',
    latitude: '',
    longtitude: '',
    description: 'input your description.',
    msg: 'how do you like it?'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      photoPath: options.photoPath
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  commentInput(input){
    this.setData({
      msg:input.detail.value
    })
  },
  descriptionInput(input){
    this.setData({
      description:input.detail.value
    })
  },
  uploadFile() {
    var that = this;
    wx.getLocation({
      success: function (res) {
        that.data.latitude = res.latitude;
        that.data.longtitude = res.longitude;
        wx.uploadFile({
          url: that.data.uploadUrl,
          filePath: that.data.photoPath,
          name: 'file',
          header: {
            "content-type": "multipart/form-data",
            'Cookie': Session.get()
          },
          formData: {
            'latitude': that.data.latitude,
            'longtitude': that.data.longtitude,
            'description': that.data.description,
            'msg': that.data.msg
          },
        });
        wx.navigateBack({
          delta:1
        })
      },
      fail: function (res) {
      },
    })
  },
  cancel(){
    wx.navigateBack({
      delta: 1
    })
  }
})