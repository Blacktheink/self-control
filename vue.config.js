module.exports = {
    publicPath: "./",
    devServer: {
        clientLogLevel: `silent`,
        host: "0.0.0.0",
        port: 8090,
        open: false,
        proxy: {
           [process.env.VUE_APP_URL]: {//使用"/api"来代替"http://f.apiplus.c"
                target: process.env.VUE_APP_BASE_URL,//源地址
                changeOrigin: true,//改地址
                ws: true,
                pathRewrite: {
                   ['^'+process.env.VUE_APP_URL]: ''//路由重写
                }
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("autoprefixer")({
                        overrideBrowserslist: ["last 15 versions"]
                    }),
                    require('postcss-plugin-px2rem')({
                        rootValue: 192, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                    }),

                ]
            }
        }
    },
};