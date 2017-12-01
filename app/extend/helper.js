'use strict';

class Response {
  constructor(isSuccess, data) {
    this.isSuccess = isSuccess;
    this.data = data;
  }
}

let http;
module.exports = {
  get webHttp() {
    return this.httpManage().webHttp;
  },
  httpManage() {
    const self = this;
    if (!http) {
      const serverPath = this.ctx.app.config.httpConfig.webServerPath;
      class WebHttp extends this.app.Http {
        get(httpUrl, params) {
          return new Promise(resolve => {
            self.ctx.curl(`${serverPath}${httpUrl}`, {
              dataType: 'json',
              data: params,
              timeout: 5000,
            }).then(res => res.data)
              .then(res => {
                // self.ctx.logger.info(`web请求:
                //   url: ${serverPath}${httpUrl}
                //   res: ${JSON.stringify(res)}
                // `);
                resolve(new Response(true, res.data));
              })
              .catch(err => {
                resolve(new Response(false, err));
              });
          });
        }
        post(httpUrl, params) {
          return self.ctx.curl(`${serverPath}${httpUrl}`, {
            dataType: 'json',
            data: params,
            timeout: 5000,
          }).then(res => res.data);
        }
      }
      http = {
        webHttp: new WebHttp(),
      };
    }
    return http;
  },
  setRes(isSuccess, data, info) {
    this.ctx.body = {
      success: isSuccess,
      info: info || '',
      data,
    };
  },
  isObj(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },
  isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
  },
};

