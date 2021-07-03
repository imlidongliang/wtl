const Config = require('../config.js');
var bmap = require('../libs/bmap-wx-jssdk/bmap-wx.min.js');

let getSetting
let getLocation
let beforeGetAddress
let getBmapAddress

getSetting = (withSubscriptions = false) => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            withSubscriptions,
            success(res) {
                resolve(res)
            },
            fail(error) {
                reject(error)
            }
        })
    })
}

getLocation = (type = 'wgs84', isHighAccuracy = false) => {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type,
            isHighAccuracy,
            success(res) {
                resolve(res)

            },
            fail(error) {
                reject(error)
            }
        })
    })
}
beforeGetAddress = () => {
    return new Promise((resolve, reject) => {
        getSetting().then(res => {
            const authSetting = res.authSetting
            const userLocation = authSetting['scope.userLocation']

            // 拒绝授权后的二次授权
            if (userLocation === false) {
                wx.showModal({
                    title: '获取你的位置信息',
                    content: '你的位置信息将用于小程序位置接口的效果展示',
                    success(res) {
                        if (res.confirm) {
                            wx.openSetting({
                                success(res) {
                                    // 设置成功
                                    if (!!res.authSetting['scope.userLocation']) {
                                        getLocation('gcj02').then(res => {
                                            resolve(res)
                                        }).catch(error => {
                                            reject(error)
                                        })
                                    }
                                },
                            });
                        }

                    }
                })
            } else {
                getLocation('gcj02').then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            }
        })
    })
}
getBmapAddress = () => {
    // 实例化API核心类
    let BMap = new bmap.BMapWX({
        ak: Config.bdMapKey
    });
    return new Promise((resolve, reject) => {
        beforeGetAddress().then(res => {
            const latitude = res.latitude
            const longitude = res.longitude
            BMap.regeocoding({
                location: latitude + ',' + longitude,
                success: function (res) {
                    resolve(res)
                },
                fail: function (res) {
                    reject(res)
                }
            });

        }).catch(error => {
            reject(error)
        })

    })
}




module.exports = {
    getBmapAddress
}