var Session = require('../../session');
function queryPointsWithScale(_longitude, _latitude, _scale, callback) {
  wx.request({
    url: 'https://www.wantcu.top/Highlight/query',
    data: {
      longitude: _longitude,
      latitude : _latitude,
      scale: _scale
    },
    header: {
      'content-type': 'application/json',
      'Cookie':Session.get()
    },
    success: function (res) {
      var data = res.data;
      for (var i = 0; i < data.length; i++){
        data[i].iconPath = "marker.png";
        data[i].width = 24;
        data[i].height =48;
        data[i].id = i;
        path = data[i].snapshot.split('/')
        path = path[2]
        data[i].snapshot = 'https://www.wantcu.top/' + path;
      }
      callback(res.data)
    }
  })
}


module.exports.queryPointsWithScale = queryPointsWithScale;