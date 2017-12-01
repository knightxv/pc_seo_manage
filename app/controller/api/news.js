'use strict';

module.exports = app => {
  class NewsApiController extends app.Controller {
    async getNewsList(ctx) {
      ctx.helper.setRes(true, null);
    }
    async getNewsDetail(ctx) {
      ctx.helper.setRes(true, null);
    }
    async addNews(ctx) {
      ctx.helper.setRes(true, null);
    }
    async updateNews(ctx) {
      ctx.helper.setRes(true, null);
    }
  }
  return NewsApiController;
};
