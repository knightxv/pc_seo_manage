'use strict';

module.exports = app => {
  const gameTypeArr = app.typeEnum.game;
  class GamesController extends app.Controller {
    async index(ctx) {
      await ctx.render('games.nj');
    }
    async gameType(ctx) {
      const { gameType } = ctx.params;
      // const webPath = ctx.app.config.httpConfig.webServerPath;
      // 推荐游戏列表
      // const [ gameListRes ] = await Promise.all([
      //   ctx.helper.webHttp.get('/gamePlatform/gameRecommendList'),
      // ]);
      // const gameList = gameListRes.isSuccess ? gameListRes.data : [];
      let gameSideIndex = 0; // 侧边栏选择的类型
      gameTypeArr.some((gameTypeInfo, index) => {
        const isSame = gameTypeInfo.value === gameType;
        if (isSame) {
          gameSideIndex = index;
        }
        return isSame;
      });
      const selectGameType = gameTypeArr[gameSideIndex].type;
      const gameList = await ctx.service.games.findGameByGameType({ type: selectGameType });
      const sideTypeArr = gameTypeArr.map(gameInfo => ({
        label: gameInfo.label,
        href: `/games/${gameInfo.value}`,
      }));
      await ctx.render('games.nj', {
        gameList,
        sideTypeArr,
        gameSideIndex, // 侧边栏选择的类型
      });
    }
    async gameDetail(ctx) {
      const { gameId } = ctx.params;
      // 游戏详情
      const gameDetail = await ctx.service.games.find(gameId);
      let gameDetailResolve;
      let gameTypeInfo = {
        label: '游戏类型',
        value: '',
      };
      if (gameDetail) {
        gameDetailResolve = Object.assign(gameDetail, {
          gameScreenshot: gameDetail.gameScreenshot ? JSON.parse(gameDetail.gameScreenshot) : [],
        });
        gameTypeArr.some(typeInfo => {
          if (+gameDetail.gameType === typeInfo.type) {
            gameTypeInfo = typeInfo;
            return true;
          }
          return false;
        });
      }
      // 游戏详情
      const gameRecommend = await ctx.service.games.recommend();
      
      await ctx.render('gameDetail.nj', {
        gameDetail: gameDetailResolve,
        gameRecommend,
        gameTypeInfo,
      });
    }
  }
  return GamesController;
};
