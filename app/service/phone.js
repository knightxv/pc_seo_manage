'use strict';

const Service = require('egg').Service;

class PhoneService extends Service {
  async find(gameId) {
    const gameInfo = await this.app.mysql.get('games', { gameId });
    return gameInfo;
  }
  // 获取轮播数据
  async getCarousel() {
    // const carouselKey = this.app.databaseEnum.web_config.carousel;
    // const carouselConfig = await this.getConfig(carouselKey);
    const carousel = await this.app.mysql.select('phone_carousel', {
      // where: { gameType }, // WHERE 条件
      columns: [ 'id', 'src', 'href', 'alt', 'sortNumber' ], // 要查询的表字段
      orders: [[ 'sortNumber', 'asc' ]], // 排序方式
      // limit: size,
    });
    return carousel;
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
    const result = await this.app.mysql.update('phone_carousel', narouselInfo);
    return result.affectedRows === 1;
  }
  async createCarousel(data) {
    const { src, href, alt, sortNumber } = data;
    const result = await this.app.mysql.insert('phone_carousel', {
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
    const result = await this.app.mysql.delete('phone_carousel', {
      id: +id,
    });
    return result.affectedRows === 1;
  }
  async getGameList() {
    const results = await this.app.mysql.select('games', { // 搜索 post 表
      where: { show_in_phone: 1 }, // WHERE 条件
      // columns: [ 'gameBrief', 'id', 'gameName', 'gameIcon' ], // 要查询的表字段
      // orders: [[ 'publicData', 'desc' ]], // 排序方式
      // limit: size,
    });
    return results;
  }
  async getNewsList(option = {}) {
    const { page = 0, size = 10 } = option;
    const results = await this.app.mysql.select('news', { // 搜索 post 表
      where: { show_in_phone: 1 }, // WHERE 条件
      columns: [ 'id', 'newsTitle', 'publicTime', 'newsType', 'newsBrief', 'newsIcon', 'phoneIcon' ], // 要查询的表字段
      orders: [[ 'publicTime', 'desc' ]], // 排序方式
      limit: size,
      offset: page * size,
    });
    return results;
  }
  async gameRecommend(size = 2) {
    const results = await this.app.mysql.select('games', { // 搜索 post 表
      where: { show_in_phone: 1 }, // WHERE 条件
      columns: [ 'gameBrief', 'id', 'gameName', 'gameIcon' ], // 要查询的表字段
      orders: [[ 'publicDate', 'desc' ]], // 排序方式
      limit: +size, // 返回数据量
      offset: 0, // 数据偏移量
    });
    return results;
  }
}

module.exports = PhoneService;
