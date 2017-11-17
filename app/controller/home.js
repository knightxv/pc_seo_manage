'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    // 首页
    async index(ctx) {
      // const webPath = ctx.app.config.httpConfig.webServerPath;
      // 推荐游戏列表
      // const gameListRes = await ctx.helper.webHttp.get('/gamePlatform/gameRecommendList');
      // const gameList = gameListRes.isSuccess ? gameListRes.data : [];
      // // 轮播图片
      // const gameSliderRes = await ctx.helper.webHttp.get('/gamePlatform/navbarSwiperList');
      // const gameSlider = gameSliderRes.isSuccess ? gameSliderRes.data : [];
      // // 新闻轮播
      // const newsSlidersRes = await ctx.helper.webHttp.get('/gamePlatform/newsCarousel');
      // const newsSliders = newsSlidersRes.isSuccess ? newsSlidersRes.data : [];
      // // 新闻
      // const newsListRes = await ctx.helper.webHttp.get('/gamePlatform/newsList');
      // const newsList = newsListRes.isSuccess ? newsListRes.data : [];
      const [ gameListRes, gameSliderRes, newsSlidersRes, newsListRes ] = await Promise.all([
        ctx.helper.webHttp.get('/gamePlatform/gameRecommendList'),
        ctx.helper.webHttp.get('/gamePlatform/navbarSwiperList'),
        ctx.helper.webHttp.get('/gamePlatform/newsCarousel'),
        ctx.helper.webHttp.get('/gamePlatform/newsList'),
      ]);
      // 推荐游戏列表
      const gameList = gameListRes.isSuccess ? gameListRes.data : [];
      // 轮播图片
      const gameSlider = gameSliderRes.isSuccess ? gameSliderRes.data : [];
      // 新闻轮播
      const newsSliders = newsSlidersRes.isSuccess ? newsSlidersRes.data : [];
      // 新闻
      const newsList = newsListRes.isSuccess ? newsListRes.data : [];
      await ctx.render('index.nj', {
        gameList,
        gameSlider,
        newsSliders,
        newsList,
      });
    }
    async contact(ctx) {
      await ctx.render('contact.nj');
    }
    async news(ctx) {
      const { page = 0, size = 10 } = ctx.query;
      const newsListRes = await ctx.helper.webHttp.get('/gamePlatform/newsList', { page, size });
      let newList = [];
      if (newsListRes.isSuccess) {
        newList = newsListRes.data;
      }
      await ctx.render('news.nj', {
        newList,
      });
    }
    async newsDetail(ctx) {
      const { newsId } = ctx.params;
      let gameDetail = {};
      if (newsId && !isNaN(newsId)) {
        const newsDetailRes = await ctx.helper.webHttp.get('/gamePlatform/newsDetail', { newsId });
        if (newsDetailRes.isSuccess) {
          gameDetail = newsDetailRes.data;
        }
      }
      await ctx.render('newsDetail.nj', gameDetail);
    }
    async games(ctx) {
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
        console.log(11);
        const gameDetailRes = await ctx.helper.webHttp.get('/gamePlatform/gameDetailInfo', { gameId });
        gameDetail = gameDetailRes.isSuccess ? gameDetailRes.data : {};
        console.log(gameDetail);
        const gameListRes = await ctx.helper.webHttp.get('/gamePlatform/gameRecommendList', { page: 0, size: 6 });
        gameList = gameListRes.isSuccess ? gameListRes.data : [];
        console.log(gameList);
      }
      console.log(gameDetail);
      console.log(gameList);
      await ctx.render('gameDetail.nj', {
        gameDetail,
        gameList,
      });
    }
    async platfrom(ctx) {
      await ctx.render('platfrom.nj');
    }
    /*
      新闻详情页
      @query : newsId（新闻id）
    */
    async getNews(ctx) {
      const { newsId } = ctx.query;
      if (!newsId || isNaN(newsId)) {
        ctx.body = ''; // 没有这个新闻
        return;
      }
      const newsDetailRes = await ctx.helper.webHttp.get('/gamePlatform/newsDetail', { newsId });
      if (!newsDetailRes.isSuccess) {
        ctx.body = ''; // 没有这个新闻
        return;
      }
      const newsDetail = newsDetailRes.data;
      await ctx.render('/content/news.nj', {
        newsDetail,
      });
    }
    /*
      游戏详情
      @query : newsId（新闻id）
    */
    async getGameDetail(ctx) {
      // const webPath = ctx.app.config.httpConfig.webServerPath;
      const { gameId } = ctx.query;
      if (!gameId || isNaN(gameId)) {
        // console.log('没有这个游戏');
        ctx.body = '';
        return;
      }
      const gameDetailRes = await ctx.helper.webHttp.get('/gamePlatform/gameDetailInfo', { gameId });
      if (!gameDetailRes.isSuccess) {
        // console.log('没有这个游戏');
        ctx.body = '';
        return;
      }
      const gameDetail = gameDetailRes.data;
      const gameListRes = await ctx.helper.webHttp.get('/gamePlatform/gameRecommendList', { page: 0, size: 6 });
      const gameList = gameListRes.isSuccess ? gameListRes.data : [];
      await ctx.render('/content/game.nj', {
        gameDetail,
        gameList,
      });
    }
    /* 新闻列表 */
    async getNewsList(ctx) {
      // const webPath = ctx.app.config.httpConfig.webServerPath;
      const { page = 0, size = 10 } = ctx.query;
      const newsListRes = await ctx.helper.webHttp.get('/gamePlatform/newsList', { page, size });
      if (!newsListRes.isSuccess || newsListRes.data.length === 0) {
        ctx.body = '';
        return;
      }
      const newsList = newsListRes.data;
      await ctx.render('/content/newsList.nj', {
        newsList,
      });
    }

  }
  return HomeController;
};
