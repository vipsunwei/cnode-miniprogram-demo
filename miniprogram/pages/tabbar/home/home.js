// miniprogram/pages/tabbar/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list: [],
    page: 1,
    limit: 10,
    tab: 'all'
  },
  getTopics ({ tab, limit, page }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cnodejs.org/api/v1/topics', //仅为示例，并非真实的接口地址
        data: {
          tab,
          limit,
          page
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          resolve(res.data)
        },
        fail (error) {
          console.log(error)
          reject(error)
        }
      })
    })
  },
  handleChange(event) {
    let index = event.detail.index;
    console.log(index);
  },
  handleTap(event) {
    console.log('handleTap: ', event);
    wx.showToast({
      title: 'jump to detail page',
      icon: 'none',
      duration: 1500
    })
  },
  mergeTopics ({ list }) {
    let newList = this.data.list.concat(list);
    this.setData({ list: newList });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log('onload: load all data', this.data.tab)
    let result = await this.getTopics({ tab: this.data.tab, limit: this.data.limit, page: this.data.page });
    if (result.success) {
      this.setData({ list: result.data });
    }
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow')
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
  onPullDownRefresh: async function () {
    wx.setBackgroundTextStyle({
      textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
    })
    this.data.page = 1;
    console.log('下拉刷新page：', this.data.page);
    let result = await this.getTopics({ tab: this.data.tab, limit: this.data.limit, page: this.data.page });
    if ( result.success ) {
      this.setData({ list: result.data });
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    wx.showLoading({
      title: '加载中',
    });
    this.data.page += 1;
    let result = await this.getTopics({ tab: this.data.tab, limit: this.data.limit, page: this.data.page });
    if ( result.success ) {
      this.mergeTopics({ list: result.data });
      wx.hideLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})