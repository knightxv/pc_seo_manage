'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/news', 'home.news');
  app.get('/news/:newsId', 'home.newsDetail');
  // 游戏中心
  app.get('/games', 'views.games.index');
  app.get('/games/:gameType', 'views.games.gameType');
  app.get('/games/gameDetail/:gameId', 'views.games.gameDetail');
  // 平台介绍
  app.get('/platfrom', 'home.platfrom');
  app.get('/contact', 'home.contact');
  app.get('/api/getNewsDetail', 'home.getNews');
  app.get('/api/getGameDetail', 'home.getGameDetail');
  app.get('/api/getNewsList', 'home.getNewsList');
  // app.get('/api/uploadToBauduyun', 'home.uploadToBauduyun');
};
