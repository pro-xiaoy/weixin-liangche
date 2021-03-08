// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    companyList: [{
      name: '东至县靓车饰界汽车销售服务有限公司',
      phone: '13665669919',
      local: '大渡口镇店',
      latitude: 30.481179999,
      longitude: 117.06318945,
      address: '东至县靓车饰界汽车销售服务有限公司大渡口分公司'
    }, {
      name: '东至县靓车饰界汽车销售服务有限公司',
      phone: '18956670299',
      local: '胜利店',
      latitude: 30.418630854,
      longitude: 117.008710427,
      address: '东至县靓车饰界汽车销售服务有限公司'

    }]
  },
  clickPhone(e) {
    const { item } = e.currentTarget.dataset
    console.log('item+++', item)
    wx.makePhoneCall({
      phoneNumber: item.phone //仅为示例，并非真实的电话号码
    })
  },
  clickLocal(e) {
    const { item } = e.currentTarget.dataset

    // wx.chooseLocation({
    //   success(res) {
    //     console.log('res+++', res)
    //   }
    // })
    // 大渡口靓车的经纬度 30.481179999  117.06318945  
    // 楼阁 30.418630854  117.008710427
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = item.latitude
        const longitude = item.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          address: item.address
        })
      }
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
