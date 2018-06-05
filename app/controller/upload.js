'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadfile() {
    const { ctx, service } = this;
    const file = ctx.req.file;
    console.log('request', ctx.request);
    file.destination = file.destination.substring(file.destination.indexOf('/') + 1);
    // file.path = `http://${ctx.request.hostname}:7003/${file.path.replace(/(^app\\)|(^app\/)/, '')}`;
    file.path = `/${file.path.replace(/(^app\\)|(^app\/)/, '')}`;
    const result = await service.upload.uploadfile(file);
    if (result) ctx.body = { path: result.url }; else ctx.fail('上传文件失败');
  }
}

module.exports = UploadController;
