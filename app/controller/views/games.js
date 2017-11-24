'use strict';

module.exports = app => {
  class GamesController extends app.Controller {
    async index(ctx) {
      await ctx.render('games.nj');
    }
    async gameType(ctx) {
      // const webPath = ctx.app.config.httpConfig.webServerPath;
      const [ gameListRes ] = await Promise.all([
        ctx.helper.webHttp.get('/gamePlatform/gameRecommendList'),
      ]);
      // 推荐游戏列表
      const gameList = gameListRes.isSuccess ? gameListRes.data : [];
      await ctx.render('games.nj', {
        gameList,
      });
    }
    async gameDetail(ctx) {
      const { gameId } = ctx.params;
      let gameDetail = {};
      let gameList = [];
      if (gameId && !isNaN(gameId)) {
        const gameDetailRes = await ctx.helper.webHttp.get('/gamePlatform/gameDetailInfo', { gameId });
        gameDetail = gameDetailRes.isSuccess ? gameDetailRes.data : {};
        const gameListRes = await ctx.helper.webHttp.get('/gamePlatform/gameRecommendList', { page: 0, size: 6 });
        gameList = gameListRes.isSuccess ? gameListRes.data : [];
      }
      await ctx.render('gameDetail.nj', {
        gameDetail,
        gameList,
      });
    }
  }
  return GamesController;
};
