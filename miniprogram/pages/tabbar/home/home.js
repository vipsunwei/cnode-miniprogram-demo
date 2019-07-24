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
    tab: 'all',
    tabs: [
      {
        tab: 'all',
        text: '全部'
      },
      {
        tab: 'good',
        text: '精华'
      },
      {
        tab: 'ask',
        text: '问答'
      },
      {
        tab: 'share',
        text: '分享'
      },
      {
        tab: 'job',
        text: '招聘'
      },
      {
        tab: 'dev',
        text: '测试'
      }
    ]
  },
  getTopics ({ tab, limit, page }) {
    let _this = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cnodejs.org/api/v1/topics', //仅为示例，并非真实的接口地址
        data: {
          tab,
          limit,
          page,
          mdrender: 'false'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          res.data.data = _this.formatTopicsTime(res.data.data);
          resolve(res.data)
        },
        fail (error) {
          console.log(error)
          reject(error)
        }
      })
    })
  },
  formatTopicsTime (list) {
    for (let i = 0, l = list.length; i < l; i++) {
      const item = list[i];
      item.create_at_formatted = item.create_at.split('T')[0];
      // item.create_at_formatted = item.create_at.replace('T', ' ').split('.')[0];
      item.last_reply_at_formatted = item.last_reply_at.replace('T', ' ').split('.')[0];
    }
    return list;
  },

  handleChange(event) {
    wx.showLoading({
      title: '加载中'
    });
    let index = event.detail.index;
    console.log(index);
    let tabObj = this.data.tabs[index];
    this.data.tab = tabObj.tab;
    this.data.page = 1;
    this.getTopics({ tab: this.data.tab, limit: this.data.limit, page: this.data.page })
    .then(result => {
      if ( result.success ) {
        this.setData({ list: result.data });
        wx.hideLoading();
      }
    })
    .catch(error => {
      console.log(error);
      wx.hideLoading();
    })
  },
  handleTap(event) {
    let topicId = event.target.dataset.topicId;
    wx.navigateTo({
      url: '/pages/details/details?i=' + topicId,
      success: (result)=>{
        console.log(result, '成功');
      },
      fail: (error)=>{
        console.log(error, '失败');
      },
      complete: ()=>{}
    });
  },
  mergeTopics ({ list }) {
    let newList = this.data.list.concat(list);
    this.setData({ list: newList });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    console.log('onload: load tab : all data', this.data.tab)
    this.getTopics({ tab: this.data.tab, limit: this.data.limit, page: this.data.page })
    .then(result => {
      if (result.success) {
        this.setData({ list: result.data });
        wx.hideLoading();
      }
    })
    .catch(error => {
      console.log(error);
      wx.hideLoading();
    });
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
  onPullDownRefresh: function () {
    this.data.page = 1;
    console.log('下拉刷新page：', this.data.page);
    this.getTopics({ tab: this.data.tab, limit: this.data.limit, page: this.data.page })
    .then(result => {
      if ( result.success ) {
        this.setData({ list: result.data });
        wx.stopPullDownRefresh();
      }
    })
    .catch(error => {
      console.log(error);
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    });
    this.data.page += 1;
    this.getTopics({ tab: this.data.tab, limit: this.data.limit, page: this.data.page })
    .then(result => {
      if ( result.success ) {
        this.mergeTopics({ list: result.data });
        wx.hideLoading();
      }
    })
    .catch(error => {
      console.log(error);
      wx.hideLoading();
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({ from, target }) {
    console.log('from: ' + from);
    console.log('target: ', target);
    return {
      title: 'CNode: Node.js中文社区',
      path: '/pages/tabbar/home/home',
      success: function (result) {
        console.log(result, '成功');
      },
      fail: function (error) {
        console.log(error, '失败');
      }
    }
  }
})