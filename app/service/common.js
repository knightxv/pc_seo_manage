
'use strict';

const Service = require('egg').Service;

class CommonService extends Service {
  async getHtmlText(baseId) {
    const htmlInfo = await this.app.mysql.get('htmltext', { id: baseId });
    const htmlText = htmlInfo ? htmlInfo.htmlText : '';
    return htmlText;
  }
  async setHtmlText(row) {
    if (!row || !row.id) {
      return false;
    }
    const result = await this.app.mysql.update('htmlText', row);
    console.log(result);
    if (result.affectedRows === 0) {
      const insertResult = await this.app.mysql.insert('htmlText', row);
      return insertResult.affectedRows === 1;
    }
    return true;
  }
  async getConfig(configId) {
    if (isNaN(configId)) {
      return null;
    }
    const result = await this.app.mysql.get('web_config', { id: configId });
    let json_config = result.json_config;
    const isStr = Object.prototype.toString.call(json_config) === '[object String]';
    if (isStr) {
      try {
        json_config = JSON.parse(result.json_config.replace('\\', ''));
      } catch (err) {
        this.ctx.logger.info(`json_config:${json_config}`);
        console.log(err);
      }
    }
    return json_config;
  }
  async setConfig(configData) {
    if (!configData || !configData.json_config) {
      return false;
    }
    const { isObj } = this.ctx.helper;
    const configDataSet = configData.json_config;
    if (isObj(configDataSet) || Array.isArray(configDataSet)) {
      configData.json_config = JSON.stringify(configDataSet);
    }
    const result = await this.app.mysql.update('web_config', configData);
    if (result.affectedRows === 1) {
      return true;
    }
    const insertResult = await this.app.mysql.insert('web_config', configData);
    return insertResult.affectedRows === 1;
  }
}

module.exports = CommonService;
