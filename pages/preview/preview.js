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
    console.log(options.photoPath)
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
    console.log('in uploadFile')
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
          success:res=>{
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
          }
        });
        wx.navigateBack({
          delta: 1
        })

      },
      fail: function (res) {
        console.log(res.errMsg)
      },
    })
  },
  cancel(){
    wx.navigateBack({
      delta: 1
    })
  }
})