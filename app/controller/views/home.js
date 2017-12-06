'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async notFind(ctx) {
        await ctx.render('404.nj');
    }
  }
  return HomeController;
};
