'use strict';
const Controller = require('../../core/base_controller');


module.exports = app => {
  class ContactController extends Controller {
    async index(ctx) {
      const contactKey = this.app.databaseEnum.htmltext.contact;
      const contactText = await ctx.service.common.getHtmlText(contactKey);
      const bannerKey = app.databaseEnum.banner.contact;
      const banner = await ctx.service.common.getBanner(bannerKey);
      await this.webRender('contact.nj', {
        htmlText: contactText,
        banner,
      });
      // const row = { id: contactKey, htmlText: '测试' };
      // await ctx.service.common.setHtmlText(row);
      // await ctx.render('contact.nj', {
      //   htmlText: 'test...',
      // });
    }
  }
  return ContactController;
};
