'use strict';
module.exports = app => {
  class ContactController extends app.Controller {
    async index(ctx) {
      const contactKey = this.app.databaseEnum.htmltext.contact;
      const contactText = await ctx.service.common.getHtmlText(contactKey);
      await ctx.render('contact.nj', {
        htmlText: contactText,
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
