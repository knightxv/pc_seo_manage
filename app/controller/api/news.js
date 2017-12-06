'use strict';

module.exports = app => {
  class NewsApiController extends app.Controller {
    async getNewsList(ctx) {
      const newsList = await ctx.service.news.getNewsList();
      ctx.helper.setRes(true, newsList);
    }
    async getNewsDetail(ctx) {
      const { newsId } = ctx.params;
      const newsInfo = await ctx.service.news.find(newsId);
      ctx.helper.setRes(true, newsInfo);
    }
    async addNews(ctx) {
      const { newsBrief, newsContent, newsIcon, newsTitle, newsType, publicTime } = ctx.request.body;
      const insertBody = {
        newsBrief, newsContent, newsIcon, newsTitle, newsType, publicTime,
      };
      const isSuccess = await ctx.service.news.addNews(insertBody);
      ctx.helper.setRes(isSuccess, null);
    }
    async updateNews(ctx) {
      const { newsBrief, newsContent, newsIcon, newsTitle, newsType, publicTime, id } = ctx.request.body;
      const insertBody = {
        id, newsBrief, newsContent, newsIcon, newsTitle, newsType, publicTime,
      };
      if (!insertBody.id) {
        ctx.helper.setRes(false, null);
        return;
      }
      const updateInfo = Object.assign({}, insertBody, {
        id: +insertBody.id,
      });
      const isSuccess = await ctx.service.news.updateNews(updateInfo);
      ctx.helper.setRes(isSuccess, null);
    }
    async deleteNews(ctx) {
      const { newsId } = ctx.query;
      const isSuccess = await ctx.service.news.deleteNews(newsId);
      ctx.helper.setRes(isSuccess, null);
    }
  }
  return NewsApiController;
};
