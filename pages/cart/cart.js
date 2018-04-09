// pages/cart/cart.js
const app = getApp()
const serverHost = app.globalData.serverHost
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSelect: false,
    goodsNum: 0,
    priceCount: 0,
    cartArr: []
  },
  onLoad: function () {
    this.getCartGoods();
  },
  getCartGoods: function () {
    let _this = this;
    wx.request({
      url: serverHost + 'cart.php',
      success: function (res) {
        console.log(res);
        _this.setData({
          cartArr: res.data
        })
        wx.stopPullDownRefresh();
        _this.countNum();
        _this.countPrice();
        _this.countSelect();
      }
    })
  },
  onPullDownRefresh: function () {
    this.getCartGoods();
  },
  goodsChecked: function (e) {
    let index = e.currentTarget.dataset.index;
    let checked = e.currentTarget.dataset.checked;
    let newList = this.data.cartArr;
    newList[index].checked = !checked;
    //console.log(newList[index].checked)
    this.setData({
      cartArr: newList
    })
    this.countPrice();
    this.countNum();
    this.countSelect();
  },
  numAdd: function (e) {
    let index = e.currentTarget.dataset.index;//
    let newList = this.data.cartArr
    newList[index].num++;
    this.setData({
      cartArr: newList
    })
    this.countPrice();
    this.countNum();
  },
  numSub: function (e) {
    let index = e.currentTarget.dataset.index;
    let num = e.currentTarget.dataset.num;
    let newList = this.data.cartArr
    if (num == 1) {
      newList.splice(index, 1)
    } else {
      newList[index].num--;
    }
    this.setData({
      cartArr: newList
    })
    this.countPrice();
    this.countNum();
  },
  allSelect: function (e) {
    let allSelect = e.currentTarget.dataset.select;
    let newList = this.data.cartArr;
    for (let goods of newList) {
      goods.checked = !allSelect;
    }
    this.setData({
      cartArr: newList,
      allSelect: !allSelect
    })
    this.countPrice();
    this.countNum();
  },
  countSelect: function () {
    let newList = this.data.cartArr;
    let len = 0;
    for (let goods of newList) {
      if (goods.checked) len++;
    }
    console.log(len);
    this.setData({
      allSelect: len == newList.length ? true : false
    })

  },
  countNum: function () {
    let newList = this.data.cartArr;
    let allNum = 0
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].checked) {
        allNum += parseInt(newList[i].num)
      }
    }
    this.setData({
      goodsNum: allNum
    })
  },
  countPrice: function () {
    let newList = this.data.cartArr;
    let allPrice = 0;
    for (let goods of newList) {
      if (goods.checked) {
        allPrice += parseInt(goods.num) * goods.price;
      }
    }
    this.setData({
      priceCount: allPrice
    })
  },
  naviToPay: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  goodsInfo: function () {
    wx.navigateTo({
      url: '../goods/goodsInfo',
    })
  }
})