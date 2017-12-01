import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
// Vue.prototype.$axios = axios
Vue.prototype.webHttp = {
    get(url, params) {
        return axios.get('http://127.0.0.1:7001' + url, {
            params: params,
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin', // same-origin
        }).then(res => res.data);
    },
    post(url, body = {}) {
        return axios.post('http://127.0.0.1:7001' + url, body);
        // const option = {
        //     method: 'POST',
        //     // mode: 'cors',
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'Access-Control-Allow-Credentials':'true',
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'text/plain',
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     // credentials: 'same-origin', // same-origin
        //     body: JSON.stringify(body),
        // };
        // fetch(`http://127.0.0.1:7001${url}`, option)
        // .then(res => res.json());
    },
    form(url, data) {
        return fetch(`http://127.0.0.1:7001${url}`, {
            method: "POST",
            // mode: 'cors',
            // credentials: 'same-origin', // same-origin
            // headers: {
            //     // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            //     'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            //     'Content-Type': 'multipart/form-data'
            // },
            body: data
        }).then(res => res.json())
    }
};

// 日期格式化
Date.prototype.format = function (format) {
    let o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'H+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      S: this.getMilliseconds(),
    };
    if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (`${this.getFullYear()  }`).substr(4 - RegExp.$1.length)); }
    for (let k in o) {
      if (new RegExp(`(${  k  })`).test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1
          ? o[k]
          : (`00${  o[k]}`).substr((`${  o[k]}`).length));
      }
    }
    return format;
  };

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');