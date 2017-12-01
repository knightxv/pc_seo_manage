'use strict';
module.exports = app => {
  class PlatfromController extends app.Controller {
    async index(ctx) {
      const platfromKey = this.app.databaseEnum.htmltext.platfrom;
      const platformText = await ctx.service.common.getHtmlText(platfromKey);

      await ctx.render('platfrom.nj', {
        htmlText: platformText,
      });
    }
  }
  return PlatfromController;
};
