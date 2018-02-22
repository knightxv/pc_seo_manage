'use strict';
const path = require('path');
const fs = require('mz/fs');
const BaseController = require('../../core/base_controller');

module.exports = app => {
  class PhoneController extends BaseController {
    async index(ctx) {
      const text = await fs.readFile(path.join(__dirname, '../../public/m/index.html'), 'utf-8');
      ctx.body = text;
    }
    async getCarousel(ctx) {
      const carousel = await ctx.service.phone.getCarousel();
      await this.success(carousel);
    }
    async editCarousel(ctx) {
      const { id, src, href, alt, sortNumber } = ctx.query;
      const isSuccess = await ctx.service.phone.editCarousel({
        id, src, href, alt, sortNumber,
      });
      if (isSuccess) {
        await this.success();
      } else {
        await this.fail();
      }
    }
    async createCarousel(ctx) {
      const { src, href, alt, sortNumber } = ctx.query;
      const result = await ctx.service.phone.createCarousel({
        src, href, alt, sortNumber,
      });
      if (result) {
        await this.success({
          id: result.insertId,
        });
      } else {
        await this.fail('添加失败');
      }
    }
    async deleteCarousel(ctx) {
      const { id } = ctx.query;
      const isSuccess = await ctx.service.phone.deleteCarousel(id);
      if (isSuccess) {
        await this.success();
      } else {
        await this.fail();
      }
    }
    // 新闻
    async getNewsList(ctx) {
      const { page = 0, size = 20 } = ctx.query;
      if (isNaN(page) || isNaN(size)) {
        this.fail('参数有误');
        return;
      }
      const newsList = await ctx.service.phone.getNewsList({
        page, size,
      });
      if (newsList) {
        this.success(newsList);
      } else {
        this.fail();
      }
    }
    async getGameList(ctx) {
      const newsList = await ctx.service.phone.getGameList();
      if (newsList) {
        this.success(newsList);
      } else {
        this.fail();
      }
    }
    async getGameRecommend(ctx) {
      const { size = 2 } = ctx.query;
      const gameRecommend = await ctx.service.phone.gameRecommend(size);
      if (gameRecommend) {
        this.success(gameRecommend);
      } else {
        this.fail();
      }
    }
  }
  return PhoneController;
};
