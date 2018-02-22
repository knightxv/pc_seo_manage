'use strict';

const Service = require('egg').Service;

class GameService extends Service {
  async find(gameId) {
    const gameInfo = await this.app.mysql.get('games', { id: gameId });
    if (gameInfo) {
      gameInfo.showInPhone = !!gameInfo.show_in_phone;
      delete gameInfo.show_in_phone;
    }
    return gameInfo;
  }
  async recommend(size = 6) {
    const results = await this.app.mysql.select('games', { // 搜索 post 表
      // where: { status: 'draft', author: [ 'author1', 'author2' ] }, // WHERE 条件
      columns: [ 'gameBrief', 'id', 'gameName', 'gameIcon' ], // 要查询的表字段
      orders: [[ 'publicDate', 'desc' ]], // 排序方式
      limit: +size, // 返回数据量
      offset: 0, // 数据偏移量
    });
    return results;
  }
  async findGameByGameType({ type: gameType, size }) {
    if (!gameType && gameType !== 0) {
      return [];
    }
    const results = await this.app.mysql.select('games', { // 搜索 post 表
      where: { gameType }, // WHERE 条件
      columns: [ 'gameBrief', 'id', 'gameName', 'gameIcon' ], // 要查询的表字段
      orders: [[ 'publicDate', 'desc' ]], // 排序方式
      limit: size,
    });
    return results;
  }
  // 返回所有的游戏
  async getGameList() {
    const results = await this.app.mysql.select('games', { // 搜索 post 表
      // where: { gameType }, // WHERE 条件
      // columns: [ 'gameBrief', 'id', 'gameName', 'gameIcon' ], // 要查询的表字段
      orders: [[ 'publicDate', 'desc' ]], // 排序方式
      // limit: size,
    });
    return results;
  }
  // 添加游戏
  async addGame(gameInfo) {
    if (!gameInfo) {
      return false;
    }
    const {
      characteristic,
      downUrl,
      gameBrief,
      gameIcon,
      gameIntroduce,
      gameLoginUrl,
      gameName,
      gameScreenshot,
      gameSize,
      gameType,
      gameVersion,
      publicDate,
      showInPhone,
    } = gameInfo;
    const updateInfo = {
      characteristic,
      downUrl,
      gameBrief,
      gameIcon,
      gameIntroduce,
      gameLoginUrl,
      gameName,
      gameScreenshot,
      gameSize,
      gameType,
      gameVersion,
      publicDate,
      show_in_phone: showInPhone === 'true' ? 1 : 0,
    };
    const result = await this.app.mysql.insert('games', updateInfo);
    return result.affectedRows === 1;
  }
  // 删除游戏
  async deleteGame(gameId) {
    if (!gameId || isNaN(gameId)) {
      return false;
    }
    const result = await this.app.mysql.delete('games', {
      id: +gameId,
    });
    return result.affectedRows === 1;
  }
  // 更新修改游戏
  async updateGame(gameInfo) {
    if (!gameInfo) {
      return false;
    }
    const {
      characteristic,
      downUrl,
      gameBrief,
      gameIcon,
      gameIntroduce,
      gameLoginUrl,
      gameName,
      gameScreenshot,
      gameSize,
      gameType,
      gameVersion,
      publicDate,
      id,
      showInPhone,
    } = gameInfo;
    const updateInfo = {
      characteristic,
      downUrl,
      gameBrief,
      gameIcon,
      gameIntroduce,
      gameLoginUrl,
      gameName,
      gameScreenshot,
      gameSize,
      gameType,
      gameVersion,
      publicDate,
      id,
      show_in_phone: showInPhone === 'true' ? 1 : 0,
    };
    const result = await this.app.mysql.update('games', updateInfo);
    return result.affectedRows === 1;
  }
}

module.exports = GameService;
