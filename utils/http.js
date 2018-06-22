/**
 * request 有一个参数 {}
 * 
 * url:       网络请求地址
 * data:      网络请求参数
 * success:   网络请求成功回调
 * fail:      网络请求失败回调
 * complete:  网络请求完成回调
 * 
 */
const request = ({ url: url, data: data, success: success, fail: fail, complete: complete }) => {
  const requestTask = wx.request({
    url: url,
    data: data,
    header: {
      'type': 'application/json'
    },
    method: 'GET',
    success: function (result) {
      // 需根据返回的状态码自行判断是否请求成功  200、400、500、504等等
      console.log('http成功', result)
      success(result)
    },
    fail: function (error) {
      console.log('http失败', error)
      fail(error)
    },
    complete: function () {
      complete()
    }

  });
}

module.exports = {
  request: request
}