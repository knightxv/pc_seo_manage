'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    // 首页
    async index(ctx) {
      const webPath = ctx.app.config.httpConfig.webServerPath;
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
        webPath,
        gameList,
        gameSlider,
        newsSliders,
        newsList,
      });
    }
    /*
      新闻详情页
      @query : newsId（新闻id）
    */
    async getNews(ctx) {
      const { newsId } = ctx.query;
      if (!newsId || isNaN(newsId)) {
        this.body = ''; // 没有这个新闻
        return;
      }
      const newsDetailRes = await ctx.helper.webHttp.get('/gamePlatform/newsDetail', { newsId });
      if (!newsDetailRes.isSuccess) {
        this.body = ''; // 没有这个新闻
        return;
      }
      const newsDetail = newsDetailRes.data;
      await ctx.render('news.nj', {
        newsDetail,
      });
    }
    /*
      游戏详情
      @query : newsId（新闻id）
    */
    async getGameDetail(ctx) {
      const webPath = ctx.app.config.httpConfig.webServerPath;
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
      await ctx.render('game.nj', {
        gameDetail,
        webPath,
        gameList,
      });
    }
    /* 新闻列表 */
    async getNewsList(ctx) {
      const webPath = ctx.app.config.httpConfig.webServerPath;
      const { page = 0, size = 10 } = ctx.query;
      const newsListRes = await ctx.helper.webHttp.get('/gamePlatform/newsList', { page, size });
      if (!newsListRes.isSuccess || newsListRes.data.length === 0) {
        ctx.body = '';
        return;
      }
      const newsList = newsListRes.data;
      await ctx.render('newsList.nj', {
        newsList,
        webPath,
      });
    }
  }
  return HomeController;
};
