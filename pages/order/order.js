// pages/order/order.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      name: '李不言',
      phone: '18353125037',
      address: { p: '山东省', c: '济南市', r: '历下区', o: '普利广场' }
    },
    goodsNum: 0,
    priceCount: 0,
    goodsPrice: 0,
    weightPrice: 5,
    orderList: [
      {
        id: 1,
        img: 'https://i8.mifile.cn/b2c-mimall-media/549a053521e19de494c35b4e6d46b0ef.jpg',
        title: '小米MIX2S',
        price: '399.45',
        num: 2
      },
      {
        id: 2,
        img: 'https://i8.mifile.cn/b2c-mimall-media/549a053521e19de494c35b4e6d46b0ef.jpg',
        title: '小米MIX2S',
        price: '299.5',
        num: 3
      },
      {
        id: 3,
        img: 'https://i8.mifile.cn/b2c-mimall-media/549a053521e19de494c35b4e6d46b0ef.jpg',
        title: '小米MIX2S',
        price: '32997',
        num: 1
      },
      {
        id: 4,
        img: 'https://i8.mifile.cn/b2c-mimall-media/549a053521e19de494c35b4e6d46b0ef.jpg',
        title: '小米MIX2S',
        price: '32979',
        num: 5
      },
      {
        id: 5,
        img: 'https://i8.mifile.cn/b2c-mimall-media/549a053521e19de494c35b4e6d46b0ef.jpg',
        title: '小米MIX2S',
        price: '3199',
        num: 4
      },
      {
        id: 6,
        img: 'https://i8.mifile.cn/b2c-mimall-media/549a053521e19de494c35b4e6d46b0ef.jpg',
        title: '小米MIX2S',
        price: '3299',
        num: 1
      }]
  },
  chooseAddr: function () {
    console.log('选择地址')
    wx.navigateTo({
      url: '../address/address',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    this.countPrice();
  },
  onShow: function () {
    if (app.globalData.userAddress != null) {
      console.log(app.globalData.userAddress)
      this.setData({
        user: app.globalData.userAddress.user
      })
    }
  },
  numAdd: function (e) {
    let index = e.currentTarget.dataset.index;//
    let newList = this.data.orderList
    newList[index].num++;
    this.setData({
      orderList: newList
    })
    this.countPrice();
  },
  numSub: function (e) {
    let index = e.currentTarget.dataset.index;
    let num = e.currentTarget.dataset.num;
    let newList = this.data.orderList
    if (num == 1) {
      newList.splice(index, 1)
    } else {
      newList[index].num--;
    }
    this.setData({
      orderList: newList
    })
    this.countPrice();
  },
  countPrice: function () {
    let newList = this.data.orderList;
    let allPrice = 0;
    for (let goods of newList) {
      allPrice += parseInt(goods.num) * goods.price;
    }
    let priceCount = allPrice + this.data.weightPrice;
    this.setData({
      goodsPrice: allPrice,
      priceCount: priceCount
    })
  },
  naviGoodsInfo: function (e) {
    console.log(e);
    let goodId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods/goodsInfo?id=' + goodId,
    })
  },
  orderPay: function () {
    wx.requestPayment(
      {
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        success: function (res) { },
        fail: function (res) {
          console.log(res);
          wx.showModal({
            title: '支付结果',
            content: res.errMsg,
          })
        },
        complete: function (res) { }
      })
  }
})