import axios from 'axios'
import {Alert, LoadingBar, Spin, Notice} from 'view-design';

axios.defaults.withCredentials = true;//让ajax携带cookie
axios.defaults.timeout = 7000;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_URL : process.env.VUE_APP_BASE_URL;
LoadingBar.config({
    failedColor: '#DF3F4E',
    height: 5,
});
export const http = (options) => {
    return new Promise((resolve, reject) => {
        LoadingBar.start();
        Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'demo-spin-icon-load',
                        props: {
                            type: 'ios-loading',
                            size: 18
                        }
                    }),
                    h('div', '洪荒之力暴涨中~~~')
                ])
            }
        });
        axios(options)
            .then(res => {
                res = res.data;
                setTimeout(() => {
                    Spin.hide();
                    LoadingBar.finish();
                    resolve(res);
                }, 1000);
            })
            .catch(error => {
                setTimeout(() => {
                    Spin.hide();
                    LoadingBar.finish();
                    Notice.error({
                        title: '提示',
                        desc: '网络错误: ' + error.message,
                    });
                    reject(error)
                }, 1000);
            })
    })
};
export const http_async = (options) => {
    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => {
                res = res.data;
                setTimeout(() => {
                    resolve(res);
                }, 1000);
            })
            .catch(error => {
                Notice.error({
                    title: '提示',
                    desc: '网络错误: ' + error.message,
                });
                reject(error)
            })
    })
};
export const http_CORS = (method, url, data) => {
    LoadingBar.start();
    Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'ios-loading',
                        size: 18
                    }
                }),
                h('div', '洪荒之力暴涨中~~~')
            ])
        }
    });
    let xhr;
    if (window.XMLHttpRequest) {// code for all new browsers
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {// code for IE5 and IE6
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xhr = null;
    }
    return new Promise((resolve, reject) => {
        if (xhr) {
			xhr.withCredentials = true;
            xhr.open(method, url, true);
            if (data !== undefined) {
                xhr.send(data);
            } else {
                xhr.send(null);
            }
            xhr.onload = (res) => {
                res = JSON.parse(res.target.responseText);
                setTimeout(() => {
                    Spin.hide();
                    LoadingBar.finish();
                    resolve(res);
                }, 1000);
            };
            xhr.onerror = (err) => {
                setTimeout(() => {
                    Spin.hide();
                    LoadingBar.finish();
                    Notice.error({
                        title: '提示',
                        desc: '网络错误: ' + err.message,
                    });
                    reject(error)
                }, 1000);
            };
        } else {
            setTimeout(() => {
                Spin.hide();
                LoadingBar.finish();
                Notice.error({
                    title: '提示',
                    desc: '网络错误:未进行请求 ' ,
                });
            }, 1000);
        }

    })
};
export const http_CORS_async = (method, url, data) => {
    let xhr;
    if (window.XMLHttpRequest) {// code for all new browsers
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {// code for IE5 and IE6
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xhr = null;
    }
    return new Promise((resolve, reject) => {
        if (xhr) {
			xhr.withCredentials = true;
            xhr.open(method, url, true);
            if (data !== undefined) {
                xhr.send(data);
            } else {
                xhr.send(null);
            }
            xhr.onload = (res) => {
                res = JSON.parse(res.target.responseText);
                setTimeout(() => {
                    resolve(res);
                }, 1000);
            };
            xhr.onerror = (error) => {
                setTimeout(() => {
                    Notice.error({
                        title: '提示',
                        message: '网络错误: ' + error.message || '请求错误',
                    });
                    reject(error)
                }, 1000);
            };
        } else {
            setTimeout(() => {
                Notice.error({
                    title: '提示',
                    message: '网络错误:未进行请求 ',
                });
            }, 1000);
        }
    })
};
export default {
    http,
    http_async,
    http_CORS,
    http_CORS_async
};