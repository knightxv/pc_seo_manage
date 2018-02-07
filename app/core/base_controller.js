'use strict';
const { Controller } = require('egg');
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      success: true,
      data,
    };
  }
  fail(msg, msgCode = 1) {
    this.ctx.body = {
      success: false,
      data: null,
      code: msgCode,
      info: msg,
    };
  }
  // 获取全局配置
  async getAppConfig() {
    const { appName, logoSrc, recordNumber } = this.app.databaseEnum.web_config;
    const cAppName = await this.ctx.service.common.getWebConfig(appName);
    const cLogoSrc = await this.ctx.service.common.getWebConfig(logoSrc);
    const cRecordNumber = await this.ctx.service.common.getWebConfig(recordNumber);
    return {
      appName: cAppName ? cAppName.config : '', // 应用名称
      logoSrc: cLogoSrc ? cLogoSrc.config : '', // logo地址
      recordNumber: cRecordNumber ? cRecordNumber.config : '', // 备案号
      globalColor: '#fff', // 主题色(预留)
    };
  }
  // 在render基础添加一些全局的配置
  async webRender(viewPath, data = {}) {
    const appConfig = await this.getAppConfig();
    const combinData = Object.assign(data, appConfig);
    await this.ctx.render(viewPath, combinData);
  }
  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
