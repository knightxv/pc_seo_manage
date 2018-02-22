'use strict';
const path = require('path');
const fs = require('mz/fs');
const uuidv1 = require('uuid/v1');
const Controller = require('../../core/base_controller');

module.exports = app => {
  class CommonApiController extends Controller {
    // async index(ctx) {
    // //   ctx.body = { data: 1 };
    // }
    async login(ctx) {
      const { userName, psd } = ctx.query;
      if (!userName || !psd) {
        ctx.helper.setRes(false, null);
        return;
      }
      const isSuccess = await ctx.service.common.login(userName, psd);
      if (isSuccess) {
        ctx.session.isAuthSuccess = true;
      }
      if (isSuccess) {
        this.success();
      } else {
        this.fail('账号密码错误');
      }
    }
    /*
     获取html
     @query： textId
     @return: htmlText
    */
    async getHtmlText(ctx) {
      const { textId } = ctx.query;
      if (!textId || isNaN(textId)) {
        ctx.helper.setRes(false, null);
        return;
      }
      const htmlText = await ctx.service.common.getHtmlText(textId);
      ctx.helper.setRes(true, { htmlText });
    }
    /*
      获取html
      @query： textId
      @query：: htmlText
    */
    async setHtmlText(ctx) {
      const { textId, htmlText } = ctx.request.body;
      if (!textId || isNaN(textId)) {
        ctx.helper.setRes(false, null);
        return;
      }
      const isSuccess = await ctx.service.common.setHtmlText({ id: textId, htmlText });
      ctx.helper.setRes(isSuccess, null);
    }
    async uploadImage(ctx) {
      let uploadFile = '';
      const dirs = app.config.static.dir;
      if (Array.isArray(dirs) && dirs.length > 1) {
        const dirs = app.config.static.dir;
        uploadFile = dirs[dirs.length - 1];
      }
      if (!uploadFile) {
        uploadFile = path.join(app.baseDir, 'upload');
      }
      const { uploadDir } = ctx.params;
      if (!/^(\w|\d)+$/.test(uploadDir)) {
        this.fail('文件格式不正确');
        return;
      }
      const fileStram = await ctx.getFileStream();
      const fileName = fileStram.filename;
      const isExists = await fs.exists(uploadFile);
      if (!isExists) {
        this.fail('没有upload文件夹');
        ctx.logger.error('没有upload文件夹');
        return;
      }
      const distName = `${uuidv1()}${path.extname(fileName)}`;
      const distFileName = path.join(uploadFile, uploadDir, distName);
      const isSuccess = await this.stramWriteFile(fileStram, distFileName);
      if (isSuccess) {
        this.success({
          url: `/${uploadDir}/${distName}`,
        });
      } else {
        this.fail('写入失败');
      }
    }
    async stramWriteFile(stream, distFile) {
      return new Promise(async resolve => {
        const dirPath = path.dirname(distFile);
        const isExit = await fs.exists(dirPath);
        if (!isExit) {
          try {
            await fs.mkdir(dirPath);
          } catch (err) {
            this.ctx.logger.error('上传文件创建目录失败');
            resolve(false);
          }
        }
        try {
          const imgWrite = fs.createWriteStream(distFile);
          stream.pipe(imgWrite);
          stream.on('end', () => {
            resolve(true);
          });
        } catch (err) {
          this.ctx.logger.error('上传文件写入失败');
          resolve(false);
        }
      });
    }
    async getWebConfig(ctx) {
      const { configKey } = ctx.query;
      const configId = ctx.app.databaseEnum.web_config[configKey];
      if (isNaN(configId)) {
        this.fail('不存在此设置');
        return;
      }
      const result = await ctx.service.common.getWebConfig(configId);
      if (result) {
        this.success({
          config: result.config,
        });
      } else {
        this.fail();
      }
    }
    async setWebConfig(ctx) {
      const { configKey, configText = '' } = ctx.query;
      const configId = ctx.app.databaseEnum.web_config[configKey];
      if (isNaN(configId)) {
        this.fail('不存在此设置');
        return;
      }
      const result = await ctx.service.common.setWebConfig(configId, configText);
      if (result) {
        this.success(result);
      } else {
        this.fail();
      }
    }
    async getBannerConfig(ctx) {
      const { bannerkey } = ctx.query;
      const bannberId = ctx.app.databaseEnum.banner[bannerkey];
      if (isNaN(bannberId)) {
        this.fail('不存在此设置');
        return;
      }
      const result = await ctx.service.common.getBanner(bannberId);
      if (result) {
        this.success(result);
      } else {
        this.fail();
      }
    }
    async setBannerConfig(ctx) {
      const { bannerkey, bannerSrc = '' } = ctx.query;
      const bannberId = ctx.app.databaseEnum.banner[bannerkey];
      if (isNaN(bannberId)) {
        this.fail('不存在此设置');
        return;
      }
      const success = await ctx.service.common.setBanner(bannberId, bannerSrc);
      if (success) {
        this.success();
      } else {
        this.fail();
      }
    }
    async test(ctx) {
      ctx.body = {
        status: 'success',
        Msg: '',
        data: null,
      };
    }
  }
  return CommonApiController;
};
