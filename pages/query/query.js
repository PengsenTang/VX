//index.js

// 引入高德地图api
var database = require('fromdatabase.js');
var Session = require('../../session');
//获取应用实例
const app = getApp()
const rate = []
for(let i=1;i<5;i++){
  rate.push(i)
}
var markersData = [];
Page({
  data: {
    index:1,
    markers: [],
    circles: [],
    latitude: '',
    longitude: '',
    textData: {},
    show_detail:false,
    scale: 18,
    maxScale: 20,
    minScale: 16,
    currentPoint: null,
    mapContext: null,
    photoPath: '',
    uploadUrl: 'https://www.wantcu.top/highlight/newHighlight',
    rateUrl:'https://www.wantcu.top/highlight/rate',
    // uploadUrl:'https://www.wantcu.top/users/newSite',
    latitude: '',
    longtitude: '',
    description: 'des',
    msg: 'msg',
    showCamera:false,
    showModalStatus:false,
    animationData: null,
    starStyle: [
      'star_none',
      'star_none',
      'star_none',
      'star_none',
      'star_none',
      ]
  },
  onLoad: function () {
    var that = this;
    that.mapContext = wx.createMapContext("map");
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
  },
  bindPickerChange:function(e){
    var realvalue = e.detail.value
    realvalue = parseInt(realvalue)
    this.setData({
      index:realvalue
     })
  },
  slider2change: function(e){
    var that = this;
    var _scale = e.detail.value;
    if (_scale >= that.data.minScale) {
      that.setData({
        scale: _scale
      })
    }
  },
  // 点击marker
  markertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.setData({
      show_detail:true,
      showModalStatus:true,
      showMap:false,
      currentPoint:id,
    })
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  // 地图范围变化
  regionchange(e) {
    var that = this;
    if (e.type == 'end') {
      that.getMapCenterLocation(function (res) {
        // 坐标变化
        that.data.latitude = res.latitude;
        that.data.longitude = res.longitude;
      });
    }
  },
  // 设置点击marker后显示的数据
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        description: data[i].description,
        message: data[i].message,
        rate: data[i].rate,
        snapshot: data[i].snapshot
      }
    });
    that.setStarStyle(data[i].yourrate);
  },
  // 用户评分
  // 设置星星的样式
  setStarStyle: function (stars) {
    var that = this;
    var styles = [];
    for (var i = 1; i <= 5; i++) {
      if (i <= stars) styles[i - 1] = 'star_full';
      else styles[i - 1] = 'star_none';
    }
    that.setData({
      starStyle : styles
    });
  },
  setStarOne: function () {
    var that = this;
    that.submitRate(1);
  },
  setStarTwo: function () {
    var that = this;
    that.submitRate(2);
  },
  setStarThree: function () {
    var that = this;
    that.submitRate(3);
  },
  setStarFour: function () {
    var that = this;
    that.submitRate(4);
  },
  setStarFive: function () {
    var that = this;
    that.submitRate(5);
  },
  // TODO:
  submitRate: function (stars) {
    var that = this
    lid = markersData[this.data.currentPoint]['lid']
    wx.request({
      url: that.data.rateUrl,
      method: 'POST',
      data: {
        rate: stars,
        locationid: lid
      },
      header: {
        'content-type': 'application/json',
        'Cookie': Session.get()
      },
      success: res => {
        that.setStarStyle(stars);
        wx.showToast({
          title: '评分成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  // 修改点击marker后的图片
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "marker_checked.png";
      } else {
        data[j].iconPath = "marker.png";
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  },
  // 获取地图中心点的位置坐标
  getMapCenterLocation: function (callback) {
    var that = this;
    that.mapContext.getCenterLocation({
      success: function (res) {
        callback(res);
      }
    })
  },
  scalesmaller(){
    var that = this;
    var _scale = that.data.scale;
    if (_scale > that.data.minScale){
      that.setData({
        scale: _scale - 1
      })
    }
  },
  scalelarger(){
    var that = this;
    var _scale = that.data.scale;
    if (_scale < that.data.maxScale) {
      that.setData({
        scale: _scale + 1
      })
    }
  },
  findPoints(){
    var that = this;
    var longitude = that.data.longitude;
    var latitude = that.data.latitude
    var scale = that.data.scale
    this.setData({
      show_detail:false
    })
    database.queryPointsWithScale(longitude, latitude, scale, function (data){
      markersData = data;
      that.setData({
        markers : markersData,
        textData: {
          name: '',
          desc: ''
        }
      });
    });
  },
  newPoint(){
    var that = this
    wx.showActionSheet({
      itemList: ['打开相册','拍摄照片'],
      success: function(res){
        if(res.tapIndex == 0){
          that.chooseImage();
        }
        else{
          that.takePhoto();
        }
        
      },
      fail: function(res){
      }
    })
  },
  chooseImage() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        that.data.photoPath = res.tempFilePaths;
        wx.navigateTo({
          url: '../preview/preview?photoPath=' + that.data.photoPath 
        })
      }
    })
  },
  takePhoto(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: function (res) {
        that.data.photoPath = res.tempFilePaths;
        wx.navigateTo({
          url: '../preview/preview?photoPath=' + that.data.photoPath
        })
      }
    })
  },
  showModal: function () {
    this.setData({
      showModalStatus: true
    })
  },
  hideModal: function () {
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0
    })
    animation.translateX(800).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
})