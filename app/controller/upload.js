'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadFile() {
    const { ctx } = this;
    const file = ctx.req.file;
    console.log('request', ctx.request);
    file.destination = file.destination.substring(file.destination.indexOf('/') + 1);
    file.path = `http://${ctx.request.hostname}:7003/${file.path.replace(/(^app\\)|(^app\/)/, '')}`;
    if (file) {
      ctx.success(file, '上传文件成功');
    } else ctx.fail('上传文件失败');
  }
}

module.exports = UploadController;
