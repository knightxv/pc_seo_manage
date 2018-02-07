'use strict';
const Controller = require('../../core/base_controller');
module.exports = app => {
  class JoinController extends Controller {
    async getImage(ctx) {
      const configKey = app.databaseEnum.web_config.joinImg;
      const joinConfig = await ctx.service.common.getWebConfig(configKey);
      const joinImg = joinConfig ? joinConfig.config : '';
      this.success({
        src: joinImg,
      });
    }
    async setImage(ctx) {
      const { joinImg } = ctx.query;
      const configKey = app.databaseEnum.web_config.joinImg;
      const isSuccess = await ctx.service.common.setWebConfig(configKey, joinImg);
      if (isSuccess) {
        this.success();
      } else {
        this.fail('设置失败');
      }
    }
  }
  return JoinController;
};
