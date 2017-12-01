'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async find(newsId) {
    const newsInfo = await this.app.mysql.get('news', { id: newsId });
    return newsInfo;
  }
  async getCount(type) {
    const selectKey = 'count(1)';
    let newsResult;
    if (type) {
      const query = `select ${selectKey} from news where newsType=?`;
      newsResult = await this.app.mysql.query(query, [ type ]);
    } else {
      const query = `select ${selectKey} from news`;
      newsResult = await this.app.mysql.query(query);
    }
    return newsResult[0][selectKey];
  }
  async selectNewsByNewsType({ type, page = 0, size = 10 }) {
    if ((!type && type !== 0) || isNaN(page) || isNaN(size) || page < 0) {
      return [];
    }
    const results = await this.app.mysql.select('news', { // 搜索 post 表
      where: { newsType: type }, // WHERE 条件
      columns: [ 'id', 'newsTitle', 'publicTime', 'newsBrief', 'newsIcon' ], // 要查询的表字段
      orders: [[ 'publicTime', 'desc' ]], // 排序方式
      limit: size, // 返回数据量
      offset: page * size, // 数据偏移量
    });
    return results;
  }
}

module.exports = NewsService;
