'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/news', 'home.news');
  app.get('/games', 'home.games');
  app.get('/contact', 'home.contact');
  app.get('/api/getNewsDetail', 'home.getNews');
  app.get('/api/getGameDetail', 'home.getGameDetail');
  app.get('/api/getNewsList', 'home.getNewsList');
  // app.get('/api/uploadToBauduyun', 'home.uploadToBauduyun');
};
