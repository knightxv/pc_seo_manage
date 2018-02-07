'use strict';

const Service = require('egg').Service;

class GameService extends Service {
  async find(gameId) {
    const gameInfo = await this.app.mysql.get('games', { gameId });
    return gameInfo;
  }
  // 获取轮播数据
  async getCarousel() {
    // const carouselKey = this.app.databaseEnum.web_config.carousel;
    // const carouselConfig = await this.getConfig(carouselKey);
    const carousel = await this.app.mysql.select('carousel', {
      // where: { gameType }, // WHERE 条件
      columns: [ 'id', 'src', 'href', 'alt', 'sortNumber' ], // 要查询的表字段
      orders: [[ 'sortNumber', 'asc' ]], // 排序方式
      // limit: size,
    });
    return carousel;
  }
  // 获取热门游戏设置
  async getHotGame() {
    const hotGameKey = this.app.databaseEnum.web_config.hotGame;
    const configResult = await this.service.common.getWebConfig(hotGameKey);
    if (!configResult) {
      return null;
    }
    const hotGameConfig = configResult.config;
    let hotGames = [];
    try {
      hotGames = JSON.parse(hotGameConfig);
    } catch (err) {
      this.ctx.logger.info(`热门游戏配置不是数组:${hotGameConfig}`);
      return null;
    }
    if (Array.isArray(hotGames)) {
      // 拿到热门游戏列表的id
      const fetchArr = hotGames
        .filter(gameId => {
          return !isNaN(gameId);
        }).map(gameId => {
          return this.service.games.find(gameId);
        });
      const gamesResult = await Promise.all(fetchArr);
      return gamesResult.filter(game => !!game);
    }
    // this.ctx.logger.info(`热门游戏配置不是数组:${hotGameConfig}`);
    return null;
  }
  // 拿到友情链接
  async getFriendLinks() {
    const friendLink = await this.app.mysql.select('friend_link', {
      columns: [ 'id', 'href', 'label' ], // 要查询的表字段
    });
    return friendLink;
  }
  async setFriendLink(linkInfo) {
    const result = await this.app.mysql.update('friend_link', linkInfo);
    return result.affectedRows === 1;
  }
  async delFriendLink(id) {
    if (isNaN(id)) {
      return false;
    }
    const result = await this.app.mysql.delete('friend_link', {
      id: +id,
    });
    return result.affectedRows === 1;
  }
  async createFriendLink(linkInfo) {
    const { href, label } = linkInfo;
    const result = await this.app.mysql.insert('friend_link', {
      href, label,
    });
    if (result.affectedRows === 1) {
      return {
        insertId: result.insertId,
      };
    }
    return null;
  }
  async editCarousel(data) {
    const { id, src, href, alt, sortNumber } = data;
    const narouselInfo = {
      id,
      src,
      href,
      alt,
      sortNumber,
    };
    const result = await this.app.mysql.update('carousel', narouselInfo);
    return result.affectedRows === 1;
  }
  async createCarousel(data) {
    const { src, href, alt, sortNumber } = data;
    const result = await this.app.mysql.insert('carousel', {
      src, href, alt, sortNumber,
    });
    if (result.affectedRows === 1) {
      return {
        insertId: result.insertId,
      };
    }
    return null;
  }
  async deleteCarousel(id) {
    if (isNaN(id)) {
      return false;
    }
    const result = await this.app.mysql.delete('carousel', {
      id: +id,
    });
    return result.affectedRows === 1;
  }
}

module.exports = GameService;
