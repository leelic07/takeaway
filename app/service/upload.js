'use strict';
const Service = require('egg').Service;

class uploadService extends Service {
  async uploadfile(file) {
    const { ctx } = this;
    const result = await ctx.model.Pictures.create({
      url: file.path,
    });
    return result;
  }
}

module.exports = uploadService;
