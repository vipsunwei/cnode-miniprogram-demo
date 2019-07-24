// miniprogram/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  getTopicDetails ({ topicId }) {
    let _this = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cnodejs.org/api/v1/topic/' + topicId, //仅为示例，并非真实的接口地址
        data: {
          mdrender: 'false'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          res.data.data = _this.formatTopicDetailTime(res.data.data);
          resolve(res.data)
        },
        fail (error) {
          reject(error)
        }
      })
    })
  },
  formatTopicDetailTime (detail) {
    detail.create_at_formatted = detail.create_at.replace('T', ' ').split('.')[0];
    detail.last_reply_at_formatted = detail.last_reply_at.replace('T', ' ').split('.')[0];
    return detail;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    });
    let topicId = options.i;
    this.getTopicDetails({ topicId })
    .then(result => {
      console.log(result.data);
      if ( result.success ) {
        this.setData({ detail: result.data });
        wx.hideLoading();
      }
    })
    .catch(error => {
      console.log(error);
      wx.hideLoading();
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
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({ from, target }) {
    console.log(from, target);
    return {
      title: this.data.detail.title,
      path: '/pages/details/details?i=' + this.data.detail.id
    }
  }
})