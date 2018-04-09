// pages/address/address.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    from: null,
    addressList: [{
      id: 1,
      user: {
        name: "李不言",
        phone: "18352125037",
        address: { p: "山东省", c: "济南市", r: "历下区", o: "普利广场" }
      }
    }, {
      id: 2,
      user: {
        name: "李不言",
        phone: "18352125037",
        address: { p: "山东省", c: "济南市", r: "历城区", o: null }
      }
    }, {
      id: 3,
      user: {
        name: "张三",
        phone: "110",
        address: { p: "山东省", c: "济南市", r: null, o: null }
      }
    }]
  },
  onLoad: function (options) {
    console.log(options);
    if (options.from == "person") {
      wx.setNavigationBarTitle({
        title: "地址管理",
      })
      this.setData({
        from: options.from || null
      })
    }
  },
  addressChecked: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let newList = this.data.addressList;
    let address = newList[index];
    console.log(address)
    app.globalData.userAddress = address;
    wx.navigateBack()
  },
  //删除地址
  deleteAddress: function (e) {
    let index = e.currentTarget.dataset.index;
    let newList = this.data.addressList;
    newList.splice(index, 1);
    this.setData({
      addressList: newList
    })
  },
  //修改地址
  editAddress: function (e) {
    let index = e.currentTarget.dataset.index;
    let address = this.data.addressList[index];
    let str = JSON.stringify(address);
    wx.navigateTo({
      url: 'editAddress/editAddress?addressJson=' + str,
    })
  }
})