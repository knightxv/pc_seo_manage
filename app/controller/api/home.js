'use strict';
const Controller = require('../../core/base_controller');
module.exports = app => {
  class HomeApiController extends Controller {
    // async index(ctx) {
    //   ctx.body = { data: 1 };
    // }
    // 友情链接
    async getFriendLinks(ctx) {
      const friendLink = await ctx.service.home.getFriendLinks();
      await this.success(friendLink);
    }
    async editFriendLink(ctx) {
      const { id, href = '', label = '' } = ctx.query;
      const isSuccess = await ctx.service.home.setFriendLink({
        id, href, label,
      });
      if (isSuccess) {
        await this.success();
      } else {
        await this.fail();
      }
    }
    async deleteFriendLink(ctx) {
      const { id } = ctx.query;
      const isSuccess = await ctx.service.home.delFriendLink(id);
      if (isSuccess) {
        await this.success();
      } else {
        await this.fail();
      }
    }
    async createFriendLink(ctx) {
      const { href, label } = ctx.query;
      const result = await ctx.service.home.createFriendLink({
        href, label,
      });
      if (result) {
        await this.success({
          href, label,
          id: result.insertId,
        });
      } else {
        await this.fail();
      }
    }
    // 轮播图
    async getCarousel(ctx) {
      const narousel = await ctx.service.home.getCarousel();
      await this.success(narousel);
    }
    async editCarousel(ctx) {
      const { id, src, href, alt, sortNumber } = ctx.query;
      const isSuccess = await ctx.service.home.editCarousel({
        id, src, href, alt, sortNumber,
      });
      if (isSuccess) {
        await this.success();
      } else {
        await this.fail();
      }
    }
    async createCarousel(ctx) {
      const { src, href, alt, sortNumber } = ctx.query;
      const result = await ctx.service.home.createCarousel({
        src, href, alt, sortNumber,
      });
      if (result) {
        await this.success({
          id: result.insertId,
        });
      } else {
        await this.fail();
      }
    }
    async deleteCarousel(ctx) {
      const { id } = ctx.query;
      const isSuccess = await ctx.service.home.deleteCarousel(id);
      if (isSuccess) {
        await this.success();
      } else {
        await this.fail();
      }
    }
    // async getHomeConfig(ctx) {
    //   const { hotGame } = ctx.app.databaseEnum.web_config;
    //   const hotGameConfig = await ctx.service.common.getConfig(hotGame);
    //   await this.success({
    //     hotGame: hotGameConfig,
    //   });
    // }
    // async setHomeConfig(ctx) {
    //   // const { carousel, hotGame, friendLink } = ctx.app.databaseEnum.web_config;
    //   const { configId, configText } = ctx.query;
    //   if ((!configId && configId !== 0) || isNaN(configId) || typeof configText !== 'string') {
    //     this.fail('设置失败 ');
    //     return;
    //   }
    //   const carouelConfig = configText;
    //   const carouelConfigRow = {
    //     id: +configId,
    //     json_config: carouelConfig,
    //   };
    //   const isSuccess = await ctx.service.common.setConfig(carouelConfigRow);
    //   if (isSuccess) {
    //     ctx.helper.setRes(true, null, '设置成功');
    //   } else {
    //     ctx.helper.setRes(true, null, '设置失败');
    //   }
    // }
    
  }
  return HomeApiController;
};
