// pages/order/manage/orderManage.js
let app = getApp();
let serverHost = app.globalData.serverHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },
  deleOrder: function (e) {
    let index = e.currentTarget.dataset.index;
    let newList = this.data.orderList;
    // wx.request({
    //   url: '',
    // })
    newList.splice(index, 1);
    this.setData({
      orderList: newList
    })
    console.log("删除", index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderManageList()
  },
  onPullDownRefresh: function () {
    this.getOrderManageList();
  },
  getOrderManageList: function () {
    let _this = this;
    wx.request({
      url: serverHost + 'orderManage.php',
      success: res => {
        console.log(res);
        _this.setData({
          orderList: res.data
        });
        wx.stopPullDownRefresh();
      }
    })
  }
})