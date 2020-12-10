//  接口代理
module.exports = {
    devServer: {
        proxy: {
            '/bpi': {
                target: 'http://192.168.100.208:8090/',
                changeOrigin: true,
                pathRewrite: {
                    '^/bpi': ''
                }
            },
        }
    },
};
