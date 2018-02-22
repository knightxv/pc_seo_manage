'use strict';

module.exports = app => {
  app.get('/', 'views.home.index');
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
  app.get('/platform', 'views.platform.index');
  app.get('/contact', 'views.contact.index');
  // 404
  app.get('/404', 'views.home.notFind'); // 登录

  // 手机层
  app.get('/api/phone/newsList', 'api.phone.getNewsList');
  app.get('/api/phone/gameList', 'api.phone.getGameList'); // 获取游戏列表
  // app.get('/api/games/getRecommendGame', 'api.games.getGameRecommend'); // 获取游戏列表
  app.get('/api/phone/getRecommendGame', 'api.phone.getGameRecommend'); // 获取游戏列表
  /* 公用 */
  app.all('/api/upload/image/:uploadDir', 'api.common.uploadImage'); // 上传图片
  app.get('/api/manage/getWebConfig', 'api.common.getWebConfig'); // 获取配置信息
  app.get('/api/manage/setWebConfig', 'api.common.setWebConfig'); // 设置配置信息
  app.get('/api/manage/getBannerConfig', 'api.common.getBannerConfig'); // 设置配置信息
  app.get('/api/manage/setBannerConfig', 'api.common.setBannerConfig'); // 设置配置信息
  // 获取加入图片
  app.get('/api/phone/join/getImage', 'api.join.getImage');
  app.get('/api/phone/join/setImage', 'api.join.setImage');
  // 首页轮播
  app.get('/api/phone/homeCarousel', 'api.phone.getCarousel');
  app.get('/api/manage/phone/deleteCarousel', 'api.phone.deleteCarousel');
  app.get('/api/manage/phone/createCarousel', 'api.phone.createCarousel');
  app.get('/api/manage/phone/editCarousel', 'api.phone.editCarousel');

  /* 后台管理 */
  app.get('/api/manage/getHtmlText', 'api.common.getHtmlText'); // 获取html(textId)
  app.post('/api/manage/setHtmlText', 'api.common.setHtmlText'); // 设置html(textId)
  // 首页
  // app.get('/api/manage/getHomeConfig', 'api.home.getHomeConfig'); // 获取首页配置信息
  // app.get('/api/manage/setHomeConfig', 'api.home.setHomeConfig'); // 设置首页配置信息
  app.get('/api/manage/friendLink', 'api.home.getFriendLinks'); // 获取友情链接
  app.get('/api/manage/editFriendLink', 'api.home.editFriendLink'); // 修改友情链接
  app.get('/api/manage/deleteFriendLink', 'api.home.deleteFriendLink'); // 删除友情链接
  app.get('/api/manage/createFriendLink', 'api.home.createFriendLink'); // 添加友情链接
  app.get('/api/manage/homeCarousel', 'api.home.getCarousel'); // 获取轮播图
  app.get('/api/manage/editCarousel', 'api.home.editCarousel'); // 修改轮播图
  app.get('/api/manage/createCarousel', 'api.home.createCarousel'); // 创建轮播图
  app.get('/api/manage/deleteCarousel', 'api.home.deleteCarousel'); // 删除轮播图
  // 游戏
  app.get('/api/gameList', 'api.games.getGameList'); // 获取游戏列表
  app.get('/api/gameDetail/:gameId', 'api.games.getGameDetail'); // 获取游戏详情
  app.all('/api/manage/addGame', 'api.games.addGame'); // 添加游戏
  app.get('/api/manage/deleteGame', 'api.games.deleteGame'); // 删除游戏游戏
  app.get('/api/manage/updateGame', 'api.games.updateGame'); // 更新游戏信息
  // 新闻
  app.get('/api/newsList', 'api.news.getNews'); // 获取新闻列表
  app.get('/api/newsDetail/:newsId', 'api.news.getNewsDetail'); // 获取新闻详情
  app.post('/api/manage/addNews', 'api.news.addNews'); // 添加新闻
  app.post('/api/manage/updateNews', 'api.news.updateNews'); // 更新新闻信息
  app.get('/api/manage/deleteNews', 'api.news.deleteNews'); // 删除新闻
  // 登录
  app.get('/api/manage/login', 'api.common.login'); // 登录

  // 手机api(手机一些api要用到)
  app.get(/^\/m\/(\w+)(?!.)/, 'api.phone.index'); // 登录
};
