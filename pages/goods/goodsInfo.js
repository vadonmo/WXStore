// pages/goods/goodsInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    title: '罗技（Logitech） G100s 即时战略/在线竞技光电游戏鼠标',
    price: 119,
    imgsUrl: ['../images/head.png', '../images/head.png', '../images/head.png']
  },
  naviToCart: function () {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  imBuy: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  addToCart: function (e) {
    wx.showToast({
      title: e.currentTarget.dataset.id + '加入成功',
    })
    // wx.switchTab({
    //   url: '../cart/cart',
    // })
  }

})