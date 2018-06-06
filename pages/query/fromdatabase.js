function queryPointsWithScale(_longitude, _latitude, _scale, callback) {
  wx.request({
    url: 'https://www.wantcu.top/Highlight/query',
    data: {
      longitude: _longitude,
      latitude : _latitude,
      scale: _scale
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      console.log(data)
      for (var i = 0; i < data.length; i++){
        data[i].iconPath = "marker.png";
        data[i].width = 22;
        data[i].height = 22;
        data[i].id = i;
        path = data[i].snapshot.split('/')
        path = path[2]
        console.log(path)
        data[i].snapshot = 'https://www.wantcu.top/' + path;
      }
      callback(res.data)
    }
  })
}


module.exports.queryPointsWithScale = queryPointsWithScale;