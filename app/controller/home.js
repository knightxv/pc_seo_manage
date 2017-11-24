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
      // ctx.helper.getViewConfig();
      const deviceAgent = ctx.request.headers['user-agent'].toLowerCase();
      const isPhone = !!deviceAgent.match(/(iphone|ipod|ipad|android|symbianos|phone|ipad|ipod)/);
      const [ gameListRes, newsListRes ] = await Promise.all([
        ctx.helper.webHttp.get('/gamePlatform/gameRecommendList'),
        ctx.helper.webHttp.get('/gamePlatform/newsList'),
      ]);
      // 推荐游戏列表
      const gameList = gameListRes.isSuccess ? gameListRes.data : [];
      // 新闻
      const newsList = newsListRes.isSuccess ? newsListRes.data : [];
      if (isPhone) {
        const [ gameSliderRes, newsSlidersRes ] = await Promise.all([
          ctx.helper.webHttp.get('/gamePlatform/navbarSwiperList'),
          ctx.helper.webHttp.get('/gamePlatform/newsCarousel'),
        ]);
        // 轮播图片
        const gameSlider = gameSliderRes.isSuccess ? gameSliderRes.data : [];
        // 新闻轮播
        const newsSliders = newsSlidersRes.isSuccess ? newsSlidersRes.data : [];
        await ctx.render('phone/index.nj', {
          gameList,
          gameSlider,
          newsSliders,
          newsList,
        });
        return;
      }
      await ctx.render('index.nj', {
        gameList,
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
