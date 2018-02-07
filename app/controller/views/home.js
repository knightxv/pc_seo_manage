'use strict';

const Controller = require('../../core/base_controller');

module.exports = app => {
  class HomeController extends Controller {
    // 首页
    async index(ctx) {
      const userAgent = ctx.request.headers['user-agent'];
      if (userAgent && userAgent.toLowerCase) {
        const deviceAgent = userAgent.toLowerCase();
        const isPhone = !!deviceAgent.match(/(iphone|ipod|ipad|android|symbianos|phone|ipad|ipod)/);
        if (isPhone) {
          ctx.redirect('/m/games');
          return;
        }
      }
      // pc
      const carousel = await ctx.service.home.getCarousel();
      const hotGameList = await ctx.service.home.getHotGame();
      const gameTypeArr = app.typeEnum.game;
      const newsTypeArr = app.typeEnum.news;
      const gamesModule = await Promise.all(gameTypeArr.map(async game => {
        const gameData = await ctx.service.games.findGameByGameType({ type: game.type, size: 10 });
        return Object.assign(game, { data: gameData });
      }));
      const newsModule = await Promise.all(newsTypeArr.map(async news => {
        const newsData = await ctx.service.news.selectNewsByNewsType({ type: news.type, size: 10 });
        return Object.assign(news, { data: newsData });
      }));
      const friendLink = await ctx.service.home.getFriendLinks();
      // 轮播图
      await this.webRender('index.nj', {
        carousel,
        hotGameList,
        friendLink,
        gamesModule,
        newsModule,
      });
    }
    async notFind(ctx) {
      await ctx.render('404.nj');
    }
  }
  return HomeController;
};
