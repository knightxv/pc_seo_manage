'use strict';

const HttpKey = Symbol('Application#webHttp');

module.exports = {
  get Http() {
    // const self = this;
    if (!this[HttpKey]) {
      class Http {
        // get() {
        //   // return self.ctx.curl(`${serverPath}${httpUrl}`, {
        //   //   dataType: 'json',
        //   //   data: params,
        //   //   timeout: 5000,
        //   // }).then(res => res.data);
        // }
        // getHttpServerPath() {

        // }
      }
      this[HttpKey] = Http;
    }
    return this[HttpKey];
  },
};
