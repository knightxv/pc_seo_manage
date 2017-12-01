'use strict';
const path = require('path');
const fs = require('mz/fs');

module.exports = app => {
  class CommonApiController extends app.Controller {
    // async index(ctx) {
    // //   ctx.body = { data: 1 };
    // }
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
      const { textId, htmlText } = ctx.query;
      if (!textId || isNaN(textId)) {
        ctx.helper.setRes(false, null);
        return;
      }
      const isSuccess = await ctx.service.common.setHtmlText({ id: textId, htmlText });
      ctx.helper.setRes(isSuccess, null);
    }
    async uploadImage(ctx) {
      let uploadFile = '';
      if (Array.isArray(app.config.static.dir)) {
        const dirs = app.config.static.dir;
        uploadFile = dirs[dirs.length - 1];
      }
      if (!uploadFile) {
        uploadFile = path.join(app.baseDir, 'upload');
      }
      const fileStram = await ctx.getFileStream();
      const fileName = fileStram.filename;
      const isExists = await fs.exists(uploadFile);
      if (!isExists) {
        ctx.helper.setRes(false, null);
        ctx.logger.info('没有upload文件夹');
        return;
      }
      const distName = `${String(new Date().getTime())}${path.extname(fileName)}`;
      const distFileName = path.join(uploadFile, distName);
      const isSuccess = await this.stramWriteFile(fileStram, distFileName);
      ctx.helper.setRes(isSuccess, {
        url: '/' + distName,
      });
    }
    stramWriteFile(stream, distFile) {
      return new Promise(resolve => {
        try {
          const imgWrite = fs.createWriteStream(distFile);
          stream.pipe(imgWrite);
          stream.on('end', () => {
            resolve(true);
          });
        } catch (err) {
          console.log('写入失败');
          console.log(err);
          resolve(false);
        }
      });
    }
  }
  return CommonApiController;
};
