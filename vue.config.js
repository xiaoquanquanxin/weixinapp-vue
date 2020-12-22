//  接口代理
module.exports = {
    devServer: {
        proxy: {
            // 容丽姐
            '/bpi': {
                target: 'http://192.168.100.208:8090/',
                changeOrigin: true,
                pathRewrite: {
                    '^/bpi': ''
                }
            },
            // mobile
            '/mpi': {
                target: 'http://192.168.100.208:5080/wechat-mobile/',
                changeOrigin: true,
                pathRewrite: {
                    '^/mpi': '/wx'
                }
            },
            // 少杰
            '/opi': {
                target: 'http://pzjnkm.natappfree.cc/',
                changeOrigin: true,
                pathRewrite: {
                    '^/opi': '/api'
                }
            }
        }
    },
};
