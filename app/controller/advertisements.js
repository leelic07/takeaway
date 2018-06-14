'use strict';
const Controller = require('egg').Controller;

class AdvertisementController extends Controller {
  async page() {
    const { ctx, service } = this;
    const result = await service.advertisements.page(ctx.query);
    result ? ctx.success(result, '查询广告成功') : ctx.fail('查询广告失败');
  }

  async save() {
    const { ctx, service } = this;
    const result = await service.advertisements.save(ctx.request.body);
    result ? ctx.success({ advertisements: result }, '新增广告成功') : ctx.fail('新增广告失败');
  }

  async edit() {
    const { ctx, service } = this;
    const result = await service.advertisements.edit(ctx.query);
    result ? ctx.success({ advertisements: result }, '查询广告成功') : ctx.fail('查询广告失败');
  }

  async update() {
    const { ctx, service } = this;
    const result = await service.advertisements.update(ctx.request.body);
    result ? ctx.success(result, '更新广告成功') : ctx.fail('更新广告失败');
  }

  async updateIsPuton() {
    const { ctx, service } = this;
    const result = service.advertisements.updateIsPuton(ctx.request.body);
    result ? ctx.success(result, '更新广告成功') : ctx.fail('更新广告失败');
  }
}

module.exports = AdvertisementController;
