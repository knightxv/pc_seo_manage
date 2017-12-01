'use strict';
module.exports = app => {
  class HomeApiController extends app.Controller {
    async index(ctx) {
      ctx.body = { data: 1 };
    }
    async getHomeConfig(ctx) {
      const { carousel, hotGame, friendLink } = ctx.app.databaseEnum.web_config;
      const carouselConfig = await ctx.service.common.getConfig(carousel);
      const hotGameConfig = await ctx.service.common.getConfig(hotGame);
      const friendLinkConfig = await ctx.service.common.getConfig(friendLink);
      ctx.helper.setRes(true,
        { carousel: carouselConfig, hotGame: hotGameConfig, friendLink: friendLinkConfig },
        '测试ok'
      );
    }
    async setHomeConfig(ctx) {
      const { configId, configText } = ctx.query;
      if ((!configId && configId !== 0) || isNaN(configId) || typeof configText !== 'string') {
        ctx.helper.setRes(true, null, '设置失败');
        return;
      }
      // const { carousel, hotGame, friendLink } = ctx.app.databaseEnum.web_config;
      const carouelConfig = configText;
      const carouelConfigRow = {
        id: +configId,
        json_config: carouelConfig,
      };
      const isSuccess = await ctx.service.common.setConfig(carouelConfigRow);
      if (isSuccess) {
        ctx.helper.setRes(true, null, '设置成功');
      } else {
        ctx.helper.setRes(true, null, '设置失败');
      }
    }
  }
  return HomeApiController;
};
