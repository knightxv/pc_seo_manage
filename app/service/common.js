
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
    const result = await this.app.mysql.update('htmltext', row);
    if (result.affectedRows === 0) {
      const insertResult = await this.app.mysql.insert('htmltext', row);
      return insertResult.affectedRows === 1;
    }
    return true;
  }
  async getWebConfig(configId) {
    if (isNaN(configId)) {
      return null;
    }
    const result = await this.app.mysql.get('web_config', { id: configId });
    if (!result) {
      return null;
    }
    return result;
  }
  async setWebConfig(configId, configText) {
    if (isNaN(configId)) {
      return false;
    }
    const result = await this.app.mysql.update('web_config', {
      id: configId,
      config: configText,
    });
    if (result.affectedRows === 1) {
      return true;
    }
    const insertResult = await this.app.mysql.insert('web_config', {
      id: configId,
      config: configText,
    });
    return insertResult.affectedRows === 1;
  }
  async login(userName, passWord) {
    if (userName === 'ddm_2017' && passWord === 'ddm_2017') {
      return true;
    }
    return false;
  }
  async getBanner(bannerKey) {
    if (isNaN(bannerKey)) {
      return null;
    }
    const banner = await this.app.mysql.get('banner', {
      id: bannerKey,
    });
    return banner;
  }
  async setBanner(bannerKey, src = '') {
    if (isNaN(bannerKey)) {
      return false;
    }
    const result = await this.app.mysql.update('banner', {
      id: bannerKey,
      src,
    });
    if (result.affectedRows === 1) {
      return true;
    }
    const insertResult = await this.app.mysql.insert('banner', {
      id: bannerKey,
      src,
    });
    return insertResult.affectedRows === 1;
  }
}

module.exports = CommonService;
