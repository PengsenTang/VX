//index.js
//获取应用实例
var Session = require('../../session');
Page({
  data: {
    photoPath: '',
    uploadUrl: 'https://www.wantcu.top/highlight/newHighlight',
    latitude:'',
    longtitude:'',
    description:'des',
    msg:'msg'
  },
  //事件处理函数
  back2Index:function(){
    wx.navigateBack({
      delta:2
    })
  },
  withOpenid:function(){
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
  chooseImage() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.data.photoPath = res.tempFilePaths;
        console.log(that.data.photoPath);
      }
    })
  },


  uploadFile() {
    console.log(this.data.uploadUrl);
    console.log(this.data.photoPath[0]);
    var that = this;
    wx.getLocation({
      success: function(res) {
        that.data.latitude = res.latitude;
        that.data.longtitude = res.longitude;
        wx.uploadFile({
          url: that.data.uploadUrl,
          filePath: that.data.photoPath[0],
          name: 'file',
          header: {
            "content-type": "multipart/form-data",
            //"content-type": "application/x-www-form-urlencoded",
            'Cookie': Session.get()
          },
          formData: {
            'latitude': that.data.latitude,
            'longtitude': that.data.longtitude,
            'description': that.data.description,
            'msg': that.data.msg
          },
        })
      },
    })
  },
})