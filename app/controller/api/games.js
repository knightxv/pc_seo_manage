'use strict';

const BaseController = require('../../core/base_controller');

module.exports = app => {
  class GamesApiController extends BaseController {
    async getGameList(ctx) {
      const gameList = await ctx.service.games.getGameList();
      this.success(gameList);
    }
    async getGameDetail(ctx) {
      const { gameId } = ctx.params;
      const gameInfo = await ctx.service.games.find(gameId);
      if (gameInfo) {
        this.success(gameInfo);
      } else {
        this.fail('没有找到游戏');
      }
      // await this.ctx.logger.info('query, return');
    }
    async addGame(ctx) {
      const isSuccess = await ctx.service.games.addGame(ctx.query);
      if (isSuccess) {
        this.success();
      } else {
        this.fail('添加失败');
      }
    }
    async updateGame(ctx) {
      const query = ctx.query;
      if (!query.id) {
        this.fail('参数错误');
        return;
      }
      const isSuccess = await ctx.service.games.updateGame(query);
      if (isSuccess) {
        this.success();
      } else {
        this.fail();
      }
    }
    async deleteGame(ctx) {
      const { gameId } = ctx.query;
      const isSuccess = await ctx.service.games.deleteGame(gameId);
      if (isSuccess) {
        this.success();
      } else {
        this.fail('删除失败');
      }
    }
    async getGameRecommend(ctx) {
      const { size } = ctx.query;
      const gameRecommend = await ctx.service.games.recommend(size);
      console.log(gameRecommend);
      if (gameRecommend) {
        this.success(gameRecommend);
      } else {
        this.fail();
      }
    }
  }
  return GamesApiController;
};
