'use strict';

module.exports = app => {
  class GamesApiController extends app.Controller {
    async getGameList(ctx) {
      const gameList = await ctx.service.games.getGameList();
      ctx.helper.setRes(true, gameList);
    }
    async getGameDetail(ctx) {
      const { gameId } = ctx.params;
      const gameInfo = await ctx.service.games.find(gameId);
      ctx.helper.setRes(true, gameInfo);
    }
    async addGame(ctx) {
      const isSuccess = await ctx.service.games.addGame(ctx.query);
      ctx.helper.setRes(isSuccess, null);
    }
    async updateGame(ctx) {
      const query = ctx.query;
      if (!query.id) {
        ctx.helper.setRes(false, null);
        return;
      }
      const updateInfo = Object.assign({}, query, {
        id: +query.id,
      });
      console.log('update game');
      const isSuccess = await ctx.service.games.updateGame(updateInfo);
      ctx.helper.setRes(isSuccess, null);
    }
    async deleteGame(ctx) {
      const { gameId } = ctx.query;
      const isSuccess = await ctx.service.games.deleteGame(gameId);
      ctx.helper.setRes(isSuccess, null);
    }
  }
  return GamesApiController;
};
