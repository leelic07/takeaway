'use strict';
const Service = require('egg').Service;

class uploadService extends Service {
  async uploadfile(path) {
    const { ctx } = this;
    const result = await ctx.model.Pictures.create({
      url: path,
    });
    return result;
  }
}

module.exports = uploadService;
