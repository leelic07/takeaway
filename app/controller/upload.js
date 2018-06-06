'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadfile() {
    const { ctx } = this;
    const file = ctx.req.file;
    console.log('request', ctx.request);
    file.destination = file.destination.substring(file.destination.indexOf('/') + 1);
    file.path = `/${file.path.replace(/(^app\\)|(^app\/)/, '')}`;
    if (file) ctx.body = { path: file.path }; else ctx.fail('上传文件失败');
  }
}

module.exports = UploadController;
