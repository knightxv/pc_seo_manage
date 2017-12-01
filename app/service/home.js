'use strict';

const Service = require('egg').Service;

class GameService extends Service {
  async find(gameId) {
    const gameInfo = await this.app.mysql.get('games', { gameId });
    return gameInfo;
  }
  async getConfig(configKey) {
    const configData = await this.app.mysql.get('web_config', { id: configKey });
    if (configData) {
      const configStr = configData.json_config;
      try {
        const config = JSON.parse(configStr);
        return config;
      } catch (err) {
        this.ctx.logger.info(`${configKey}(config_fail):${configStr}`);
      }
    }
    return null;
  }
  // 获取轮播数据
  async getCarousel() {
    const carouselKey = this.app.databaseEnum.web_config.carousel;
    const carouselConfig = await this.getConfig(carouselKey);
    return carouselConfig;
  }
  // 获取热门游戏设置
  async getHotGame() {
    const hotGameKey = this.app.databaseEnum.web_config.hotGame;
    const hotGameConfig = await this.getConfig(hotGameKey);
    if (Array.isArray(hotGameConfig)) {
      // 拿到热门游戏列表的id
      const gamesResult = await this.service.games.recommend();
      return gamesResult;
    }
    this.ctx.logger.info(`热门游戏配置不是数组:${hotGameConfig}`);
    return null;
  }
  // 拿到友情链接
  async getFriendLink() {
    const friendLinkKey = this.app.databaseEnum.web_config.friendLink;
    const friendLink = await this.getConfig(friendLinkKey);
    if (Array.isArray(friendLink)) {
      return friendLink;
    }
    return null;
  }
}

module.exports = GameService;
