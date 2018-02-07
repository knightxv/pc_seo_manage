'use strict';
const Controller = require('../../core/base_controller');

module.exports = app => {
  class PlatfromController extends Controller {
    async index(ctx) {
      const platformKey = this.app.databaseEnum.htmltext.platform;
      const platformText = await ctx.service.common.getHtmlText(platformKey);
      const bannerKey = app.databaseEnum.banner.platform;
      const banner = await ctx.service.common.getBanner(bannerKey);
      await this.webRender('platfrom.nj', {
        htmlText: platformText,
        banner,
      });
    }
  }
  return PlatfromController;
};
