'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  // 渲染层
  // 新闻
  app.get('/news', 'views.news.index');
  app.get('/news/newsDetail/:newsId', 'views.news.newsDetail');
  app.get('/news/:newsTypeValue', 'views.news.index');
  
  // 游戏中心
  app.get('/games', 'views.games.gameType');
  app.get('/games/gameDetail/:gameId', 'views.games.gameDetail');
  app.get('/games/:gameType', 'views.games.gameType');
  // 平台介绍
  app.get('/platfrom', 'views.platfrom.index');
  app.get('/contact', 'views.contact.index');
  // 404
  app.get('/404', 'views.home.notFind'); // 登录

  // 手机层(暂时)
  app.get('/api/getNewsDetail', 'home.getNews');
  app.get('/api/getGameDetail', 'home.getGameDetail');
  app.get('/api/getNewsList', 'home.getNewsList');
  // app.get('/api/uploadToBauduyun', 'home.uploadToBauduyun');

  /* 公用 */
  app.all('/api/upload/image', 'api.common.uploadImage'); // 上传图片
  app.get('/api/gameList', 'api.games.getGameList'); // 获取游戏列表
  app.get('/api/gameDetail/:gameId', 'api.games.getGameDetail'); // 获取游戏详情
  app.get('/api/newsList', 'api.news.getNewsList'); // 获取新闻列表
  app.get('/api/newsDetail/:newsId', 'api.news.getNewsDetail'); // 获取新闻详情

  /* 后台管理 */
  app.get('/api/manage/getHtmlText', 'api.common.getHtmlText'); // 获取html(textId)
  app.post('/api/manage/setHtmlText', 'api.common.setHtmlText'); // 设置html(textId)
  // 首页
  app.get('/api/manage/getHomeConfig', 'api.home.getHomeConfig'); // 获取首页配置信息
  app.get('/api/manage/setHomeConfig', 'api.home.setHomeConfig'); // 设置首页配置信息
  // 游戏
  app.all('/api/manage/addGame', 'api.games.addGame'); // 添加游戏
  app.get('/api/manage/deleteGame', 'api.games.deleteGame'); // 删除游戏游戏
  app.get('/api/manage/updateGame', 'api.games.updateGame'); // 更新游戏信息
  // 新闻
  app.post('/api/manage/addNews', 'api.news.addNews'); // 添加新闻
  app.post('/api/manage/updateNews', 'api.news.updateNews'); // 更新新闻信息
  app.get('/api/manage/deleteNews', 'api.news.deleteNews'); // 删除新闻
  // 登录
  app.get('/api/manage/login', 'api.common.login'); // 登录
  app.get('/spreadApi/getUserInfo', 'api.common.test'); // 登录

  // 手机api
  app.get('/gamePlatform/gameRecommendList', 'api.phone.gameList'); // 登录
  app.get('/gamePlatform/navbarSwiperList', 'api.phone.swiperList'); // 登录
  app.get('/gamePlatform/gameDetailInfo', 'api.phone.gameDetail'); // 登录
  app.get(/^\/m\/(\w+)(?!.)/, 'api.phone.index'); // 登录
  

};
