//  接口代理
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://容丽姐ip:端口/',
                changeOrigin: true,
            },
        }
    }
};
