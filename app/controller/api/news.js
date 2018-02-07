'use strict';

const BaseController = require('../../core/base_controller');

module.exports = app => {
  class NewsApiController extends BaseController {
    async getNewsList(ctx) {
      const { page = 0, size = 20 } = ctx.query;
      if (isNaN(page) || isNaN(size)) {
        this.fail('参数有误');
        return;
      }
      const newsList = await ctx.service.news.getNewsList({
        page, size,
      });
      if (newsList) {
        this.success(newsList);
      } else {
        this.fail();
      }
    }
    async getNewsDetail(ctx) {
      const { newsId } = ctx.params;
      const newsInfo = await ctx.service.news.find(newsId);
      if (newsInfo) {
        this.success(newsInfo);
      } else {
        this.fail();
      }
    }
    async getNews(ctx) {
      const newsList = await ctx.service.news.getNewsList();
      if (newsList) {
        this.success(newsList);
      } else {
        this.fail();
      }
    }
    async addNews(ctx) {
      const bodyInfo = ctx.request.body;
      const isSuccess = await ctx.service.news.addNews(bodyInfo);
      if (isSuccess) {
        this.success();
      } else {
        this.fail('添加失败');
      }
    }
    async updateNews(ctx) {
      const postBody = ctx.request.body;
      if (isNaN(postBody.id)) {
        this.fail('参数错误');
        return;
      }
      const isSuccess = await ctx.service.news.updateNews(postBody);
      if (isSuccess) {
        this.success();
      } else {
        this.fail('操作失败');
      }
    }
    async deleteNews(ctx) {
      const { newsId } = ctx.query;
      const isSuccess = await ctx.service.news.deleteNews(newsId);
      if (isSuccess) {
        this.success();
      } else {
        this.fail('删除失败');
      }
    }
  }
  return NewsApiController;
};
