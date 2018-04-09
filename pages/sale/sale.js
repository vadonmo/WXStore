//index.js
//获取应用实例
const app = getApp()
const serverHost = app.globalData.serverHost
Page({
  data: {
    goodsList: []
  },
  onLoad: function () {
    this.getIndexGoods();
  },
  getIndexGoods: function () {
    let _this = this;
    wx.request({
      url: serverHost + 'index.php',
      success: function (res) {
        console.log(res);
        _this.setData({
          goodsList: res.data
        })
        wx.stopPullDownRefresh();
      }
    })
  },
  onPullDownRefresh: function () {
    this.getIndexGoods();
  },
  //事件处理函数
  goodsInfo: function () {
    console.log('跳转到商品详情')
    wx.navigateTo({
      url: '../goods/goodsInfo',
    })
  },
  //下架商品
  deleteGoods: function (e) {
    console.log(e);
    // wx.navigateTo({
    //   url: '../goods/goodsInfo',
    // })
  }
})
