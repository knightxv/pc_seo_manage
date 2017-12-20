'use strict';
const path = require('path');
const fs = require('mz/fs');

module.exports = app => {
  class PhoneController extends app.Controller {
    async index(ctx) {
      const text = await fs.readFile(path.join(__dirname, '../../public/m/index.html'), 'utf-8');
      ctx.body = text;
    }
    async gameList(ctx) {
      const res = await ctx.helper.webHttp.get('/gamePlatform/gameRecommendList');
      ctx.body = res;
    }
    async swiperList(ctx) {
      const res = await ctx.helper.webHttp.get('/gamePlatform/navbarSwiperList');
      ctx.body = res;
    }
    async gameDetail(ctx) {
      const { gameId } = ctx.query;
      const res = await ctx.helper.webHttp.get('/gamePlatform/gameDetailInfo', { gameId });
      ctx.body = res;
    }
  }
  return PhoneController;
};
