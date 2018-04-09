// pages/address/editAddress/editAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    region: ['山东省', '济南市', '历下区'],
    //customItem: '全部'
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let address = JSON.parse(options.addressJson);
    console.log(address);
    this.setData({
      address: address,
      region: [
        address.user.address.p,
        address.user.address.c,
        address.user.address.r]
    });
  },
  saveAddress:function(){
    wx.navigateBack({
      
    })
  }
})