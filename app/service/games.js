'use strict';

const Service = require('egg').Service;

class GameService extends Service {
  async find(gameId) {
    // const gameInfo = await this.app.mysql.get('games', { id: gameId });
    // return gameInfo;
    return {};
  }
  async recommend() {
    const results = await this.app.mysql.select('games', { // 搜索 post 表
      // where: { status: 'draft', author: [ 'author1', 'author2' ] }, // WHERE 条件
      columns: [ 'gameBrief', 'id', 'gameName', 'gameIcon' ], // 要查询的表字段
      orders: [[ 'publicDate', 'desc' ]], // 排序方式
      limit: 6, // 返回数据量
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
      // orders: [[ 'publicData', 'desc' ]], // 排序方式
      // limit: size,
    });
    return results;
  }
  // 添加游戏
  async addGame(gameInfo) {
    if (!gameInfo) {
      return false;
    }
    const result = await this.app.mysql.insert('games', gameInfo);
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
    const result = await this.app.mysql.update('games', gameInfo);
    return result.affectedRows === 1;
  }
}

module.exports = GameService;
