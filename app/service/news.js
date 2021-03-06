'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async find(newsId) {
    const newsInfo = await this.app.mysql.get('news', { id: newsId });
    if (newsInfo) {
      newsInfo.showInPhone = !!newsInfo.show_in_phone;
      delete newsInfo.show_in_phone;
    }
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
      columns: [ 'id', 'newsTitle', 'publicTime', 'newsBrief', 'newsIcon', 'phoneIcon' ], // 要查询的表字段
      orders: [[ 'publicTime', 'desc' ]], // 排序方式
      limit: size, // 返回数据量
      offset: page * size, // 数据偏移量
    });
    return results;
  }
  // 获取新闻列表
  async getNewsList(option = {}) {
    const { page = 0, size = 10 } = option;
    const results = await this.app.mysql.select('news', { // 搜索 post 表
      // where: { show_in_phone  }, // WHERE 条件
      columns: [ 'id', 'newsTitle', 'publicTime', 'newsType', 'newsBrief', 'newsIcon', 'phoneIcon' ], // 要查询的表字段
      orders: [[ 'publicTime', 'desc' ]], // 排序方式
      limit: size,
      offset: page * size,
    });
    return results;
  }
  // 删除新闻
  async deleteNews(newsId) {
    if (!newsId || isNaN(newsId)) {
      return false;
    }
    const result = await this.app.mysql.delete('news', {
      id: +newsId,
    });
    return result.affectedRows === 1;
  }
  // 添加新闻
  async addNews(newsInfo) {
    if (!newsInfo) {
      return false;
    }
    const { newsBrief, newsContent, newsIcon, newsTitle, newsType, publicTime, showInPhone, phoneIcon } = newsInfo;
    const updateInfo = {
      newsBrief, newsContent, newsIcon, newsTitle, newsType, publicTime, phoneIcon,
      show_in_phone: showInPhone === 'true' ? 1 : 0,
    };
    const result = await this.app.mysql.insert('news', updateInfo);
    return result.affectedRows === 1;
  }
  // 更新新闻
  async updateNews(newsInfo) {
    if (!newsInfo) {
      return false;
    }
    const { newsBrief, newsContent, newsIcon, newsTitle, newsType, publicTime, showInPhone, id, phoneIcon } = newsInfo;
    const result = await this.app.mysql.update('news', {
      newsBrief, newsContent, newsIcon, newsTitle, newsType, publicTime, id, phoneIcon,
      show_in_phone: showInPhone === 'true' ? 1 : 0,
    });
    return result.affectedRows === 1;
  }
}

module.exports = NewsService;
